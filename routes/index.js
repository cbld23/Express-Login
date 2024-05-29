var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/logout', (req, res) => {
  res.redirect('/');
});


module.exports = router;
