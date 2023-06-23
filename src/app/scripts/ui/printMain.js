const d = document
const actualPass = JSON.parse(localStorage.getItem('userPass'))

const fullbody = d.getElementById('fullbody')

const printMain = () =>{ if(actualPass == true){
  console.log('pasando pagina');
  fullbody.innerHTML =  `<div class="mainBox bodyMain style-4">

    <section class="chats__section">
      <header class="chats__header " >
        <article class="header__icons fixed_header header">
          <a href="" class="user-icon"
            ><img src="../assets/user-com.svg" alt=""
          /></a>
          <div id="icons-chat">
            <button><img src="/src/assets/users-more-com.svg" alt="" /></button>
            <button><img src="/src/assets/status-com.svg" alt="" /></button>
            <button><img src="/src/assets/chat-com.svg" alt="" /></button>
            <button><img src="/src/assets/3dots-com.svg" alt="" /></button>
          </div>
        </article>
        <div class="searchbar__container">
          <button>
            <img
              src="/src/assets/magnifying-glass-svgrepo-com.svg"
              alt="magnifying-glass"
            />
          </button>
          <input type="text" placeholder="Busca un chat o inicia uno nuevo" />
        </div>
      </header>
      <main>

        <article class="chats__container style-4" id="chats__container">

        </article>
        <footer class="footer_chats">
          <p><img src="/src/assets/lock.svg" alt="lock"> Tus mensaje personales estan <span>cifrados de extremo a extremo</span>.</p>
      </footer>
      </main>

    </section>
    <div class="divider"></div>

    <section class="message__section">
      <header class="message__header header">
        <button class="profile_name">
          <div class="user-icon"
            ><img src="/src/assets/user-com.svg" alt=""
          /></div>
          <span>Jose</span>
        </button>
        <div class="icons-message">
          <button
            ><img src="/src/assets/magnifying-glass-svgrepo-com.svg" alt=""
          /></button>
          <button><img src="/src/assets/3dots-com.svg" alt="" /></button>
        </div>
      </header>
      <main class="message_view " id="message_view">
        <article class="message__container style-4" id="message__container">

      </article>

      </main>
      <footer class="message__input">
          <button><img src="/src/assets/emoji-com.svg" alt="happy-face"></button>
          <button><img src="/src/assets/attach-com.svg" alt=""></button>
          <input type="text" id="input_message" placeholder="Escribe un mensaje aqui">
          <button id="sent_button"><img src="/src/assets/sent.svg" alt=""></button>
      </footer>
    </section>

  </div>`
}}

export default printMain