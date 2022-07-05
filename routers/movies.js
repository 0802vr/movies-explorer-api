const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const {
  validationPost,
  validationDelete,
} = require('../middlewares/validation');

router.get('/movies', getMovies);
router.post('/movies', validationPost, createMovie);
router.delete('/movies/:movieId', validationDelete, deleteMovie);

module.exports = router;
