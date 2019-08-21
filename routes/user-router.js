const Router = require('koa-router');
const moment = require('moment');
const jwt = require('jsonwebtoken');



const config = require('./config/config.js');
const loggerHandler = require('./utilities/logger-handler.js');

const logger = loggerHandler.logger;

const router = Router({
  prefix: config.backendBaseUrl
});


/** ========  GET METHOD ======== */
router.get('/user/info', async(ctx)=>{
  try {
    let result, userToken, data, err;
    userToken = ctx.request.header.authorization;
    if(userToken){
      data = {
        userToken: userToken
      };
      [err, result] = await verifyUserToken(data);
      if(err){
        result = {success:false, msg:'token failed'}
      }else{
        result = 
        {
          success:true,
          data:{
            contact_name:'Chris Yu',
            contact_tel:'886+963360651',
            contact_email:'chriswow333@gmail.com',
            created:moment().format()
          }
        };
      }
    }else{
      result = {success:false, msg:"empty token"};
    }    
    ctx.body = result;
  }catch(err){
    if(err !== 'error'){
      logger.error(err.stack?err.stack:err);
    }
  }
});


router.get('/user/token', async(ctx)=>{
  try{
    let result, userToken, data, err;
    userToken = ctx.request.header.authorization;
    if(userToken){
      data = {
        userToken: userToken
      };
      [err, result] = await verifyUserToken(data);
      if(err){
        result = {success:false, msg:"error token"};
      }else{
        result = {success:true, data:{}};
      }
    }else{
      result = {success:false, msg:"unAuthorized"};
    }
    ctx.body = result;

  }catch(err){
    if(err !== "error"){
      logger.error(err.stack);
    }
  }
});

/** ========  POST METHOD ======== */
router.post('/user/signin', async(ctx)=>{
  try{
    let result, err;
    let body = ctx.request.body;
    let data = {
      account  :body.account,
      password :body.password
    };
    if(data.account === "test" && data.password === "test"){
      [err, result] = await genJWT(data);
      if(err){
        result = {success:false, msg:"internal error"};
      }else{
        result = {
          success:true, 
          data:{
            userToken:result
          }
        };
      }
    }else{
      result = {success:false, msg:"unauthorized"};
    }
    ctx.body = result;    
  }catch(err){
    if(err !== "error"){
      logger.error(err.stack);
    }
  }
});


// ==========  This is only for template  ====================
// ==========  Do not write some kind of code here like below. ===========
const genJWT = function genJWT(data){
  return new Promise(function(resolve, reject){
    jwt.sign({
      data: {account:data.account},
      exp: parseInt(Math.floor(Date.now() / 1000) + parseInt(config.jsonWebToken.expiredTokenOnTime))
    },
    config.jsonWebToken.secret,
    function(err, token) {
      if (err) {
        if(err !== 'error'){
          logger.error(err.stack?err.stack:err);
        }
        reject('error');
      } else {
        resolve(token);
      }
    });
  }).then(function(result){
    return [null, result];
  }).catch(function(err){
    if(err !== 'error'){
      logger.error(err.stack?err.stack:err);
    }
    return ['error', null];
  });
}



const verifyUserToken = async(data)=>{
  return new Promise(function(resolve, reject){
    jwt.verify(data.userToken, config.jsonWebToken.secret, function(err, payload) {
      if(err){
        if(err !== 'error'){
          logger.error(err.stack?err.stack:err);
        }
        reject('error');
      }else{
        if(payload.data) {
          resolve(payload);
        }else{
          reject('error');
        }
      }
    });
  }).then(function(result){
    return [null, result];
  }).catch(function(err){
    if(err !== 'error'){
      logger.error(err.stack?err.stack:err);
    }
    return ['error', null];
  });
}


module.exports = router;