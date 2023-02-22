const http = require("http");
const server = http.createServer(function (req,res){
    //设置响应头
    res.writeHead(200,{'Content-type':'text/html;charset=UTF-8'})
    res.write('<h1>hello world!你好，世界</h1>')
    res.end()
});
//启动服务
/* server.listen(3000,function(){
    console.log("服务启动成功，请在3000端口进行访问");
}); */
server.listen(1080,'127.0.0.1');
