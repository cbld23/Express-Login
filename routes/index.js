var express = require('express');
var router = express.Router();
const { User } = require('../models'); 
const bcrypt = require('bcrypt');
//const crypto = require('crypto');

router.get('/', function(req, res, next) {
  res.render('registro', { title: 'Express' });
});


module.exports = router;
