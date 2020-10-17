/* eslint-disable camelcase */
const db = require('../utils/database');

const salvarCartao = async (card) => {
	const {
		autor_id,
		first_digits,
		last_digits,
		card_hash,
		brand,
		holder_name,
	} = card;

	const query = {
		texto: `INSERT INTO credit_cards 
			(autor_id,
			first_digits,
			last_digits,
			card_hash,
			brand,
			holder_name)
			VALUES($1, $2, $3, $4, $5, $6)`,
		values: [
			autor_id,
			first_digits,
			last_digits,
			card_hash,
			brand,
			holder_name,
		],
	};
	const result = await db.query(query);
	return result.rows.shift();
};

module.exports = { salvarCartao };
