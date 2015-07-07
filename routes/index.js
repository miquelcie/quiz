var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var statisticController = require('../controllers/statistic_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Quiz', errors:[] });
});

router.param('quizId',quizController.load);
router.param('commentId',commentController.load);


// Definicion de rutas de session
router.get('/login',sessionController.new );
router.post('/login',sessionController.create);
router.get('/logout',sessionController.destroy);


// Definicion de rutas de quizes
router.get('/author',quizController.author );

router.get('/quizes',quizController.index);
router.get('/quizes/:quizId(\\d+)',quizController.show );
router.get('/quizes/:quizId(\\d+)/answer',quizController.answer );
router.get('/quizes/new',sessionController.loginRequired, quizController.new);
router.post('/quizes/create',sessionController.loginRequired,quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',sessionController.loginRequired,quizController.edit );
router.put('/quizes/:quizId(\\d+)',sessionController.loginRequired,quizController.update );
router.delete('/quizes/:quizId(\\d+)',sessionController.loginRequired,quizController.destroy );

// Definicion de rutas de commentarios
router.get('/quizes/:quizId(\\d+)/comments/new',commentController.new );
router.post('/quizes/:quizId(\\d+)/comments',commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',sessionController.loginRequired,commentController.publish );

// Definicion de rutas de las estadísticas
router.get('/quizes/statistics',statisticController.statistics );

module.exports = router;
