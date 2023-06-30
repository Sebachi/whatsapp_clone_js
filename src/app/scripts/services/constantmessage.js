import { printMessage, printUsers } from "../ui/main";

// Definir una variable para almacenar los mensajes actuales
var mensajesActuales = [];

// Definir una función para obtener los nuevos mensajes
export function getNewMessage() {
  axios.get('/ruta-para-obtener-mensajes')
    .then(function (response) {
      var nuevosMensajes = response.data;

      // Verificar si los mensajes recibidos son diferentes a los actuales
      if (JSON.stringify(nuevosMensajes) !== JSON.stringify(mensajesActuales)) {
        // Ejecutar la función si los mensajes son diferentes
        printMessage(sendId)
        printUsers()
      }

      // Actualizar los mensajes actuales
      mensajesActuales = nuevosMensajes;
      
      // Actualizar la interfaz de usuario con los nuevos mensajes
      // ...
    })
    .catch(function (error) {
      console.log(error);
    });
}

// Establecer un intervalo para realizar las consultas periódicas
setInterval(obtenerNuevosMensajes, 5000); // Consulta cada 5 segundos