var models = require('../models/models.js');


//GET /quizes/:quizId/comments/new
exports.new = function(req,res){

	res.render('comments/new',{quizId:req.params.quizId, errors:[]});
};

//POST /quizes/:quizId/comments
exports.create = function(req,res){
	var comment= models.Comment.build(
		{texto:req.body.comment.texto,
		QuizId:req.params.quizId
		});

	comment
	.validate()
	.then (
		function(err){
			if(err){
				res.render('comments/new',{comment:comment,
					quizId:req.params.quizId,
					errors:err.errors});
			} else{
				comment.save()
				.then(function(){
					res.redirect('/quizes/'+req.params.quizId);
				});
			}
		}
	).catch(function(error){next(error)});


};

//GET /quizes/:id/edit
exports.edit = function(req,res){
	var quiz= req.quiz;
	res.render('quizes/edit',{quiz:quiz, errors:[]});
};

//PUT /quizes/:id
exports.update = function(req,res){
	req.quiz.pregunta= req.body.quiz.pregunta;
	req.quiz.respuesta= req.body.quiz.respuesta;
	req.quiz.tema= req.body.quiz.tema;

	req.quiz
	.validate()
	.then (
		function(err){
			if(err){
				res.render('quizes/edit',{quiz:req.quiz,errors:err.errors});
			} else{
				req.quiz
				.save({fields:["pregunta","respuesta","tema"]})
				.then(function(){
					res.redirect('/quizes');
				});
			}
		}
	);


};

//DELETE /quizes/:id
exports.destroy = function(req,res){
	req.quiz.destroy()
	.then(function(){
		res.redirect('/quizes');
	}).catch(function(error){next(error)});

};