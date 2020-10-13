const response = require('./response');
const Autores = require('../repositories/autores');
const Password = require('../utils/password');

const autenticar = async (ctx) => {
	const { email = null, senha = null } = ctx.request.body;
	if (!email || !senha) {
		return response(ctx, 'Pedido mal formatado', 400);
	}

	const autor = await Autores.obterAutorPorEmail(email);

	if (autor) {
		const compara = await Password.check(senha, autor.senha);
		if (compara) {
			return response(ctx, 'Sucesso!', 200);
		}
		return response(ctx, 'Email e/ou Senha errad@s!', 401);
	}

	return response(ctx, 'Autor não encontrado!', 404);
};

module.exports = { autenticar };
