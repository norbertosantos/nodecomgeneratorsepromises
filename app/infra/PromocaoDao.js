function PromocaoDao(connection){
	this._connection = connection;

}

PromocaoDao.prototype.salva = function(promocao,cb) {
	this._connection.query("insert into promocoes SET ?",promocao, cb);
};

PromocaoDao.prototype.lista = function(cb){
	this._connection.query("select * from promocoes", cb);
};

module.exports = function(){
	return PromocaoDao;
};