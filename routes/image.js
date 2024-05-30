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
    baraja.inicializarBarajaEspañola(files);
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

router.post('/extraerCarta', (req, res) => {
  const cartaExtraida = baraja.extraerCartaAleatoria();
  if (!cartaExtraida) {
    return res.status(400).send({ message: 'No hay más cartas en la baraja' });
  }
  res.render('cartaExtraida', { title: 'Carta Extraída', rutaImagen: cartaExtraida.rutaImagen });
});


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
    console.log('Error al devolver las cartas al mazo principal');
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
    // Inicializar la baraja con las cartas del directorio
    baraja.inicializarBarajaEspañola(files);
    res.render('imagenesBaraja', { files });
  });
});




































/*
router.post('/', (req, res) => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading directory');
    }
    res.render('imagenesBaraja', { files });
  });
});


// Función para barajar la baraja
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let baraja = [];

// Ruta para inicializar y mostrar las imágenes
router.get('/', (req, res) => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading directory');
    }
    baraja = files;
    res.render('imagenesBaraja', { title: 'Baraja Española', files: baraja });
  });
});

// Ruta para barajar las imágenes
router.post('/barajar', (req, res) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return res.status(500).send('Error reading directory');
      }
      baraja = files;
      baraja = shuffle([...baraja]); // Crea una copia del array y la baraja
      res.render('imagenesBaraja', { title: 'Baraja Española', files: baraja });
    });
});

let cartaExtraida;
// Ruta para extraer una carta aleatoria
router.post('/extraerCarta', (req, res) => {
  if (baraja.length === 0) {
    return res.status(400).send({ message: 'No hay más cartas en la baraja' });
  }
  const cartaIndex = Math.floor(Math.random() * baraja.length);
  cartaExtraida = baraja.splice(cartaIndex, 1)[0]; // Almacena la carta extraída
  res.render('cartaExtraida', { title: 'Carta Extraída', carta: cartaExtraida });
});

// Ruta para extraer la primera carta del mazo
router.post('/extraerPrimeraCarta', (req, res) => {
  if (baraja.length === 0) {
    return res.status(400).send({ message: 'No hay más cartas en la baraja' });
  }
  cartaExtraida = baraja.shift(); // Extrae y elimina la primera carta del mazo
  res.render('cartaExtraida', { title: 'Primera Carta Extraída', carta: cartaExtraida });
});

// Ruta para devolver la carta al mazo
router.post('/devolverCarta', (req, res) => {
  console.log(req.body.carta);
  const carta = req.body.carta;
  if (!carta) {
    return res.status(400).send({ message: 'Falta información de la carta' });
  }
  // Agrega la carta devuelta al mazo
  baraja.push(carta);
  // Limpia la variable de la carta extraída
  cartaExtraida = null;
  res.send({ message: 'Carta devuelta al mazo exitosamente' });
});

// Ruta para inicializar la baraja
router.post('/inicializarBaraja', (req, res) => {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading directory');
    }
    // Guarda los nombres de los archivos en la baraja
    baraja = files;
    res.render('imagenesBaraja', { files });
  });
});*/


module.exports = router;
