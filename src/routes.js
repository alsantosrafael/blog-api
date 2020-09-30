const Router = require('koa-router');
// const response = require('./controllers/response');
// Preciso puxar as funcionalidades
const router = new Router();

const {
	obterAutores,
	obterAutor,
	adicionarAutor,
	atualizarAutor,
	deletarAutor,
} = require('./controllers/authors');

const {
	obterPostsDeAutor,
	obterPosts,
	adicionarPost,
	atualizarPost,
	deletarPost,
} = require('./controllers/posts');

// Rotas de Autores

router.get('/autor', obterAutores);
router.get('/autor/:id', obterAutor);
router.post('/autor', adicionarAutor);
router.put('/autor/:id', atualizarAutor);
router.delete('/autor/:id', deletarAutor);

// Rotas de Posts

router.get('/posts', obterPosts);
router.get('/posts/:id', obterPostsDeAutor);
router.post('/posts', adicionarPost);
router.put('/posts/:id', atualizarPost);
router.delete('/posts/:id', deletarPost);

module.exports = router;
