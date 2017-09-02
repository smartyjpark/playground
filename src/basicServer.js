const fs = require('fs');
const axios = require('axios');
const async = require('async');


class Server {
    constructor(){
        this.account = JSON.parse(fs.readFileSync('./config/account.json', 'utf8'));
    }

    runServer(){
        var http = require('http');
        http.createServer(function (req, res) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('Hello World');
        }).listen(1337, '127.0.0.1');
        console.log('Server running at http://127c.0.0.1:1337/');
    }
    getToken(){
        axios({
            method : "post",
            url : this.account.api.url,
            headers: {
                "Content-Type" : "application/x-www-form-urlencoded",
                "Authorization": this.account.api.auth
            },
            params : {
                scope : "read",
                grant_type : "password",
                client_id : this.account.api.client_id,
                client_secret : this.account.api.client_secret,
                username : this.account.baemin.id,
                password : this.account.baemin.pw
            }
        })
            .then(function(response){
                // console.log(response.data.access_token);
                this.token = response.data.access_token;
                console.log(this.token)
            }.bind(this))
            .catch(function (err) {
                console.log(err);
            });
    }
    logToken(){
        console.log(this.token)
    }
}

module.exports = function(){
    const myServer = new Server();
    async.series([myServer.getToken()], function(){
        myServer.logToken()
    })
}