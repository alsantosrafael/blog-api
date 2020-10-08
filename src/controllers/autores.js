const autoresRepo = require('../repositories/autores');
// const { autores } = require('../utils/general');
const postsRepo = require('../repositories/posts');
const response = require('./response');
// const { obterPostsDeAutor } = require('./posts');

/**
 * Função que mostra os autores
 */
const obterAutores = async (ctx) => {
	const listaAutores = await autoresRepo.obterAutores();

	if (!listaAutores) {
		return response(ctx, 'Não existe nenhum autor cadastrado', 404);
	}

	return response(ctx, listaAutores);
};

/**
 * Função que mostra um autor específico a partir de um id fornecido no path
 */

const obterAutor = async (ctx) => {
	const { id = null } = ctx.params;
	if (!id) {
		return response(ctx, 'Mal formatado', 400);
	}
	const autor = await autoresRepo.obterAutor(id);

	if (!autor) {
		return response(ctx, 'Autor não encontrado', 404);
	}
	return response(ctx, autor, 200);
};
/**
 * Função que adiciona um novo autor
 */
const adicionarAutor = async (ctx) => {
	const {
		nome = null,
		sobrenome = null,
		email = null,
		senha = null,
	} = ctx.request.body;

	if (!nome || !sobrenome || !email || !senha) {
		return response(ctx, 'Pedido mal-formatado', 400);
	}

	const existeAutor = await autoresRepo.obterAutorPorEmail(email);

	if (existeAutor) {
		return response(
			ctx,
			'O email do autor em criação já está registrado!',
			400
		);
	}
	const autor = {
		nome,
		sobrenome,
		email,
		senha,
	};

	const novoAutor = await autoresRepo.criarAutor(autor);
	return response(ctx, novoAutor, 201);
};
/**
 * Função que atualiza um autor
 */
const atualizarAutor = async (ctx) => {
	// Procurar o id do autor que foi atualizado no banco de dados e retorná-lo
	const { id } = ctx.params;
	const { nome, sobrenome, email, senha } = ctx.request.body;

	if (!nome && !sobrenome && !email && !senha) {
		return response(ctx, 'Pedido mal-formatado', 400);
	}

	if (id) {
		const autorAtual = await autoresRepo.obterAutor(id);
		if (autorAtual) {
			const autorAtualizado = {
				...autorAtual,
				nome: nome || autorAtual.nome,
				sobrenome: sobrenome || autorAtual.sobrenome,
				email: email || autorAtual.email,
				senha: senha || autorAtual.senha,
			};
			const result = await autoresRepo.atualizarAutor(autorAtualizado);
			return response(ctx, result, 200);
		}
		return response(ctx, 'Autor não encontrado', 404);
	}
	return response(ctx, 'Autor não encontrado', 404);
};
/**
 * Função que deleta um autor
 */
const deletarAutor = async (ctx) => {
	const { id } = ctx.params;
	const { estado } = ctx.request.body;

	if (typeof estado !== 'boolean') {
		return response(ctx, 'Pedido mal-formatado', 400);
	}

	if (id) {
		const autorAtual = await autoresRepo.obterAutor(id);
		const postsAutor = await postsRepo.obterPostsAutor(id);
		if (autorAtual) {
			if (estado === true && postsAutor.length > 0) {
				return response(ctx, 'Ação proibida', 403);
			}

			const result = await autoresRepo.deletarAutor(id, estado);
			return response(ctx, result, 200);
		}
	}

	return response(ctx, 'Usuário não encontrado', 404);
};

module.exports = {
	obterAutores,
	obterAutor,
	adicionarAutor,
	atualizarAutor,
	deletarAutor,
};
