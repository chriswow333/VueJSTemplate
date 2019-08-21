
'use strict'
const Koa = require('koa');

const helmet = require('koa-helmet');
const bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const path = require('path');
const contentPagePath = path.join(__dirname,'public/index.html');
const Router = require('koa-router');
const router = Router();
const koaSend = require('koa-send');


const config = require('./routes/config/config.js');

const frontEndBaseUrl = config.frontEndBaseUrl;

const app = new Koa();
app.use(helmet());

const indexFilePath = 'public/dist/index.html';
const distPrefixPath = 'public';

const userBaseUrl = [frontEndBaseUrl, 'user/*'].join('/');
router.get(userBaseUrl,async (ctx)=>{
  ctx.type = 'html';
  await koaSend(ctx, indexFilePath);
});




router.get('/dist/*',async (ctx)=>{
  let path = [distPrefixPath, ctx.originalUrl].join('');
  await koaSend(ctx, path);
});


app.use(bodyParser({
  formLimit: config.post.formLimit
}));

app.use(router.routes());

const userRouter = require('./routes/user-router.js');
app.use(userRouter.routes());


app.use(async(ctx, next) => {
  try {
    await next();
    ctx.type = 'html';
    await koaSend(ctx, indexFilePath);
  } catch (err) {
    ctx.type = 'html';
    await koaSend(ctx, indexFilePath);
  }
});

app.listen(config.port);

console.log('listening on port ' + config.port);

