 module.exports = function(app){
	var controller = app.controllers.promocao;

	app.get("/promocoes/form",controller.obterFormulario);

	app.post("/promocoes", controller.salva);

	app.get("/promocoes",controller.lista);
};