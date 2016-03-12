module.exports = function(app){
	var connection = app.infra.connectionFactory();
	var produtoDao = new app.infra.ProdutoDao(connection);
	app.get("/",function(req,res){
		produtoDao.lista(function(erro,produtos){
			res.render("home/index",{livros:produtos});	
		});
		
	});
}