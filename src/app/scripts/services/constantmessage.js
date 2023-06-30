import { printMessage, printUsers, receptorIdentification } from "../ui/main";
import axios from "axios";

var currentMessage = [];
let userpass = JSON.parse(localStorage.getItem("userPass"));

export function getNewMessage() {
  if (userpass === true) {
    axios
      .get("https://whatsapclone-backend-production.up.railway.app/messages")
      .then(function (response) {
        var newMessage = response.data;
        let sendId = JSON.parse(localStorage.getItem("sendId")) || null;
        if (sendId !== null) {
          if (JSON.stringify(newMessage) !== JSON.stringify(currentMessage)) {
            console.log('lo estoy haciendo');
            printMessage(sendId);
          
            printUsers();
          }

          currentMessage = newMessage;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

setInterval(getNewMessage, 3000);
