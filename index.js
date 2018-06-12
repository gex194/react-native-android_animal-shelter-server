var express = require('express');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database:'react_sql'
});
var app = express();
connection.connect(function(err){
    if(!err) {
        console.log("Database is connected");
    } else {
        console.log("Error connection to database");
    }
});

app.get('/',function(req,res){
    console.log("Type /users for list of users");
})
app.get('/users', function(req,res){
    connection.query('SELECT * FROM users', function(err,rows,fields){
        if(!err) {
            console.log('List of registered users:', rows);
            res.json(rows);
        } else {
            console.log("Error while perfoming query");
        }
    });
});

app.get('/cats',function(req,res) {
    connection.query('SELECT * FROM cats',function(err,rows,fields){
        if(!err) {
            console.log('List of cats:',rows);
            res.json(rows);
        } else {
            console.log("Something went wrong!");
        }
    });
});

app.get('/dogs',function(req,res) {
    connection.query('SELECT * FROM dogs',function(err,rows,fields){
        if(!err) {
            console.log('List of dogs:',rows);
            res.json(rows);
        } else {
            console.log("Something went wrong!");
        }
    });
});

app.post('/pets_add',function(req,res){
       let name = req.body.name;
       let age = req.body.age;
       let type = req.body.type;
       let description = req.body.descrtiption;
    connection.query('INSERT INTO pets(name,age,type,descrtiption) VALUE(?)',function(err){
        if(!err) {
            console.log("Pet added!")
            res.send(name,age,type,description);
        } else {
            console.log(err);
        }
    })
});

app.listen(3000,function(){
    console.log('Example app listening on port 3000!')
});