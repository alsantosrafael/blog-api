const autoresRepo = require('../repositories/autores');
const { autores } = require('../utils/general');
const response = require('./response');
const { obterPostsDeAutor } = require('./posts');
/**
 * Função que mostra os autores
 */
const obterAutores = (ctx) => {
	return response(
		ctx,
		autores.filter((autor) => !autor.deletado)
	);
};

const obterAutor = (ctx) => {
	const { id = null } = ctx.params;
	if (id) {
		const autorAtual = autores[id - 1];
		if (autorAtual) {
			response(ctx, autorAtual);
		} else {
			response(ctx, 'Autor não encontrado', 404);
		}
	} else {
		response(ctx, 'Mal formatado', 400);
	}
};
/**
 * Função que adiciona um novo autor
 */
const adicionarAutor = (ctx) => {
	const { body } = ctx.request;

	if (!body.nome || !body.sobrenome || !body.email || !body.senha) {
		response(ctx, 'Pedido mal-formatado', 400);
		return;
	}

	const autor = {
		id: autores.length + 1,
		nome: body.nome,
		sobrenome: body.sobrenome,
		email: body.email,
		senha: body.senha,
		deletado: false,
	};

	autores.push(autor);

	response(ctx, autor);
};
/**
 * Função que atualiza um autor
 */
const atualizarAutor = (ctx) => {
	// Procurar o id do autor que foi atualizado no banco de dados e retorná-lo
	const { id } = ctx.params;
	const { body } = ctx.request;

	if (!body.nome && !body.sobrenome && !body.email && !body.senha) {
		response(ctx, 'Pedido mal-formatado', 400);
		return;
	}

	if (id) {
		const autorAtual = autores[id - 1];
		if (autorAtual) {
			const autorAtualizado = {
				id: Number(id),
				nome: body.nome ? body.nome : autorAtual.nome,
				sobrenome: body.sobrenome
					? body.sobrenome
					: autorAtual.sobrenome,
				email: body.email ? body.email : autorAtual.email,
				senha: body.senha ? body.senha : autorAtual.senha,
				deletado: autorAtual.deletado,
			};

			autores[id - 1] = autorAtualizado;

			response(ctx, autorAtualizado, 200);
		}
	} else {
		response(ctx, 'Autor não encontrado', 404);
	}
};
/**
 * Função que deleta um autor
 */
const deletarAutor = (ctx) => {
	const { id } = ctx.params;
	const { body } = ctx.request;

	if (typeof body.estado !== 'boolean') {
		response(ctx, 'Pedido mal-formatado', 400);
		return;
	}

	if (id) {
		const autorAtual = autores[id - 1];
		if (autorAtual) {
			if (body.estado === true && obterPostsDeAutor(id).length > 0) {
				response(ctx, 'Ação proibida', 403);
				return;
			}

			const autorDeletado = {
				id: autorAtual.id,
				nome: autorAtual.nome,
				sobrenome: autorAtual.sobrenome,
				email: autorAtual.email,
				senha: autorAtual.senha,
				deletado: body.estado,
			};

			autores[id - 1] = autorDeletado;

			response(ctx, autorDeletado, 200);
		}
	} else {
		response(ctx, 'Usuário não encontrado', 404);
	}
};

module.exports = {
	obterAutores,
	obterAutor,
	adicionarAutor,
	atualizarAutor,
	deletarAutor,
};
