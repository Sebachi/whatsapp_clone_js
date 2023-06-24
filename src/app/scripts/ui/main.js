
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



const identification = () =>{
    let userId = JSON.parse(localStorage.getItem("userId"))
     userId = Number(userId)
 return userId
}
identification()

//PrintUsers
export const printUsers = async () => {
  const userId = identification()
   const users = await getusers()
   const check_unactive_svg = "../assets/check-unactive.svg"
   user_icon.src = users[userId - 1].userImage

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
            > <figure><svg viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" fill="#d1d7db" stroke="#d1d7db"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><defs><style>.cls-1{fill:none;stroke:#d1d7db;stroke-miterlimit:10;stroke-width:1.91px;}</style></defs><circle class="cls-1" cx="9.14" cy="9.14" r="7.64"></circle><line class="cls-1" x1="22.5" y1="22.5" x2="14.39" y2="14.39"></line></g></svg></figure></button>
          <button><figure> <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 5C14 6.10457 13.1046 7 12 7C10.8954 7 10 6.10457 10 5C10 3.89543 10.8954 3 12 3C13.1046 3 14 3.89543 14 5Z" fill="#d1d7db"></path> <path d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z" fill="#d1d7db"></path> <path d="M12 21C13.1046 21 14 20.1046 14 19C14 17.8954 13.1046 17 12 17C10.8954 17 10 17.8954 10 19C10 20.1046 10.8954 21 12 21Z" fill="#d1d7db"></path> </g></svg></figure> </button>
        </div>
        `
    message__container.innerHTML= ``
     for (let i = 0; i < message.length; i++) {
       if(userId == message[i].receptor && callback == message[i].emisor){
  
      message__container.innerHTML += `  <div class="message-received message">
            <p>${message[i].text}</p>
            </div>
      `
     } else if(userId == message[i].emisor && callback == message[i].receptor){
        message__container.innerHTML += `  <div class="message-sended message">
              <p>${message[i].text}</p>
              </div>
        `
       }
 }
}

//ReadingChat
 export const  readingChat = async () => {
  chats__container.addEventListener('click', (event) => {
    message__section.classList.remove('hidden')
    const clickedElement = event.target.closest('.chat__container') || null;

    if (!(clickedElement === null))
    {const messageID = clickedElement.getAttribute("id") ;
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

























