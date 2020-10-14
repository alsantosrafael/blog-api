const jwt = require('jsonwebtoken');
const response = require('./response');
const Autores = require('../repositories/autores');
const Password = require('../utils/password');

require('dotenv').config();

const autenticar = async (ctx) => {
	const { email = null, senha = null } = ctx.request.body;
	if (!email || !senha) {
		return response(ctx, 'Pedido mal formatado', 400);
	}

	const autor = await Autores.obterAutorPorEmail(email);

	if (autor) {
		const compara = await Password.check(senha, autor.senha);
		if (compara) {
			const token = await jwt.sign(
				{ id: autor.id, email: autor.email },
				process.env.JWT_SECRET || 'cubosacademy',
				{
					expiresIn: '1h',
				}
			);
			return response(ctx, { token }, 200);
		}
		return response(ctx, 'Email e/ou Senha errad@s!', 401);
	}

	return response(ctx, 'Autor não encontrado!', 404);
};

module.exports = { autenticar };
