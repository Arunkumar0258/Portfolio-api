const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('../models/config');

router.get('/', function(req,res,next) {
        request.get({url: config.apiUrl + '/users'}, function(err, r, users) {
                console.log(users);
        })
        return res.render('hello');
})
router.get('/home', function(req,res,next) {
        return res.render('home');
});

router.get('/signup', function(req,res,next) {
        return res.render('signup');
});

router.post('/signup', function(req,res,next) {
        request.post(config.apiUrl + '/users', {form: req.body}).pipe(res);
});

router.get('/login', function(req,res,next) {
  return res.render('login');
})

router.post('/login', function(req,res,next) {
        request.post(config.apiUrl + '/auth/token', {form: req.body}).pipe(res);
})

router.get('/jet', function(req,res,next) {
        //res.redirect('/home?token=' + req.token);
        res.render('page');
})

module.exports = router;
