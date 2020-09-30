/* Esse arquivo foi criado no intuito de gerar os arrays de posts e autores
 e evitar a recurssão cíclia, de autores chamar posts e posts autores
Quando eu crio esse terceiro elemento eu quebro os problemas de recursão */
const autor = {
	id: 1,
	nome: 'Nícolas',
	sobrenome: 'Deçordi',
	email: 'nicolas.decordi@cubos.io',
	senha: '102030',
	deletado: false,
};

const post = {
	id: 1,
	titulo: 'Como se tornar uma dev Back-end',
	subtitulo: 'Os passos listados...',
	conteudo: 'Os passos para se tornar uma dev Back-end são 3...',
	autor: 1,
	publicado: false,
	deletado: false,
};
const posts = [];
const autores = [];
autores.push(autor);
posts.push(post);

module.exports = { posts, autores };
