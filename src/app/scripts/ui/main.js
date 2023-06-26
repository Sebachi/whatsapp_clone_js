
const d = document
const input_message = d.getElementById("input_message")
const sent_button = d.getElementById("sent_button")
const message__container = d.getElementById("message__container")
const chats__container = d.getElementById("chats__container")
const backBtn = d.querySelector(".backBtn")

import { getMessage } from "../services/request"
import { getusers } from "../services/request"


const identification = () => {
  let userId = JSON.parse(localStorage.getItem("userId"))
  userId = Number(userId)
  return userId
}
identification()

//PrintUsers
export const printUsers = async () => {
  const users = await getusers()
  const check_unactive_svg = "../assets/check-unactive.svg"
  for (let i = 0; i < users.length; i++) {

    chats__container.innerHTML += ` <div class="chat__container" id="message${users[i].messageId}" name="${users[i].messageId}" data-id="${users[i].messageId}">
        <div class="contact-icon"
          ><img src="${users[i].userImage}" alt=""
        /></div>
        <div class="contact__inf_chat">
          <span class="name_hour"
            ><p class="contact_name">${users[i].user_name}</p>
            <p class="hour_message">5:26 P.M.</p></span
          >
          <span  class="preview"
            ><figure class="checks"><svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

            <g id="SVGRepo_bgCarrier" stroke-width="0"/>

            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

            <g id="SVGRepo_iconCarrier"> <g id="Interface / Check_All_Big"> <path id="Vector" d="M7 12L11.9497 16.9497L22.5572 6.34326M2.0498 12.0503L6.99955 17M17.606 6.39355L12.3027 11.6969" stroke="#d1d7db" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g> </g>

            </svg></figure>
            <p class="message_preview">
              Se pueden editar propiedades
            </p></span
          >
        </div>
      </div>`
  }
}




//PrintMessage
const printMessage = async (callback) => {
  const message = await getMessage()
  const userId = identification()

  message__container.innerHTML = ``
  for (let i = 0; i < message.length; i++) {
    if (userId == message[i].receptor && callback == message[i].emisor) {
      console.log(message[i].text);
      message__container.innerHTML += `  <div class="message-received message">
            <p>${message[i].text}</p>
            </div>
      `
    } else if (userId == message[i].emisor && callback == message[i].receptor) {
      message__container.innerHTML += `  <div class="message-sended message">
              <p>${message[i].text}</p>
              </div>
        `
    }
  }
}

//ReadingChat
export const readingChat = async () => {
  chats__container.addEventListener('click', (event) => {
    const clickedElement = event.target.closest('.chat__container') || null;

    if (!(clickedElement === null)) {
      const messageID = clickedElement.getAttribute("id");
      const chatId = messageID.match(/\d+/)[0];
      console.log(chatId);
      printMessage(chatId);
    }
    else {
      console.log('no chat in this space');
    }

  })

}

//ReturnLogin
export const returnLogin = () => {
  if (identification() === null) {
    alert('Credenciales invalidas')
    location.reload
  }
}

export const backToChat = () => {
  backBtn.addEventListener("lick", () => {

  })
}























