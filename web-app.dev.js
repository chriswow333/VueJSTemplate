
const Koa = require('koa');
const config = require('./routes/config/config.js');
const frontEndBaseUrl = config.frontEndBaseUrl;


/********        WEBPACK  HOT RELOAD  *******/
const webpack = require('webpack'); 
const configWebpack = require('./webpack.config.dev.js'); 
const devMiddleware = require('./devMiddleware');
const hotMiddleware = require('./hotMiddleware');
const compiler = webpack(configWebpack);
const app = new Koa();

app.use(devMiddleware(compiler, {
  publicPath: configWebpack.output.publicPath,
  noInfo: true,
  stats: {
    colors: true
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
}));
app.use(hotMiddleware(compiler));
/********    WEBPACK  HOT RELOAD  *******/



const helmet = require('koa-helmet');
var bodyParser = require('koa-bodyparser');
const koaStatic = require('koa-static');
const path = require('path');
const contentPagePath = path.join(__dirname,'public/index.html');
const Router = require('koa-router');
const router = Router();
const koaSend = require('koa-send');


//app.use(router.routes());
app.use(helmet());
const indexFilePath = 'public/dist/index.html';

const userBaseUrl = [frontEndBaseUrl, 'user/*'].join('/');
router.get(userBaseUrl,async (ctx)=>{
  ctx.type = 'html';
  await koaSend(ctx, indexFilePath);
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

