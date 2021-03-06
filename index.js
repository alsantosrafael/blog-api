const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const router = require('./src/routes');
const schema = require('./src/utils/database');

const server = new Koa();

server.use(bodyparser());

server.use(router.routes());

server.listen(8081, () => console.log('Servidor rodando na porta 8081.'));
