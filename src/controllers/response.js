const response = (ctx, dados, codeStatus = 200) => {
	const code = codeStatus >= 200 && codeStatus <= 399 ? 'sucesso' : 'erro';
	ctx.status = codeStatus;
	ctx.body = {
		code,
		dados,
	};
};

module.exports = response;
