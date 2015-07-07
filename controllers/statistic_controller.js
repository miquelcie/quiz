var models = require('../models/models.js');

exports.statistics = function(req,res,next){

//var quizesAll=[];
//var commentsAll=[];
/*
models.Quiz.findAll().then(function(quizes){
	quizesAll=quizes;

	models.Comment.findAll().then(function(comments){

		commentsAll=comments;


		res.render('quizes/statistic',{quizes:quizes,comments:comments,errors:[]});

	}).catch(function(error){next(error);});

}).catch(function(error){next(error);});

*/

models.Quiz.findAll({
	include: [{ model: models.Comment }]
}).then(function(quizes){

		var stats={
				totalQuiestion: 0,
				totalComments: 0,
				mediaComentarios:0,
				sinComentarios:0,
				conComentarios:0
		};

		stats.totalQuiestion=quizes.length;




		for(var i=0;i<quizes.length;i++){

			stats.totalComments+=quizes[i].Comments.length;

			if(quizes[i].Comments.length==0)
				stats.sinComentarios++;
			else
				stats.conComentarios++;

		}

		if (stats.totalQuiestion>0){

			stats.mediaComentarios= parseFloat(stats.totalComments/stats.totalQuiestion).toFixed(2);


		}






		res.render('quizes/statistic',{stats:stats,errors:[]});

	}).catch(function(error){next(error);});


};

