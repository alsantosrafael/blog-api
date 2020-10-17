const database = require('./database');

const schema = {
	1: `CREATE TABLE IF NOT EXISTS autores (
			id SERIAL,
			nome TEXT NOT NULL,
			sobrenome TEXT NOT NULL,
			email TEXT NOT NULL,
			senha TEXT NOT NULL,
			deletado BOOL DEFAULT FALSE
	);`,
	2: `CREATE TABLE IF NOT EXISTS posts (
			id SERIAL,
			titulo TEXT NOT NULL,
			subtitulo TEXT NOT NULL,
			conteudo TEXT NOT NULL,
			autor INT NOT NULL,
			publicado BOOL DEFAULT FALSE,
			deletado BOOL DEFAULT FALSE 
	);`,
	3: `CREATE TABLE IF NOT EXISTS credit_cards (
		id SERIAL,
		autor_id NUMBER NOT NULL,
		first_digits TEXT NOT NULL,
		last_digits TEXT NOT NULL,
		card_hash TEXT NOT NULL,
		brand TEXT NOT NULL,
		holder_name TEXT NOT NULL,
	);`,
	4: `CREATE TABLE IF NOT EXISTS transactions (
		id SERIAL,

	);`,
};

/**
 * Função que elimina uma tabela
 */
const drop = async (tableName) => {
	if (tableName) {
		await database.query(`DROP TABLE ${tableName}`);
		console.log('Tabela dropada!');
	}
};
/**
 * Função que define qual query existente em schema, com o numero respectivo
 * eu vou rodar. Se eu não passar um número, então todas as queries de schema
 * uma a uma serão rodadas.
 */
const up = async (num = null) => {
	if (!num) {
		for (const value in schema) {
			await database.query({ text: schema[value] });
		}
	} else {
		await database.query({ text: schema[num] });
	}
	console.log('Migração rodada');
};

up();

// drop('posts');
