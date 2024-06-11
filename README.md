# LOGIN
Este proyecto es una aplicación configurada para poder jugar a las cartas, en concreto el siete y medio.

Para entrar el usuario tiene que registrarse, verificar el email, e iniciar sesión. 
Tras esto, tendrá accedo al juego, anteriormente mencionado; y otras opciones, como barajar las cartas, 
extraerlas aleatoriamente y visualizarlas posteriormente. 

Tras salir se le redirige al inicio de sesión. Para el envío del email al usuario se está usando MailJet, que ofrece un servicio
api gratuito para este fin. En el archivo .env, se encuentran la clave pública y privada para acceder a esta api.

Los datos de los usuarios se guardan con sqlite, como base de datos.

El proyecto se ejecuta en http://vps-90798686.vps.ovh.net:3001.
