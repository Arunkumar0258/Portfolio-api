const express = require('express')
const app = express();

app.get('/', function(req, res) {
        res.send('hello world')
        console.log('this is awesome')
})

app.listen(3000, function() {
        console.log('server is running in port 3000');
})


