/*
var http = require("http");
var ip = 3000;

var server = http.createServer(function(req,res){
	console.log("Me Chamou");
	res.writeHead(200,{ContentType:"text/html"});
	res.end("<html><body>Olá</body></html>");
}).listen(ip,function(){
   console.log("Servidor iniciado");
});
*/
var app = require("./config/express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

//Seta uma variável de ambiente do socket.io que será usada em todos os locais que o express é usado.
app.set("io",io);

var server = http.listen(3000, function(){
	console.log("Servidor Rodando");
});