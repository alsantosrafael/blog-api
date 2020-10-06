const db = require('../utils/database');

// const dropTabela = async () => {
// return db.query('DROP TABLE autores;');
// };

const criarTabela = async () => {
	const query = `CREATE TABLE IF NOT EXISTS posts (
	id SERIAL,
	titulo TEXT,
	subtitulo: TEXT,
	conteudo: TEXT,
	autor: SERIAL,
	publicado: bool DEFAULT FALSE,
	deletado: bool DEFAULT FALSE,
	)`;
	return db.query(query);
};

const criarPost = async (post) => {
	await criarTabela();
	const { titulo, subtitulo, conteudo, autor, publicado, deletado } = post;
	const query = {
		text: `INSERT INTO posts
		(titulo, subtitulo, conteudo, autor, publicado, deletado) 
		VALUES ($1, $2, $3, $4, FALSE, FALSE) RETURNING *`,
		values: [titulo, subtitulo, conteudo, autor, publicado, deletado],
	};
	const result = await db.query(query);
	return result.rows.shift();
};
const obterPost = async (idPost) => {
	const query = {
		text: `SELECT * FROM posts WHERE id = $1 AND deletado = false AND publicado = true`,
		values: [idPost],
	};
	const result = await db.query(query);
	return result.rows.shift();
};

const obterPosts = async () => {
	const query = {
		text: `SELECT * FROM posts WHERE deletado = false`,
	};
	const result = await db.query(query);
	return result.rows;
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
	const { titulo, subtitulo, conteudo, autor, publicado } = postAtualizado;
	const query = {
		text: `UPDATE posts
		SET titulo = $1,
		subtitulo = $2,
		conteudo = $3,
		autor = $4
		publicado = $5
		WHERE id = $6 AND deletado = FALSE RETURNING *`,
		values: [titulo, subtitulo, conteudo, autor, publicado, idPost],
	};
	const result = await db.query(query);
	return result.rows.shift();
};

const deletarPost = async (idPost) => {
	const query = {
		text: `UPDATE posts
		SET deletado = true
		WHERE id = $1 RETURNING *`,
		values: [idPost],
	};
	const result = await db.query(query);
	return result.rows.shift();
};

module.exports = {
	criarTabela,
	criarPost,
	obterPost,
	obterPosts,
	obterPostsAutor,
	obterPostsPublicados,
	atualizarPost,
	deletarPost,
};
