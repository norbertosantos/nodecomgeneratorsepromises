 module.exports = function(app){
	var controller = app.controllers.produto;

	app.get("/produtos",controller.lista);

	app.get("/produtos/form",controller.obterFormulario);

	app.get("/produtos/form/:id",controller.obterPorId);

	app.post("/produtos", controller.salva);

	app.put("/produtos", controller.atualiza);


};
