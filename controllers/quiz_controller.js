var models = require('../models/models.js');

exports.load = function(req,res,next, quizId){

	models.Quiz.findById(quizId).then(function(quiz){
			if(quiz){
				req.quiz=quiz;
				next();
			} else { next(new Error('No existe quizId='+quizId));}

	}).catch(function(error){next(error);});
};

exports.index = function(req,res){

	models.Quiz.findAll().then(function(quizes){

		res.render('quizes/index',{title:'Quiz',quizes:quizes});
	}).catch(function(error){next(error);});
};

//Get /quizes/:id
exports.show = function(req,res){
	res.render('quizes/show',{title:'Quiz',quiz:req.quiz});
	/*models.Quiz.findById(req.params.quizId).then(function(quiz){
		console.log('sss'+quiz.id);
		res.render('quizes/show',{title:'Quiz',quiz:quiz});
	}).catch(function(error){next(error);});*/
};


//Get /quizes/:id/answer

exports.answer = function(req,res){
		var ret_respuesta='Incorrecto';
		if (req.query.respuesta===req.quiz.respuesta){
			ret_respuesta='Correcto';
		}
		res.render('quizes/answer',{title:'Quiz',respuesta:ret_respuesta,quiz:req.quiz});

};

exports.author = function(req,res){
	res.render('author',{title:'Quiz'});
};