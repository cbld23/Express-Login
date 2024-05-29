const Naipe = require("./Naipes");

class Baraja {
  constructor(numNaipes) {
    this.numNaipes = numNaipes;
    this.cartas = [];
    this.cartasExtraidas = []; // Nuevo array para almacenar las cartas extraídas
  }

  // Método estático para generar la baraja española
  static generarBarajaEspañola() {
    const palos = ["C", "E", "O", "B"]; // Copas, Espadas, Oros, Bastos
    const valores = ["1", "2", "3", "4", "5", "6", "7", "10", "11", "12"]; 
    const baraja = [];
    palos.forEach((palo) => {
      valores.forEach((valor) => {
        baraja.push(new Naipe(palo, valor));
      });
    });
    return baraja;
  }

  // Inicializar la baraja con la baraja española
  inicializarBarajaEspañola() {
    this.cartas = Baraja.generarBarajaEspañola();
  }

  barajarBaraja() {
    for (let i = this.cartas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cartas[i], this.cartas[j]] = [this.cartas[j], this.cartas[i]];
    }
  }
  /*
  extraerCartaAleatoria() {
    if (this.cartas.length === 0) {
      return null; // No hay cartas en la baraja
    }
    const cartaIndex = Math.floor(Math.random() * this.cartas.length);
    const cartaExtraida = this.cartas.splice(cartaIndex, 1)[0];
    console.log("Valor de la carta extraída:", cartaExtraida.valor);
    console.log("Palo de la carta extraída:", cartaExtraida.palo);
    return new Naipe(cartaExtraida.palo, cartaExtraida.valor); // Devuelve la carta extraída como un objeto Naipe
  }*/
  extraerCartaAleatoria() {
    if (this.cartas.length === 0) {
      return null; // No hay cartas en la baraja
    }
    const cartaIndex = Math.floor(Math.random() * this.cartas.length);
    const cartaExtraida = this.cartas.splice(cartaIndex, 1)[0];
    console.log("Valor de la carta extraída:", cartaExtraida.valor);
    console.log("Palo de la carta extraída:", cartaExtraida.palo);
    const naipe = new Naipe(cartaExtraida.palo, cartaExtraida.valor);
    this.cartasExtraidas.push(naipe); // Agregar la carta extraída al array de cartas extraídas
    return naipe; // Devuelve la carta extraída como un objeto Naipe
  }

  // Método para devolver las cartas extraídas al mazo principal
  devolverCartasExtraidas() {
    this.cartas = this.cartas.concat(this.cartasExtraidas); // Agregar las cartas extraídas al mazo principal
    this.cartasExtraidas = []; // Vaciar el array de cartas extraídas
  }







  extraerPrimeraCarta() {
    if (this.cartas.length === 0) {
      return null;
    }
    const primeraCarta = this.cartas.shift();
    return new Naipe(primeraCarta.palo, primeraCarta.valor); // Devuelve la primera carta del mazo como un objeto Naipe
  }

  extraerUltimaCarta() {
    if (this.cartas.length === 0) {
      return null;
    }
    const ultimaCarta = this.cartas.pop();
    return new Naipe(ultimaCarta.palo, ultimaCarta.valor); // Devuelve la última carta del mazo como un objeto Naipe
  }

  
}

module.exports = Baraja;
