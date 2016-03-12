function ProdutoDao(connection){
	this._connection = connection;

}
ProdutoDao.prototype.lista = function(){
	var that = this;
	return new Promise(function(resolve, reject){
			that._connection.query("select * from livros", function(err,produtos){
			if(err){
				reject(err);
			}else{
				resolve(produtos);
			}
		});
	});
	
};

ProdutoDao.prototype.salva = function(produto) {

	var that = this;
	return new Promise(function(resolve, reject){
		that._connection.query("insert into livros SET ?",produto,function(err){
			if(err){
				reject("Não foi possível salvar o produto");
			}else{
				resolve();
			}
		});	
	});
	
};

ProdutoDao.prototype.obterPorId = function(id,cb) {
	this._connection.query("select * from livros where id=?",[id],function(err,retorno){
		cb(err,retorno[0]);
	});
};

ProdutoDao.prototype.atualiza = function(produto,cb) {
	this._connection.query("update livros SET ? WHERE id = ?",[produto,produto.id],function(err){
		cb(err);
	});
};

module.exports = function(){
	return ProdutoDao;
};