const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/users', (req, res)=> {
    res.json({
        msg: 'users details'
    })
});

app.post('/user', checkToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, data) => {
        if(err){
            res.sendStatus(403);
        }else{
                res.json({
                msg: 'post completed',
                data
            });
        }
    });

});

app.post('/login', (req, res) => {
    const user = {
        id: 1,
        username : 'vikas',
        email : 'vikas@live.com'
    }
    jwt.sign({user}, 'secretkey', (err, token) => {
        res.json({
            token
        })
    });
});

function checkToken(req, res, next){
    const headers = req.headers['authorization'];
    if(typeof headers !== 'undefined'){
        const token = headers.split(' ');
        console.log(token);
        req.token = token[1];
        next();
    }
    else{
        res.sendStatus(403);
    }
}

app.listen(3000, ()=>{
    console.log('server started');
});