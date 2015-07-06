var models = require('../models/models.js');

exports.load = function(req,res,next, quizId){

	/*models.Quiz.findById(quizId).then(function(quiz){
			if(quiz){
				req.quiz=quiz;
				next();
			} else { next(new Error('No existe quizId='+quizId));}

	}).catch(function(error){next(error);});
*/
models.Quiz.find({
	where: {id:Number(quizId) },
	include: [{ model: models.Comment }]
}).then(function(quiz){
			if(quiz){
				req.quiz=quiz;
				next();
			} else { next(new Error('No existe quizId='+quizId));}

	}).catch(function(error){next(error);});
};

exports.index = function(req,res){
	if(req.query.search){
		var replaced = req.query.search.split(' ').join('%');
		models.Quiz.findAll({where: ["pregunta like ?", '%'+replaced+'%']}).then(function(quizes){

			res.render('quizes/index',{quizes:quizes, errors:[]});
		}).catch(function(error){next(error);});
	}else{
		models.Quiz.findAll().then(function(quizes){

			res.render('quizes/index',{quizes:quizes, errors:[]});
		}).catch(function(error){next(error);});

	}
};

//Get /quizes/:id
exports.show = function(req,res){

	res.render('quizes/show',{quiz:req.quiz, errors:[]});
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
		res.render('quizes/answer',{respuesta:ret_respuesta,quiz:req.quiz, errors:[]});

};

exports.author = function(req,res){
	res.render('author',{errors:[]});
};
//GET /quizes/new
exports.new = function(req,res){
	var quiz= models.Quiz.build(
			{pregunta:"Pregunta",respuesta:"Respuesta",tema:"otros"}
		);
	res.render('quizes/new',{quiz:quiz, errors:[]});
};

//POST /quizes/create
exports.create = function(req,res){
	var quiz= models.Quiz.build(req.body.quiz);

	quiz
	.validate()
	.then (
		function(err){
			if(err){
				res.render('quizes/new',{quiz:quiz,errors:err.errors});
			} else{
				quiz.save({fields:["pregunta","respuesta","tema"]})
				.then(function(){
					res.redirect('/quizes');
				});
			}
		}
	);


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