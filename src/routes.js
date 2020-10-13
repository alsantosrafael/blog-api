const Router = require('koa-router');

const router = new Router();
const Auth = require('./controllers/auth');
const Password = require('./middlewares/encrypt');
const {
	obterAutores,
	obterAutor,
	adicionarAutor,
	atualizarAutor,
	deletarAutor,
} = require('./controllers/autores');

const {
	obterPost,
	obterPosts,
	adicionarPost,
	atualizarPost,
	deletarPost,
} = require('./controllers/posts');

// Rota de autenticação

router.post('/auth', Auth.autenticar);

// Rotas de Autores

router.get('/autor', obterAutores);
router.get('/autor/:id', obterAutor);
// Estou passando um middleware de criptografia de senha
router.post('/autor', Password.encrypt, adicionarAutor);
router.put('/autor/:id', atualizarAutor);
router.delete('/autor/:id', deletarAutor);

// Rotas de Posts

router.get('/posts', obterPosts);
router.get('/posts/:id', obterPost);
router.post('/posts', adicionarPost);
router.put('/posts/:id', atualizarPost);
router.delete('/posts/:id', deletarPost);

module.exports = router;
