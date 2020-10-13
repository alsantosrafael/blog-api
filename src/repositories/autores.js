const db = require('../utils/database');

const criarAutor = async (autor) => {
	const { nome, sobrenome, email, senha } = autor;
	const query = {
		text: `INSERT INTO autores
		(nome, sobrenome, email, senha)
		VALUES ($1, $2, $3, $4) RETURNING *`,
		values: [nome, sobrenome, email, senha],
	};
	const result = await db.query(query);
	return result.rows.shift();
};

const obterAutor = async (id) => {
	const query = {
		text: `SELECT * FROM autores WHERE id = $1 AND deletado = FALSE `,
		values: [id],
	};
	const result = await db.query(query);
	return result.rows.shift();
};

const obterAutores = async (deletado = false) => {
	const query = {
		text: `SELECT * FROM autores WHERE deletado = $1`,
		values: [deletado],
	};
	const result = await db.query(query);
	return result.rows;
};

const obterAutorPorEmail = async (email = null) => {
	if (!email) {
		return null;
	}

	const query = {
		text: `SELECT * FROM autores WHERE email = $1 AND deletado = false`,
		values: [email],
	};
	const result = await db.query(query);
	return result.rows.shift();
};

const atualizarAutor = async (id, autorAtualizado) => {
	const { nome, sobrenome, email, senha } = autorAtualizado;

	const query = {
		text: `UPDATE autores 
		SET nome = $1,
		sobrenome = $2, 
		email = $3,
		senha = $4
		WHERE id = $5 RETURNING *`,
		values: [nome, sobrenome, email, senha, id],
	};
	const result = await db.query(query);
	return result.rows.shift();
};

const deletarAutor = async (id, estado) => {
	if (!estado) {
		return null;
	}
	const query = {
		text: `UPDATE autores 
		SET deletado = $1
		WHERE id = $2`,
		values: [estado, id],
	};
	const result = await db.query(query);
	return result.rows.shift();
};

module.exports = {
	criarAutor,
	obterAutor,
	obterAutores,
	obterAutorPorEmail,
	atualizarAutor,
	deletarAutor,
};
