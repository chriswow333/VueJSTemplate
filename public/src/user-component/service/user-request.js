
import axios from 'axios';
import {axiosConfig} from '../../config/axiosConfig.js';

import {
  numberWithCommas, 
  postErrorMsg, 
  validateJsonObj
} from '../../utils/utils.js';


import {
  USER_TOKEN_KEY
} from './user-signin-config.js';



export function verifyUserAccount(data){
  return new Promise(function(resolve, reject){
    let url = ['/user','signin'].join('/');
    axios.post(url,data,axiosConfig).then(function(response){
      let msg = response.data;
      msg = validateJsonObj(msg);
      if(msg != null && msg.success === true){
        resolve(msg.data);
      }else{
        reject(null);
      }
    });
  });
}

export function requestUserInfo(userToken){
  return new Promise(function(resolve, reject){
    let url = '/user/info';
    axiosConfig.headers = {[USER_TOKEN_KEY]:userToken};
    axios.get(url,axiosConfig).then(function(response){
      let msg = response.data;
      msg = validateJsonObj(msg);
      if(msg != null && msg.success === true){
        resolve(msg.data);
      }else{
        reject(null);
      }
    });
  });
}



export function verifyUserToken(userToken){
  return new Promise(function(resolve,reject){
    let url = '/user/token';
    axiosConfig.headers = {[USER_TOKEN_KEY]:userToken};
    axios.get(url,axiosConfig).then(function(response){
      let msg = response.data;
      msg = validateJsonObj(msg);
      if(msg != null && msg.success === true){
        resolve(msg.data);
      }else{
        reject(null);
      }
    });
  });
}