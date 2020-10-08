const db = require('../utils/database');

const criarPost = async (post) => {
	const { titulo, subtitulo, conteudo, autor } = post;
	const query = {
		text: `INSERT INTO posts
		(titulo, subtitulo, conteudo, autor) 
		VALUES ($1, $2, $3, $4) RETURNING *`,
		values: [titulo, subtitulo, conteudo, autor],
	};
	const result = await db.query(query);
	return result.rows.shift();
};
const obterPost = async (idPost) => {
	const query = {
		text: `SELECT * FROM posts WHERE id = $1`,
		values: [idPost],
	};
	const result = await db.query(query);
	return result.rows.shift();
};

const obterPosts = async (deletado = false, publicado = true) => {
	const query = {
		text: `SELECT * FROM posts WHERE deletado = $1 AND publicado = $2`,
		values: [deletado, publicado],
	};
	const result = await db.query(query);
	return result.rows.shift();
};

const obterPostsAutor = async (idAutor = null) => {
	if (!idAutor) {
		return null;
	}
	const query = {
		text: `SELECT * FROM posts WHERE autor = $1 AND DELETADO = false`,
		values: [idAutor],
	};
	const result = await db.query(query);
	return result.rows;
};
const obterPostsPublicados = async () => {
	const query = {
		text: `SELECT * FROM posts WHERE deletado = false AND publicado = true `,
	};
	const result = await db.query(query);
	return result.rows;
};

const atualizarPost = async (idPost, postAtualizado) => {
	const { titulo, subtitulo, conteudo, publicado } = postAtualizado;
	const query = {
		text: `UPDATE posts
		SET titulo = $1,
		subtitulo = $2,
		conteudo = $3,
		publicado = $4
		WHERE id = $5 RETURNING *`,
		values: [titulo, subtitulo, conteudo, publicado, idPost],
	};
	const result = await db.query(query);
	return result.rows.shift();
};

const deletarPost = async (idPost, estado) => {
	if (!estado) {
		return null;
	}
	const query = {
		text: `UPDATE posts
		SET deletado = $1
		WHERE id = $2 RETURNING *`,
		values: [estado, idPost],
	};
	const result = await db.query(query);
	return result.rows.shift();
};

module.exports = {
	criarPost,
	obterPost,
	obterPosts,
	obterPostsAutor,
	obterPostsPublicados,
	atualizarPost,
	deletarPost,
};
