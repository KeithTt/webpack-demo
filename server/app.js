const Koa = require('koa');
const KoaRouter = require('koa-router');

const app = new Koa();
const router = new KoaRouter();

router.get('/api/data', async ctx => {
    ctx.body = '我是服务端返回数据库';
});

app.use(router.routes());

app.listen(8090);
