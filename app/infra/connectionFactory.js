var mysql = require("mysql");
var env = require("../../config/config")();

function createConnection(){

		return mysql.createConnection(env.banco);	
  }

 module.exports = function() {
 	return createConnection;
 };	


 