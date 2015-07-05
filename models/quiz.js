module.exports=function(sequelize, DataTypes){
	return sequelize.define('Quiz',{
		pregunta: {
			type: DataTypes.STRING,
			validate:{ noEmpty:{msg: "-> Falta pregunta"}}

		},
		respuesta: {
			type: DataTypes.STRING,
			validate:{ noEmpty:{msg: "-> Falta respuesta"}}

		}
	});
}