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
export const identification = async () => {
  let userId = await JSON.parse(localStorage.getItem("userId"));
  userId = Number(userId);
  await getusers(); // Esperar a que se complete la carga de datos de users

  return userId;
};


//PrintUsers

export const printUsers = async () => {
  if (userpass === true){
  const userId = await identification()
   const users = await getusers()
 console.log(userpass);
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
  
}}




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

// dropdown menu message
export const dropMenu = () => {
  const handleDropdown = (event) => {
    const target = event.target.closest('.down_arrow') || null;

    if (target !== null) {
      // Verificar si el dropdown ya existe
      const dropdownMenu = target.querySelector('.dropdown-menu');

      if (dropdownMenu) {
        // El dropdown ya existe, ocultarlo o eliminarlo
        dropdownMenu.remove(); // Eliminar el elemento del DOM
        // Opción alternativa: dropdownMenu.style.display = 'none'; // Ocultar el elemento
        target.classList.add('down_arrow_active');
      } else {
        const dropdownMenu = document.createElement('ul');
        dropdownMenu.classList.add('dropdown-menu');

        // Crear los elementos del menú
        const menuItem1 = document.createElement('li');
        menuItem1.textContent = 'Editar';
        menuItem1.classList.add('edit_btn');
        const menuItem2 = document.createElement('li');
        menuItem2.textContent = 'Eliminar';
        menuItem2.classList.add('delete_btn');
        // Agregar los elementos del menú al menú desplegable
        dropdownMenu.appendChild(menuItem1);
        dropdownMenu.appendChild(menuItem2);

        // Agregar el menú desplegable como hijo del elemento target
        target.appendChild(dropdownMenu);
        target.classList.remove('down_arrow_active');
      }
    }
  };

  // Eliminar el listener de eventos antes de agregarlo nuevamente
  message__container.removeEventListener('click', handleDropdown);
  message__container.addEventListener('click', handleDropdown);
};























