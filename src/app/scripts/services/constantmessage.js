import { printMessage, printUsers, receptorIdentification } from "../ui/main";
import axios from "axios";
import { flagMessage } from "./flags";

let currentMessage = [];
let userpass = JSON.parse(localStorage.getItem("userPass"));

export  function getNewMessage() {
  if (userpass) {
    axios
      .get("https://whatsapclone-backend-production.up.railway.app/messages")
      .then(function (response) {
        let newMessage = response.data;
        let sendId = JSON.parse(localStorage.getItem("sendId")) || null;
        if (sendId !== null) {
          flagMessage()
          printUsers();
          if (JSON.stringify(nuevosMensajes) !== JSON.stringify(mensajesActuales))
        {  printMessage(sendId)}

          currentMessage = newMessage;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}


