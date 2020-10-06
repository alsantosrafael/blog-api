const db = require('../utils/database');

// const dropTabela = async () => {
// return db.query('DROP TABLE autores;');
// };

const criarTabela = async () => {
	const query = `CREATE TABLE IF NOT EXISTS autores (
	id SERIAL,
	nome TEXT,
	sobrenome: TEXT,
	email: TEXT,
	senha: TEXT,
	deletado: bool DEFAULT FALSE
	)`;
	return db.query(query);
};

const criarAutor = async (autor) => {
	await criarTabela();
	const { nome, sobrenome, email, senha, deletado } = autor;
	const query = {
		text: `INSERT INTO autores
		(nome, sobrenome, email, senha, deletado)
		VALUES ($1, $2, $3, $4, FALSE) RETURNING *`,
		values: [nome, sobrenome, email, senha, deletado],
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

const obterAutores = async () => {
	const query = {
		text: `SELECT * FROM autores AND deletado = FALSE`,
	};
	const result = await db.query(query);
	return result.rows;
};

const atualizarAutor = async (id, autorAtualizado) => {
	const { nome, sobrenome, email, senha } = autorAtualizado;

	const query = {
		text: `UPDATE autores 
		SET nome = $1,
		sobrenome = $2, 
		email = $3,
		senha = $4
		WHERE id = $5 AND deletado = FALSE`,
		values: [nome, sobrenome, email, senha, id],
	};
	const result = await db.query(query);
	return result.rows.shift();
};

const deletarAutor = async (id) => {
	const query = {
		text: `UPDATE autores 
		SET deletado = TRUE,
		WHERE id = $1`,
		values: [id],
	};
	const result = await db.query(query);
	return result;
};

module.exports = {
	criarTabela,
	criarAutor,
	obterAutor,
	obterAutores,
	atualizarAutor,
	deletarAutor,
};
