import { printMessage, printUsers, receptorIdentification } from "../ui/main";
import axios from "axios";
import { flagMessage } from "./flags";

var currentMessage = [];
let userpass = JSON.parse(localStorage.getItem("userPass"));

export  function getNewMessage() {
  if (userpass) {
    axios
      .get("https://whatsapclone-backend-production.up.railway.app/messages")
      .then(function (response) {
        var newMessage = response.data;
        let sendId = JSON.parse(localStorage.getItem("sendId")) || null;
        if (sendId !== null) {
          flagMessage()
          printUsers();
          printMessage(sendId)
           

          currentMessage = newMessage;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

setInterval(getNewMessage, 1000);
