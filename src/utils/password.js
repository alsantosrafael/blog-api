const bcrypt = require('bcryptjs');

const check = async (senha, hash) => {
	const compara = await bcrypt.compare(senha, hash);
	return compara;
};
const encrypt = async (senha) => {
	const hash = await bcrypt.hash(senha, 10);
	return hash;
};

// Função anônima de auto execução só para teste das funções anteriores
// (async () => {
// const hash = await encrypt('102030');
// console.log('O hash é: ', hash);
// const comparison = await check('102030', hash);
// console.log('A resposta é: ', comparison);
// })();

module.exports = { check, encrypt };
