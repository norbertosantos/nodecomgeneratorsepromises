module.exports = function(app){
	var controller = {};

	controller.lista = function(req,res) {
		return res.json("[{nome:Fluminense},{nome:Barcelona},{nome:Ibis}]");
	}	

	return controller;
}	