const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const Baraja = require('../clases/Baraja');
const Naipes = require('../clases/Naipes');
const directoryPath = path.join(__dirname, '../public/images/Baraja');

// Crear una instancia de Baraja
const baraja = new Baraja();

router.post('/', (req, res) => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading directory');
    }
    // Inicializar la baraja con las cartas del directorio
    baraja.inicializarBarajaEspañola();
    res.render('imagenesBaraja', { files });
  });
});


router.post('/barajar', (req, res) => {
  // Barajar la baraja
  baraja.barajarBaraja();
  const rutaImagenes = baraja.cartas.map(carta => carta.rutaImagen);
  
  // Renderizar la plantilla con las rutas de imágenes
  res.render('barajar', { title: 'Baraja Española', files: rutaImagenes });
});

const extraerCartaAleatoria = (req, res) => {
  const cartaExtraida = baraja.extraerCartaAleatoria();
  if (!cartaExtraida) {
    return res.status(400).send({ message: 'No hay más cartas en la baraja' });
  }
  res.render('cartaExtraida', { title: 'Carta Extraída', rutaImagen: cartaExtraida.rutaImagen });
};

router.post('/extraerCarta', extraerCartaAleatoria);


router.post('/extraerPrimeraCarta', (req, res) => {
  const primeraCarta = baraja.extraerPrimeraCarta();
  if (!primeraCarta) {
    return res.status(400).send({ message: 'No hay más cartas en la baraja' });
  }
  res.render('cartaExtraida', { title: 'Primera Carta Extraída', rutaImagen: primeraCarta.rutaImagen });
});

// Ruta para devolver todas las cartas extraídas
router.post('/devolverCarta', (req, res) => {
  const cartasDevueltas = baraja.devolverCartasExtraidas();
  if (!cartasDevueltas) {
    console.log('No hay cartas para devolver');
    return res.status(500).send({ message: 'Error al devolver las cartas al mazo principal' });
  }
  console.log('Cartas devueltas al mazo principal exitosamente');
  res.render('cartasDevueltas', { title: 'Cartas Devueltas', cartas: cartasDevueltas });
});

router.post('/inicializarBaraja', (req, res) => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading directory');
    }
    baraja.inicializarBarajaEspañola();
    res.render('imagenesBaraja', { files });
  });
});
//ruta para cargar desde el login la baraja
router.get('/inicializarBaraja', (req, res) => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading directory');
    }
    baraja.inicializarBarajaEspañola();
    res.render('imagenesBaraja', { files });
  });
});

//Inicializa el juego
router.post('/siete', (req, res) => {
  res.render('sieteYMedio', {
    title: 'Juego del Siete y Medio',
    backCardImage: '/images/parteTrasera/Trasera.png',
    cartaExtraida: null
  });
});

// Ruta para extraer una carta en el juego del Siete y Medio
router.post('/extraerCartaSieteYMedio', (req, res) => {
  try {
    const cartaExtraida = baraja.extraerCartaAleatoria();
    if (!cartaExtraida) {
      return res.status(400).send({ message: 'No hay más cartas en la baraja' });
    }
    const total = baraja.calcularTotalPuntos();
    if (total > 7.5) {
      const mensaje = 'Has perdido. Tu puntuación supera 7.5.';
      return res.render('sieteYMedio', {
        title: 'Juego del Siete y Medio',
        backCardImage: '/images/parteTrasera/Trasera.png',
        cartaExtraida: cartaExtraida,
        total: total,
        message: mensaje
      });
    }

    // Renderizar la vista con la carta extraída y el total de puntos
    res.render('sieteYMedio', {
      title: 'Juego del Siete y Medio',
      backCardImage: '/images/parteTrasera/Trasera.png',
      cartaExtraida: cartaExtraida,
      total: total
    });

  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Ruta para reiniciar el juego del Siete y Medio
router.post('/reiniciarSiete', (req, res) => {
  baraja.reiniciarBaraja(); // Reinicia la baraja
  res.redirect('/image/siete'); // Redirige a la página del juego inicializado
});

// Ruta para mostrar la página inicial del juego
router.get('/siete', (req, res) => {
  res.render('sieteYMedio', {
    title: 'Juego del Siete y Medio',
    backCardImage: '/images/parteTrasera/Trasera.png',
    cartaExtraida: null,
    total: 0,
    message: null
  });
});

// Ruta para manejar el botón "Plantarse"
router.post('/plantarse', (req, res) => {
  const total = baraja.calcularTotalPuntos();

  // Determinar el resultado
  let resultado;
  if (total === 7.5) {
    resultado = 'Has ganado';
  } else {
    resultado = Math.random() < 0.5 ? 'Has ganado' : 'Has perdido, gana la banca';
  }

  // Renderizar la vista con el resultado
  res.render('sieteYMedio', {
    title: 'Juego del Siete y Medio',
    backCardImage: '/images/parteTrasera/Trasera.png',
    cartaExtraida: null, 
    total: total,
    message: resultado
  });

  // Reiniciar la baraja después de mostrar el resultado
  baraja.reiniciarBaraja();
});


module.exports = router;
