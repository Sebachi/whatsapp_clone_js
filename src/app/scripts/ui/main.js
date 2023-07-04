const d = document;
const input_message = d.getElementById("input_message");
const sent_button = d.getElementById("sent_button");
const sendForm = d.getElementById("sendForm");
const message__container = d.getElementById("message__container");
const chats__container = d.getElementById("chats__container");
import { getMessage, postMessage, getusers } from "../services/request";
const message__header = d.getElementById("message__header");
const message__section = d.getElementById("message__section");
const user_icon = d.getElementById("user_icon");
//const backArrow = d.getElementById("backArrow"); //boton regreso
const searchBtn = d.getElementById("searchBtn");
const searchInput = d.getElementById("searchInput");
const cross_search_bar = d.getElementById("cross_search_bar");
const chats__section = d.getElementById("chats__section"); //mejor declararla aqui por que ya existe
const default_message = d.getElementById("default_message");
const contact__main = d.getElementById("contact__main");
const search__container = d.querySelector(".search__container");
// parte mensajes en el chat
const message__search__section = d.getElementById("message__search__section");
const cancel_message_cross_search_bar = d.getElementById(
  "cancel_message_cross_search_bar"
);
let messageSearchBtn1 = d.getElementById("messageSearchBtn1");
const messageSearchBtn2 = d.getElementById("messageSearchBtn2");
const messageSearchInput = d.getElementById("messageSearchInput");
const message_cross_search_bar = d.getElementById("message_cross_search_bar");
const message__search__container = d.querySelector(
  ".message__search__container"
);

import magifyingglass from "../../../assets/magnifying-glass-svgrepo-com.svg";
import dots from "../../../assets/3dots-com.svg";
import unactiveChecks from "../../../assets/check-unactive.svg";
import activeChecks from "../../../assets/check-active.svg";
import emptyChecks from "../../../assets/empty-svgrepo-com.svg";
import down_arrow from "../../../assets/arrow-down.svg";
import { DateTime } from "luxon";
import left_arrow from "../../../assets/arrow-left-com.svg";
import green_dot from "../../../assets/green-dot.svg";

let userpass = JSON.parse(localStorage.getItem("userPass"));

//identification
const identification = () => {
  let userId = JSON.parse(localStorage.getItem("userId"));
  userId = Number(userId);
  return userId;
};
identification();

export const receptorIdentification = () => {
  let sendId = JSON.parse(localStorage.getItem("sendId"));
  sendId = Number(sendId);
  return sendId;
};

//PrintUsers

export const printUsers = async () => {
  if (userpass === true) {
    const userId = identification();
    const users = await getusers();
    user_icon.src = users[userId - 1].userImage;
    const messages = await getMessage();
    chats__container.innerHTML = ``;
    for (let i = 0; i < users.length; i++) {
      let lastMessage, lastHour, lastStatus;
      for (let j = 0; j < messages.length; j++) {
        if (
          (messages[j].emisor === users[i].id &&
            messages[j].receptor === userId) ||
          (messages[j].emisor === userId &&
            messages[j].receptor === users[i].id)
        ) {
          lastMessage = messages[j].text;
          lastHour = messages[j].hour;
          lastStatus = messages[j].status;
        }
      }
      if (lastStatus == "active") {
        lastStatus = activeChecks;
      } else if (lastStatus == "unactive") {
        lastStatus = unactiveChecks;
      } else if (!lastStatus) {
        lastStatus = emptyChecks;
      }
      let usersFlag = users[i].flag;
      let on_off_user;
      if (usersFlag) {
        on_off_user = green_dot;
      } else {
        on_off_user = emptyChecks;
      }
      if (userId != users[i].id) {
        chats__container.innerHTML += ` <div class="chat__container" id="message${
          users[i].id
        }" data-id="${users[i].id}">
        <div class="contact-icon" name="${users[i].id}"
          ><img alt='user_profileImg' src="${users[i].userImage}" alt=""
        /></div>
        <div class="contact__inf_chat">
          <span class="name_hour"
            ><p class="contact_name">${users[i].name}</p>
            <p class="hour_message">${lastHour || ""}</p></span
          >
          <span  class="preview"
            ><figure class="checks"> <img alt='Unactive_checks' src=${lastStatus}> </figure>
            <p class="message_preview">
              ${lastMessage || ""}
            </p> <figure class="flag_user"> <img alt='green_dots' src=${on_off_user}> </figure></span
          >
        </div>
      </div>`;
      }
    }
  }
};

//PrintMessage
let idReceptor = ``;
export const printMessage = async (callback) => {
  const scrollToBottom = () => {
    message__container.scrollTop = message__container.scrollHeight;
  };
  const message = await getMessage();
  const userId = identification();
  const userlist = await getusers();
  const receptorId = receptorIdentification();
  const userIconImg = d.getElementById("user-icon-img"); //.src
  const userNameSpan = d.getElementById("user-name-span"); //.text

  userIconImg.src = userlist[callback - 1].userImage;
  userNameSpan.textContent = userlist[callback - 1].name;
  /*
  message__header.innerHTML = ` 
    <button class="backArrow" id="backArrow"><img src=${left_arrow}
      alt="left_arrow">
    </button>

    <button class="profile_name">
      <div class="user-icon" id="user_icon"
        ><img alt='UserProfileImg' src="${userlist[callback - 1].userImage}" alt=""
      /></div>
      <span>${userlist[callback - 1].name}</span>
    </button>

    <div class="icons-message">
      <button id="messageSearchBtn1"
        ><img alt='magifyingglass' src=${magifyingglass}> </button>
      <button><img alt='3dots' src=${dots}> </button>
    </div>
    `
  */

  message__container.innerHTML = ``;

  for (let i = 0; i < message.length; i++) {
    let lastStatus = message[i].status;
    if (lastStatus == "active") {
      lastStatus = activeChecks;
    } else if (lastStatus == "unactive") {
      lastStatus = unactiveChecks;
    } else if (!lastStatus) {
      lastStatus = emptyChecks;
    }

    if (
      (message[i].emisor === receptorId && message[i].receptor === userId) ||
      (message[i].emisor === userId && message[i].receptor === receptorId)
    ) {
      if (message[i].receptor == userId) {
        message__container.innerHTML += `  
          <div class="message-received message" id="${message[i].id}" name="message${message[i].id}">
            <div>
              <p >${message[i].text}</p> 
              <button class="down_arrow menuTrigger down_arrow_active">
                <img alt='down_arrow'src=${down_arrow}>
              </button>
            </div> 
            <div class='message_widgets'> 
              <img class='message_flag' alt='message_flag' src=${lastStatus}>  
              <span class='hour_message'>${message[i].hour}</span> 
            </div>
          </div>
      `;
      } else {
        message__container.innerHTML += `  
          <div class="message-sended message" id="${message[i].id}" name="message${message[i].id}">
              <div>
                <p >${message[i].text}</p> 
                <button class="down_arrow menuTrigger down_arrow_active">
                  <img alt='down_arrow' src=${down_arrow}>
                </button>
              </div>
              <div class='message_widgets'> 
                <img alt='message_flag' class='message_flag' src=${lastStatus}>  
                <span class='hour_message'>${message[i].hour}</span> 
              </div>
            </div>
        `;
      }
    }
    scrollToBottom();
  }
};

const printChat = (click) => {
  default_message.classList.add("hidden");
  message__section.classList.remove("hidden");
  message__section.classList.remove("movilLayout"); //si lo tiene
  const messageID = click.getAttribute("id");
  const chatId = messageID.match(/\d+/)[0];
  printMessage(chatId);
  message__container.setAttribute("data-id", receptorIdentification());
  idReceptor = chatId;
  //se hace invisible la parte de contactos
  chats__section.classList.add("movilLayout");
  //configuracion extra debido a la busqueda en mensajes
  message__search__section.classList.add("hidden");
  messageSearchInput.value = "";
  message__search__container.innerHTML = "";
};

//ReadingChat
export const readingChat = async () => {
  chats__container.addEventListener("click", (event) => {
    const clickedElement = event.target.closest(".chat__container") || null;

    if (!(clickedElement === null)) {
      const sendId = clickedElement.getAttribute("data-id");
      localStorage.setItem("sendId", sendId);
      printChat(clickedElement);
    }
  });
};

//clicks al filtro
export const readingFilter = async () => {
  search__container.addEventListener("click", (event) => {
    const clickedFilteredMessage =
      event.target.closest(".filtered__message") || null;
    if (!(clickedFilteredMessage === null)) {
      default_message.classList.add("hidden");
      message__section.classList.remove("hidden");
      message__section.classList.remove("movilLayout"); //si lo tiene
      const filterID = clickedFilteredMessage.getAttribute("data-id");
      localStorage.setItem("sendId", filterID);
      const chatId = filterID.match(/\d+/)[0];
      printMessage(chatId);

      idReceptor = chatId;

      //se hace invisible la parte de contactos

      chats__section.classList.add("movilLayout");
    }
    const clickedElement = event.target.closest(".chat__container") || null;

    if (!(clickedElement === null)) {
      const sendId = clickedElement.getAttribute("data-id");
      localStorage.setItem("sendId", sendId);
      printChat(clickedElement);
    }
  });
};

//ReturnLogin
export const returnLogin = () => {
  if (identification() === null) {
    alert("Credenciales invalidas");
    location.reload;
  }
};

//SendMessage

export const sendMessage = () => {
  const handdletoogle = async () => {
    // LUXON IMPLEMENTATION
    const dt = DateTime.local().setZone("America/Bogota");
    const hournow = dt.toLocaleString(DateTime.TIME_SIMPLE);
    const dateNow = dt.toLocaleString(DateTime.DATE_SHORT);
    const newMessage = input_message.value;
    const idReceptorNum = Number(idReceptor);
    const status = "unactive";
    let prototypeMessage = {
      receptor: idReceptorNum,
      emisor: identification(),
      text: newMessage,
      date: dateNow,
      hour: hournow,
      status: status,
    };
    const pepino = prototypeMessage;
    await postMessage(pepino);
    input_message.value = "";
    printMessage(idReceptorNum);
  };

  const handleKeyPress = async (event) => {
    if (event.key === "Enter") {
      await handdletoogle();
    }
  };

  input_message.addEventListener("keypress", handleKeyPress);

  sent_button.addEventListener("click", async () => {
    await handdletoogle();
  });
};

export const quitMessage = () => {
  message__header.addEventListener("click", (event) => {
    const backClick = event.target.closest(".backArrow") || null;
    if (!(backClick === null)) {
      message__section.classList.add("movilLayout");
      chats__section.classList.remove("movilLayout");
    }
  });
};

const printFilter = async () => {
  if (searchInput.value) {
    chats__container.classList.add("hidden");
    search__container.classList.remove("hidden");
    search__container.classList.remove("movilLayout");
  } else if (!searchInput.value) {
    chats__container.classList.remove("hidden");
    search__container.classList.add("hidden");
    search__container.classList.add("movilLayout");
  } else {
    console.log("hubo en error en busqueda");
  }

  const searchText = searchInput.value.toLowerCase();
  const preFilterUsers = await getusers();
  const preFilterMessages = await getMessage();
  search__container.innerHTML = `
  <div id="searchUsersContainer"> 
  <h3 id="searchTitle1" class="searchTittle"> usuarios encontrados <h3>
  </div>
  <div id="searchMessagesContainer"> 
  <h3 id="searchTitle2" class="searchTittle"> mensajes encontrados </h3>
  </div>
  `;
  const searchUsersContainer = d.getElementById("searchUsersContainer");
  const searchMessagesContainer = d.getElementById("searchMessagesContainer");

  for (let i = 0; i < preFilterUsers.length; i++) {
    if (preFilterUsers[i].name.toLowerCase().includes(searchText)) {
      searchUsersContainer.innerHTML += `
      <div class="chat__container" id="message${preFilterUsers[i].id}" data-id="${preFilterUsers[i].id}">
      <div class="contact-icon"
        ><img alt='Profile_pic' src="${preFilterUsers[i].userImage}" alt=""
      /></div>
      <div class="contact__inf_chat">
        <span class="name_hour"
          ><p class="contact_name">${preFilterUsers[i].name}</p>
          <p class="hour_message">5:26 P.M.</p></span
        >
        <span  class="preview"
          ><figure class="checks"> <img src=${unactiveChecks} alt='Unactive_checks'> </figure>
          <p class="message_preview">
            Se pueden editar propiedades
          </p></span
        >
      </div>
    </div>
        `;
    } //primer if
  }
  //aqui sigo
  const receptorId = receptorIdentification();
  const userId = identification();
  let filteredUser;
  for (let j = 0; j < preFilterMessages.length; j++) {
    if (
      preFilterMessages[j].emisor === userId ||
      preFilterMessages[j].receptor === userId
    ) {
      if (preFilterMessages[j].text.toLowerCase().includes(searchText)) {
        if (preFilterMessages[j].emisor == userId) {
          filteredUser = preFilterUsers[preFilterMessages[j].receptor - 1].name;
        } else if (preFilterMessages[j].emisor == receptorId) {
          filteredUser = preFilterUsers[preFilterMessages[j].emisor - 1].name;
        } else {
          filteredUser = ``;
        }

        searchMessagesContainer.innerHTML += `
      <div class="filtered__message" id="message${
        preFilterMessages[j].id
      }" data-id="${
          preFilterMessages[j].emisor == userId
            ? preFilterMessages[j].receptor
            : preFilterMessages[j].emisor
        }">
  
      <div class="contact__inf_chat">
        <span class="name_hour"
          ><p class="contact_name">${filteredUser}</p>
          <p class="hour_message">${preFilterMessages[j].hour}</p></span
        >
        <span  class="preview"
          ><figure class="checks"> <img src=${unactiveChecks} alt='Unactive_checks'> </figure>
          <p class="message_preview">
          ${preFilterMessages[j].text}
          </p></span>
      </div>
    </div>
      `;
      }
    }
  }
};

export const searchMessage = () => {
  searchBtn.addEventListener("click", printFilter);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      printFilter();
    }
  };

  searchInput.addEventListener("keypress", handleKeyPress);

  cross_search_bar.addEventListener("click", () => {
    searchInput.value = "";
    chats__container.classList.remove("hidden");
    search__container.classList.add("hidden");
  });
};

export const searchChatMessage = () => {
  //mensajes del chat
  const printMessageFilter = async () => {
    const userId = identification();
    const sendId = receptorIdentification();
    const messageSearchText = messageSearchInput.value.toLowerCase();
    const preFilterMessages = await getMessage();

    const messagesList = Array.from(message__container.children);

    message__search__container.innerHTML = "";
    for (let i = 0; i < preFilterMessages.length; i++) {
      if (
        (preFilterMessages[i].emisor === userId &&
          preFilterMessages[i].receptor === sendId) ||
        (preFilterMessages[i].emisor === sendId &&
          preFilterMessages[i].receptor === userId)
      ) {
        if (
          preFilterMessages[i].text.toLowerCase().includes(messageSearchText)
        ) {
          message__search__container.innerHTML += `
        <div class="filtered__message" id="message${
          preFilterMessages[i].id
        }" data-id="${
            preFilterMessages[i].emisor == identification()
              ? preFilterMessages[i].receptor
              : preFilterMessages[i].emisor
          }">
    
        <div class="contact__inf_chat">
          <span class="name_hour"
            ><p class="contact_name"></p>
            <p class="hour_message">${preFilterMessages[i].hour}</p></span
          >
          <span  class="preview"
            ><figure class="checks"> <img src=${unactiveChecks} alt='Unactive_checks'> </figure>
            <p class="message_preview">
            ${preFilterMessages[i].text}
            </p></span>
        </div>
      </div>`;
        }
      }
    }
  };
  messageSearchBtn1.addEventListener("click", () => {
    message__section.classList.add("movilLayout");
    message__search__section.classList.remove("hidden");
    message__search__section.classList.remove("movilLayout");
  });

  cancel_message_cross_search_bar.addEventListener("click", () => {
    message__section.classList.remove("movilLayout");
    message__search__section.classList.add("hidden");
  });

  //parte de lectura del filtro
  messageSearchBtn2.addEventListener("click", printMessageFilter);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      printMessageFilter();
    }
  };

  messageSearchInput.addEventListener("keypress", handleKeyPress);

  message_cross_search_bar.addEventListener("click", () => {
    messageSearchInput.value = "";
    message__search__container.innerHTML = "";
  });

  message__search__container.addEventListener("click", (event) => {
    const clickedElement = event.target.closest(".filtered__message") || null;
    const messageID = clickedElement.getAttribute("id");
    const chatId = messageID.match(/\d+/)[0];

    if (!(clickedElement === null)) {
      const toScroll = document.getElementsByName(`message${chatId}`);
      message__section.classList.remove("movilLayout");
      message__search__section.classList.add("movilLayout");

      //toScroll.scrollIntoView
      //message__container.scrollTop = 20 * (chatId - 1);
      message__container.scrollTop = toScroll[0].offsetTop - 100;
    }
  });
};
