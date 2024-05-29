class Naipe {
  constructor(palo, valor) {
      this.palo = palo;
      this.valor = valor;
      this.rutaImagen = `/images/Baraja/${valor}${palo}.png`;
  }

  
}

module.exports = Naipe;
