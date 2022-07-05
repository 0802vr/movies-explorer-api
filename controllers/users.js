/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Unauthorized = require('../errors/Unauthorized');
const Error400 = require('../errors/error400');
const Error404 = require('../errors/error404');
const Error409 = require('../errors/error409');
const { JWT_KEY } = require('../utils/config');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new Error404('Такой пользователь не найден');
    })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new Error400('Переданы некорретные данные'));
      } else if (err.code === 11000) {
        next(new Error409('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};

const updataUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(() => {
      throw new Error404('Пользователь не найден');
    })
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new Error400('Переданы некорретные данные'));
      } else if (err.code === 11000) {
        next(new Error409('Пользователь с таким email уже существует'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_KEY, { expiresIn: '7d' });
      return res.send({ token });
    })
    .catch(() => {
      next(new Unauthorized('Неверные почта или пароль'));
    });
};

module.exports = {
  getUser, createUser, updataUser, login,
};
