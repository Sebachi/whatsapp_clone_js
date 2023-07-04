import { printMessage, printUsers, receptorIdentification } from "../ui/main";
import axios from "axios";
import { flagMessage } from "./flags";
import { URL_API } from "./request";

let currentMessage = [];
let userpass = JSON.parse(localStorage.getItem("userPass"));

export  function getNewMessage() {
  if (userpass) {
    axios
      .get(`${URL_API}${"/messages"}`)
      .then(function (response) {
        let newMessage = response.data;
        let sendId = JSON.parse(localStorage.getItem("sendId")) || null;
        if (sendId !== null) {
          flagMessage()
          printUsers();
          if (JSON.stringify(newMessage) !== JSON.stringify(currentMessage))
        {  printMessage(sendId)
        }
        currentMessage = newMessage;



        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}


