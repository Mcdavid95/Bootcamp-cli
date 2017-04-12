'use strict'
var repl = require('repl');
var axios = require('axios');

const version = "CLI-App";

var ipRegex = /(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/;
const r = repl.start("MyLocation ");
Object.defineProperty(r.context, 'version', {
    configurable: false,
    enumerable: true,
    value: version
});
// 198.41.209.141
r.defineCommand('locate-me', function(dt) {
    if (!dt) {
        return ipinfo('json');
    } else if (!dt.match(ipRegex)) {
        console.log("Ip address not correct")
    } else {
        return ipinfo(dt);
    }

    function ipinfo(dt) {
        axios.get('http://ipinfo.io/' + dt)
            .then(function(response) {
                // var json = JSON.parse(response);
                console.log(response.data);
            })
            .catch(function(error) {
                console.log(error);
            });
    };
});