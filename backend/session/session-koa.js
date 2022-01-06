// index.js
const koa = require('koa')
const app = new koa()
const session = require('koa-session')
// 签名key keys作用 用来对cookie进行签名
app.keys = ['some_secret'];
// 配置项
const SESS_CONFIG = {
key: 'sess', // cookie键名
maxAge: 86400000, // 有效期，默认一天
httpOnly: true, // 仅服务器修改
signed: true, // 签名cookie
};
// 注册
app.use(session(SESS_CONFIG, app));
// 测试
app.use(ctx => {
if (ctx.path === '/favicon.ico') return;
// 获取
let n = ctx.session.count || 0;
// 设置
ctx.session.count = ++n;
ctx.body = '第' + n + '次访问';
console.log('第' + n + '次访问')   //laochen log

});
app.listen(3000)
