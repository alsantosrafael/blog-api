const Axios = require('axios').default;

require('dotenv').config();

const pay = async (amount, card) => {
	try {
		const transaction = await Axios.post(
			'https://api.pagar.me/1/transactions',
			{
				amount,
				...card,
				payment_method: 'credit_card',
				api_key: process.env.PAGARME_KEY,
			}
		);
		return transaction.data;
	} catch (err) {
		console.log(err.response.data);
		return {
			status: 'error',
			data: {
				mendagem: 'Erro no pagamento!',
			},
		};
	}
};

module.exports = { pay };
