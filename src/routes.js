const Router = require('koa-router');

const router = new Router();
const Auth = require('./controllers/auth');
const Password = require('./middlewares/encrypt');
const Session = require('./middlewares/session');
const Payments = require('./controllers/payment');

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

// Rota de criação de transação

router.post('/payment', Session.verify, Payments.payment);

// Rotas de Autores

router.get('/autor', obterAutores);
router.get('/autor/:id', obterAutor);
// Estou passando um middleware de criptografia de senha
router.post('/autor', Password.encrypt, adicionarAutor);
router.put('/autor/:id', Session.verify, atualizarAutor);
router.delete('/autor/:id', Session.verify, deletarAutor);

// Rotas de Posts

router.get('/posts', Session.verify, obterPosts);
router.get('/posts/:id', Session.verify, obterPost);
router.post('/posts', Session.verify, adicionarPost);
router.put('/posts/:id', Session.verify, atualizarPost);
router.delete('/posts/:id', Session.verify, deletarPost);

module.exports = router;
