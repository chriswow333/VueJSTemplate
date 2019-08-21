
import {
  verifyUserAccount,
  requestUserInfo,
  verifyUserToken
} from './user-request'

import {
  USER_TOKEN_KEY,
  SHOW_ACCOUNT_OR_PASSWORD_ERROR_MSG
} from './user-signin-config.js';


export async function signIn(vm){
  try {
    let result = {}, data = {};
    data = {
      account  :vm.account,
      password :vm.password
    };
    result = await verifyUserAccount(data);
    if(result != null){
      setUserToken(vm, result.userToken);
      redirectUserInfoPath(vm);
    }else{
      vm.errMsg = SHOW_ACCOUNT_OR_PASSWORD_ERROR_MSG;
    }
  }catch(err){
    vm.errMsg = SHOW_ACCOUNT_OR_PASSWORD_ERROR_MSG;
  }
}


export async function getUserInfo(vm){
  let userToken, user = {};
  try{
    userToken = getUserTokenInClient();
    vm.userInfo = await requestUserInfo(userToken);
    user.signin = true;
    dispatchUser(vm, user);
  }catch(err){
    user.signin = false;
    dispatchUser(vm, user);
  }
}


export async function userLogout(vm){
  let user = {signin:false};
  setUserToken(vm,'');
  dispatchUser(vm,user);
}

export async function verifyUserSignin(vm){
  let result;
  let userToken = getUserTokenInClient();
  if (userToken != null){
    result = await verifyUserToken(userToken);
  }else{
   throw "no token"; 
  }

}

export function setUserToken(vm, userToken){
  if (window.localStorage) {
    window.localStorage.setItem(USER_TOKEN_KEY, userToken);
  } else { 
    let now = new Date();
    let time = now.getTime();
    let expireTime = time + 86400000 * 365; // one year
    now.setTime(expireTime);
    document.cookie = [userToken,'path=/','Expires='+now.toGMTString()].join(';');
  }
}



export function redirectUserInfoPath(vm){
  vm.$router.push({path:'/user/info'});
}

export function getUserTokenInClient(){
  let userToken = null;
  if (window.localStorage) {
      userToken = window.localStorage.getItem(USER_TOKEN_KEY);
  } else {
      userToken = document.cookie;
  }
  return userToken;
}


function dispatchUser(vm, user){
  if(user.signin != null){
    vm.$store.dispatch({
      type:'user/changeSignin',
      signin: user.signin
    });
  }
}
