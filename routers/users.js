const router = require('express').Router();

const {
  getUser,
  updataUser,
} = require('../controllers/users');

const {
  validationGet,
  validationPatch,
} = require('../middlewares/validation');

router.get('/users/me', validationGet, getUser);
router.patch('/users/me', validationPatch, updataUser);

module.exports = router;
