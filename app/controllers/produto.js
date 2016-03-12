var wrap = require("co-express");
module.exports = function(app){
	var controller = {};

	controller.lista = wrap(function *(req,res) {

		var connection = app.infra.connectionFactory();
		var produtoDao = new app.infra.ProdutoDao(connection);
		try{
			var produtos = yield produtoDao.lista();
			console.log("baixou");
			res.format({
				html:function(){
					res.render("produtos/lista",{lista:produtos});		
				},
				json:function(){
					res.json(produtos);
				}
			});
		 
		
		}catch(err){
			console.log(err);
		}
		connection.end();

	});

	controller.salva = wrap(function*(req,res) {

		var connection = app.infra.connectionFactory();
		var produtoDao = new app.infra.ProdutoDao(connection);
		var produto = req.body;
            
		if(validaFormulario(produto,req,res)){

			try{
				yield produtoDao.salva(produto);
				res.redirect("/produtos");	
			}catch(err){
				return console.log(err);
			}
			
				
		}


	});

	controller.obterFormulario = function(req,res){

		res.render("produtos/form",{produto:{}});

	}

	controller.obterPorId = function(req,res){

		var connection = app.infra.connectionFactory();
		var produtoDao = new app.infra.ProdutoDao(connection);
		var id = req.params.id;

		produtoDao.obterPorId(id,function(erro,produto){
			res.render("produtos/form",{produto:produto});
		});
	}

	controller.atualiza = function(req,res) {

		console.log("Chamei PUT");
		var connection = app.infra.connectionFactory();
		var produtoDao = new app.infra.ProdutoDao(connection);
		var produto = req.body;

		if(validaFormulario(produto,req,res)){
			produtoDao.atualiza(produto,function(erro){
				res.redirect("/produtos");
			});
		}

	}

	function validaFormulario(produto,req,res) {
		
		req.assert("titulo","O titulo deve ser preenchido").notEmpty();
		req.assert("preco","O preco deve ser um numero").isFloat();
		var erros = req.validationErrors();

		if (erros){
			res.format({
				html:function(){
					res.render("produtos/form",{validationErrors:erros,produto:produto});	
				},
				json:function(){
					res.status(400).json(erros);
				}
			});
			return false;
		}
		return true;
	}

	return controller;
}