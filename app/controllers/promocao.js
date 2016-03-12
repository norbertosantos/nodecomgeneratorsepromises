module.exports = function(app){
	var controller = {};

	controller.salva = function(req,res) {

		var connection = app.infra.connectionFactory();
		var promocaoDao = new app.infra.PromocaoDao(connection);
		var promocao = req.body;

		req.assert("descricao","A descrição deve ser preenchido").notEmpty();
		var erros = req.validationErrors();

		if (erros){
			res.format({
				html:function(){
					res.render("promocoes/form",{validationErrors:erros,promocao:promocao});	
				},
				json:function(){
					res.status(400).json(erros);
				}
			});
			return;
		}
			promocaoDao.salva(promocao,function(){
				app.get("io").emit("novaPromocao",promocao);
				res.redirect("/promocoes");
			});

	}

	controller.obterFormulario = function(req,res){

		res.render("promocoes/form",{promocao:{}});

	}

	controller.lista = function(req,res) {

		var connection = app.infra.connectionFactory();
		var promocaoDao = new app.infra.PromocaoDao(connection);

		promocaoDao.lista(function(erro,promocoes){
			res.format({
				html:function(){
					res.render("promocoes/lista",{lista:promocoes});		
				},
				json:function(){
					res.json(promocoes);
				}
			});
			
		});
		 
		connection.end();

	};
	

	return controller;
}