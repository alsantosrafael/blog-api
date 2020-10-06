const postsRepo = require('../repositories/posts');
const response = require('./response');
/**
 * Obtém post específico ao passar seu id
 */
const obterPost = async (ctx) => {
	const { id = null } = ctx.params;
	if (!id) {
		return response(ctx, 'Pedido mal formatado', 400);
	}
	const post = await postsRepo.obterPost(id);
	if (post) {
		if (!post.deletado) {
			return response(ctx, post, 200);
		}
		return response(ctx, 'Post foi deletado.', 401);
	}
	return response(ctx, 'Post não encontrado', 404);
};

/**
 * Obtém todos os posts
 */
const obterPosts = async (ctx) => {
	const listaPosts = await postsRepo.obterPosts();
	const { autor = null } = ctx.query;

	if (!autor) {
		if (listaPosts) {
			return response(ctx, listaPosts, 200);
		}
		return response(ctx, 'Posts não encontrados.', 404);
	}
	const postsAutor = postsRepo.obterPostsAutor(autor);
	if (postsAutor) {
		return response(ctx, postsAutor, 200);
	}
	return response(ctx, 'Não há posts do autor buscado!', 404);
};
/**
 * Adiciona post
 */
const adicionarPost = async (ctx) => {
	await postsRepo.criarTabela();
	const {
		titulo = null,
		conteudo = null,
		subtitulo = null,
		autor = null,
	} = ctx.request.body;

	if (!titulo || !conteudo || !subtitulo || !autor) {
		return response(ctx, 'Pedido mal-formatado', 400);
	}

	const post = {
		titulo,
		subtitulo,
		conteudo,
		autor,
	};

	const listaPosts = await postsRepo.obterPosts();

	listaPosts.forEach((p) => {
		if (p.titulo === post.titulo) {
			return response(ctx, 'Já existe um Post com esse título', 401);
		}
		return false;
	});
	const postCriado = await postsRepo.criarPost(post);
	return response(ctx, postCriado, 201);
};
/**
 * Atualiza post
 */
const atualizarPost = async (ctx) => {
	const { id = null } = ctx.params;
	const {
		titulo = null,
		subtitulo = null,
		conteudo = null,
		publicado = false,
	} = ctx.request.body;

	if (
		(!conteudo && !titulo && !subtitulo && !publicado) ||
		typeof publicado !== 'boolean'
	) {
		return response(ctx, 'Pedido mal-formatado', 400);
	}

	if (id) {
		const postAtual = await postsRepo.obterPost(id);
		if (postAtual) {
			const postAtualizado = {
				id: postAtual.id,
				conteudo: conteudo || postAtual.conteudo,
				titulo: titulo || postAtual.titulo,
				subtitulo: subtitulo || postAtual.subtitulo,
				publicado: publicado || postAtual.publicado,
			};

			return response(ctx, postAtualizado);
		}
		return response(ctx, 'Post não encontrado', 404);
	}
	return response(ctx, 'Pedido mal formatado', 400);
};
/**
 * Deleta post
 */
const deletarPost = async (ctx) => {
	const { id = null } = ctx.params;
	const { estado } = ctx.request.body;

	if (typeof estado !== 'boolean') {
		return response(ctx, 'Pedido mal-formatado', 400);
	}

	if (id) {
		const postAtual = await postsRepo.obterPost(id);
		if (postAtual) {
			postsRepo.deletarPost(id);
			return response(ctx, postAtual, 200);
		}
		return response(ctx, 'Post não encontrado', 404);
	}
	return response(ctx, 'Pedido mal formatado', 400);
};

module.exports = {
	obterPost,
	obterPosts,
	adicionarPost,
	atualizarPost,
	deletarPost,
};
