const pagarme = require('../utils/pagarme');

const payment = async (ctx) => {
	const {
		value = 100,
		cardHolderName,
		cardCvv,
		cardNumber,
		cardExpiration,
	} = ctx.request.body;

	if (value >= 100) {
		const transaction = await pagarme.pay(value, {
			card_cvv: cardCvv,
			card_number: cardNumber,
			card_expiration_date: cardExpiration,
			card_holder_name: cardHolderName,
		});

		console.log(transaction);
	}

	ctx.body = 'Sucesso!';
};

module.exports = { payment };
