var express = require('express');
var router = express.Router();
const { User } = require('../models'); 
const bcrypt = require('bcrypt');
//const crypto = require('crypto');

router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});


router.post('/', async (req, res) => {
  const { email: id, password } = req.body;
  console.log('Email:', id);
  console.log('Password:', password);

  try {
    let user = await User.findOne({ where: { id } });

    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({
        id: id,
        password: hashedPassword,
        lastLogin: new Date(),
        nTries: 0,
        bannedTime: null
      });
      return res.redirect('/image/inicializarBaraja'); 
    }

    const now = new Date();

    if (user.bannedTime && now < user.bannedTime) {
      return res.status(403).send('Usuario bloqueado. Inténtalo de nuevo más tarde.');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      user.lastLogin = now;
      user.nTries = 0;
      user.bannedTime = null;
      await user.save();
      return res.redirect('/image/inicializarBaraja'); 
    } else {
      user.nTries += 1;

      if (user.nTries >= 3) {
        user.bannedTime = new Date(now.getTime() + 5 * 60000); // 5 minutos de baneo
      }

      await user.save();
      return res.status(401).send('Contraseña incorrecta');
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send('Error del servidor');
  }
});


router.post('/logout', (req, res) => {
  res.redirect('/');
});


module.exports = router;
