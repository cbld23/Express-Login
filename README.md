# LOGIN
Este proyecto es una aplicación configurada para poder jugar a las cartas, en concreto el siete y medio.

Para entrar el usuario tiene que registrarse, verificar el email, e iniciar sesión. 
Tras esto, tendrá accedo al juego, anteriormente mencionado; y otras opciones, como barajar las cartas, 
extraerlas aleatoriamente y visualizarlas posteriormente. 

Tras salir se le redirige al inicio de sesión. Para el envío del email al usuario se está usando MailJet, que ofrece un servicio
api gratuito para este fin. En el archivo .env, se encuentran la clave pública y privada para acceder a esta api.

Los datos de los usuarios se guardan con sqlite, como base de datos.

## Configuración del entorno

Antes de ejecutar el proyecto, asegúrate de crear un archivo `.env` en la raíz del proyecto. Con estas variables,

MAILJET_API_KEY=your-mailjet-api-key
MAILJET_API_SECRET=your-mailjet-api-secret

Para obtener estas api-key, tienes que crear una cuenta en https://www.mailjet.com/es/,
y en el apartado api, dispondrás de estas.


El proyecto se ejecuta en http://localhost:3001
