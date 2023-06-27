const d = document
const input_message = d.getElementById("input_message")
const sent_button = d.getElementById("sent_button")
const sendForm = d.getElementById('sendForm')
const message__container = d.getElementById("message__container")
const chats__container = d.getElementById("chats__container")
import { getMessage, postMessage, getusers } from "../services/request"
const message__header = d.getElementById('message__header')
const message__section = d.getElementById('message__section')
const user_icon = d.getElementById('user_icon')
import magifyingglass from '../../../assets/magnifying-glass-svgrepo-com.svg';
import dots from '../../../assets/3dots-com.svg';
import unactiveChecks from  "../../../assets/check-unactive.svg"
import activeChecks from "../../../assets/check-active.svg"
import down_arrow from "../../../assets/arrow-down.svg"

let userpass = JSON.parse(localStorage.getItem("userPass"))


//identification
const identification = () =>{
  let userId = JSON.parse(localStorage.getItem("userId"))
   userId = Number(userId)
return userId
}
identification()

//PrintUsers

export const printUsers = async () => {
  if (userpass === true){
  const userId = identification()
   const users = await getusers()
 user_icon.src = users[userId - 1].userImage;

    for (let i = 0; i < users.length; i++) {

        chats__container.innerHTML += ` <div class="chat__container" id="message${users[i].messageId}" name="${users[i].messageId}" data-id="${users[i].messageId}">
        <div class="contact-icon"
          ><img src="${users[i].userImage}" alt=""
        /></div>
        <div class="contact__inf_chat">
          <span class="name_hour"
            ><p class="contact_name">${users[i].name}</p>
            <p class="hour_message">5:26 P.M.</p></span
          >
          <span  class="preview"
            ><figure class="checks"> <img src=${unactiveChecks}> </figure>
            <p class="message_preview">
              Se pueden editar propiedades
            </p></span
          >
        </div>
      </div>`
    }
  
}

}




//PrintMessage
let idReceptor  = ``
const printMessage = async (callback) => {
    const message = await getMessage()
    const userId = identification()
    const userlist = await getusers()
    message__header.innerHTML= `
    <button class="profile_name">
          <div class="user-icon"
            ><img src="${userlist[callback - 1].userImage}" alt=""
          /></div>
          <span>${userlist[callback - 1].name}</span>
        </button>
        <div class="icons-message">
          <button
            ><img src=${magifyingglass}> </button>
          <button><img src=${dots}> </button>
        </div>
        `
    message__container.innerHTML= ``
     for (let i = 0; i < message.length; i++) {
       if(userId == message[i].receptor && callback == message[i].emisor){
      message__container.innerHTML += `  <div class="message-received message"
            <p id='${message[i].id}'>${message[i].text}</p> <button class="down_arrow down_arrow_active"><img src=${down_arrow}></button>
            </div>
      `
     } else if(userId == message[i].emisor && callback == message[i].receptor){
        message__container.innerHTML += `  <div class="message-sended message">
              <p id='${message[i].id}'>${message[i].text}</p> <button class="down_arrow down_arrow_active"><img  src=${down_arrow}></button>
              </div>
        `
       }
 }
}

//ReadingChat
 export const  readingChat = async () => {
  chats__container.addEventListener('click', (event) => {
    const default_message = d.getElementById('default_message')
   
    const clickedElement = event.target.closest('.chat__container') || null;

    if (!(clickedElement === null))
    {
      default_message.classList.add('hidden')
      message__section.classList.remove('hidden')
      const messageID = clickedElement.getAttribute("id") ;
    const chatId = messageID.match(/\d+/)[0];
    printMessage(chatId);
    idReceptor = chatId
    console.log(idReceptor);
  }
    else{
      console.log('no chat in this space');
    }
  })
}

//ReturnLogin
 export const returnLogin = () => {
  if (identification() === null) {
    alert('Credenciales invalidas')
    location.reload
  }}



//SendMessage
export const sendMessage =  () => {
  const handdletoogle = async () => {
    const newMessage = input_message.value
    const idReceptorNum = Number(idReceptor)
    let prototypeMessage = {
      "receptor": idReceptorNum,
      "emisor": identification(),
      "text": newMessage,
      "date": "",
    }
    const pepino = prototypeMessage
    await postMessage(pepino)
   input_message.value = ''
    printMessage(idReceptorNum)
  }

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      await handdletoogle()
      }
  }

  input_message.addEventListener('keypress', handleKeyPress);

  sent_button.addEventListener('click', async () => {

    await handdletoogle()
  })

}























