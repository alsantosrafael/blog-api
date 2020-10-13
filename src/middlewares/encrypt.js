const Password = require('../utils/password');
const response = require('../controllers/response');

const encrypt = async (ctx, next) => {
	const { senha = null } = ctx.request.body;

	if (!senha) {
		return response(ctx, 'Pedido mal formatado.', 400);
	}
	// Através do interceptador estou encriptografando a senha
	const hash = await Password.encrypt(senha);
	// Armazenamento momentâneo da senha
	ctx.state.hash = hash;
	return next();
};

module.exports = { encrypt };
