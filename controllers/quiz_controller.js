exports.question = function(req,res){
	res.render('quizes/question',{title:'Quiz',pregunta:'Capital de Italia'});
};

exports.answer = function(req,res){
	var ret_respuesta='Incorrecto';
	if (req.query.respuesta==='Roma'){
		ret_respuesta='Correcto';
	}
	res.render('quizes/answer',{title:'Quiz',respuesta:ret_respuesta});
};

exports.author = function(req,res){
	res.render('author',{title:'Quiz'});
};