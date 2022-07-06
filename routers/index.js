const router = require('express').Router();
const auth = require('../middlewares/auth');
const users = require('./users');
const movies = require('./movies');

const { createUser, login } = require('../controllers/users');
const { validationLogin, validationUser } = require('../middlewares/validation');

const NotFound = require('../errors/error404');

router.post('/signin', validationLogin, login);
router.post('/signup', validationUser, createUser);

router.use(auth);
router.use(users);
router.use(movies);

router.use('*', (req, res, next) => {
  next(new NotFound('Страница не существует'));
});

module.exports = router;
