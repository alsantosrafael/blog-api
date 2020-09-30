const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const router = require('./src/routes');

const response = './src/controllers/response';

const server = new Koa();

server.use(bodyparser());
server.use((ctx, next) => {
	if (
		ctx.method !== 'GET' &&
		ctx.method !== 'POST' &&
		ctx.method !== 'PUT' &&
		ctx.method !== 'DELETE'
	) {
		response(ctx, 'Método Não Permitido', 405);
		return;
	}
	next();
});
server.use(router.routes());

server.listen(8081, () => console.log('Servidor rodando na porta 8081.'));
