const postsRepo = require('../repositories/posts');
/**
 * Chamando os arrays vazios de um terceiro arquivo
 */
const { autores, posts } = require('../utils/general');

const response = require('./response');

/**
 * Obtém posts de autor específico ao se passar seu id
 */
const obterPostsDeAutor = (autorId, ctx = null) => {
	const postsDoAutor = posts.filter((post) => {
		return post.autor === autorId && post.deletado === false;
	});

	response(ctx, postsDoAutor);
};
/**
 * Obtém todos os posts
 */
const obterPosts = (ctx) => {
	response(
		ctx,
		posts.filter((post) => !post.deletado && !post.publicado),
		200
	);
};
/**
 * Adiciona post
 */
const adicionarPost = (ctx) => {
	const { body } = ctx.request;

	if (!body.titulo || !body.conteudo || !body.subtitulo || !body.autor) {
		response(ctx, 'Pedido mal-formatado', 400);
		return;
	}
	if (autores[body.autor - 1].deletado === true) {
		response(ctx, 'Pedido proibido', 403);
		return;
	}

	const post = {
		id: posts.length + 1,
		titulo: body.titulo,
		conteudo: body.conteudo,
		subtitulo: body.subtitulo,
		autor: body.autor,
		publicado: false,
		deletado: false,
	};

	posts.unshift(post);

	response(ctx, post);
};
/**
 * Atualiza post
 */
const atualizarPost = (ctx) => {
	const id = ctx.url.split('/')[2];
	const { body } = ctx.request;

	if (
		(!body.conteudo && !body.titulo && !body.subtitulo) ||
		typeof body.publicado !== 'boolean'
	) {
		response(ctx, 'Pedido mal-formatado', 400);
		return;
	}

	if (id) {
		const postAtual = posts[id - 1];
		if (postAtual) {
			const postAtualizado = {
				id: Number(id),
				conteudo: body.conteudo ? body.conteudo : postAtual.conteudo,
				titulo: body.titulo ? body.titulo : postAtual.titulo,
				subtitulo: body.subtitulo
					? body.subtitulo
					: postAtual.subtitulo,
				senha: body.senha ? body.senha : postAtual.senha,
				autor: postAtual.autor,
				publicado: !!body.publicado,
				deletado: postAtual.deletado,
			};

			posts[id - 1] = postAtualizado;

			response(ctx, postAtualizado);
		}
	} else {
		response(ctx, 'Autor não encontrado', 404);
	}
};
/**
 * Deleta post
 */
const deletarPost = (ctx) => {
	const id = ctx.url.split('/')[2];
	const { body } = ctx.request;

	if (typeof body.estado !== 'boolean') {
		response(ctx, 'Pedido mal-formatado', 400);
		return;
	}

	if (id) {
		const postAtual = posts[id - 1];
		if (postAtual) {
			const postAtualizado = {
				id: postAtual.id,
				titulo: postAtual.titulo,
				subtitulo: postAtual.subtitulo,
				conteudo: postAtual.conteudo,
				autor: postAtual.autor,
				publicado: postAtual.publicado,
				deletado: body.estado,
			};

			posts[id - 1] = postAtualizado;

			response(ctx, postAtualizado);
		}
	} else {
		response(ctx, 'Post não encontrado', 404);
	}
};

module.exports = {
	obterPostsDeAutor,
	obterPosts,
	adicionarPost,
	atualizarPost,
	deletarPost,
};
