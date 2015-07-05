var path = require('path');

var Sequelize= require('sequelize');

var sequelize = new Sequelize(null,null,null,{dialect:"sqlite",storage:"quiz.sqlite"});

var Quiz = sequelize.import(path.join(__dirname,'quiz'));

exports.Quiz = Quiz;

sequelize.sync().then(function(){
		Quiz.count().then(function(count){
			if (count===0){
				Quiz.bulkCreate([
							{
								pregunta: 'Capital de Italia',
								respuesta: 'Roma',
								tema:'humanidades'
							},
							{
								pregunta: 'Capital de España',
							 	respuesta: 'Madrid',
								tema:'humanidades'
							},
							{
							 	pregunta: 'Capital de Francia',
							 	respuesta: 'Paris',
								tema:'humanidades'
							}])
				.then(function(){console.log('Base de datos inicializada.')});

			}
		});

});
