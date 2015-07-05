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
	if(req.query.search){
		var replaced = req.query.search.split(' ').join('%');
		models.Quiz.findAll({where: ["pregunta like ?", '%'+replaced+'%']}).then(function(quizes){

			res.render('quizes/index',{quizes:quizes});
		}).catch(function(error){next(error);});
	}else{
		models.Quiz.findAll().then(function(quizes){

			res.render('quizes/index',{quizes:quizes});
		}).catch(function(error){next(error);});

	}
};

//Get /quizes/:id
exports.show = function(req,res){

	res.render('quizes/show',{quiz:req.quiz});
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
		res.render('quizes/answer',{respuesta:ret_respuesta,quiz:req.quiz});

};

exports.author = function(req,res){
	res.render('author');
};
//GET /quizes/new
exports.new = function(req,res){
	var quiz= models.Quiz.build(
			{pregunta:"Pregunta",respuesta:"Respuesta"}
		);
	res.render('quizes/new',{quiz:quiz});
};

//POST /quizes/create
exports.create = function(req,res){
	var quiz= models.Quiz.build(req.body.quiz);

	quiz.save({fields:["pregunta","respuesta"]}).then(function(){
		res.redirect('/quizes');
	});
};