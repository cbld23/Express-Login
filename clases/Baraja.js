const Naipes = require('./Naipes');
//+numNaipes:int
class Baraja {
  constructor() {
    this.cartas = [];
  }


//la baraja tiene que ser un conjunto de naipes, toda baraja tiene de 0 a indefinicdos numero de naipes
//los naipes pueden en estar en cero o 1 baraja


  inicializarBaraja(cartas) {
    this.cartas = cartas;
  }

  barajarBaraja() {
    for (let i = this.cartas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cartas[i], this.cartas[j]] = [this.cartas[j], this.cartas[i]];
    }
  }
  //devuelve un naipe
  extraerCartaAleatoria() {
    if (this.cartas.length === 0) {
      return null; // No hay cartas en la baraja
    }
    const cartaIndex = Math.floor(Math.random() * this.cartas.length);
    return this.cartas.splice(cartaIndex, 1)[0]; // Devuelve la carta extraída
  }
  //devuelve un naipe
  extraerPrimeraCarta() {
    if (this.cartas.length === 0) {
      return null; 
    }
    return this.cartas.shift(); // Extrae y devuelve la primera carta del mazo
  }
 

  //extraerUltimo, devuelve un naipe
  extraerUltimaCarta() {
    if (this.cartas.length === 0) {
      return null; 
    }
    return this.cartas.shift(); // Extrae y devuelve la primera carta del mazo
  }

  //devolver(naipe):bool
  devolverCarta(carta) {
    this.cartas.push(carta); // Agrega la carta devuelta al mazo
  }
}

module.exports = Baraja;