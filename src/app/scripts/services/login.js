
import { getusers, patchFlagUser } from "./request";
const formContainer = document.getElementById("signUp");
const userInput = document.getElementById("user");
const passwordInput = document.getElementById("password");
const Swal = require("sweetalert2");




const sign_in =  async () => {
  let validUser = false, validPassword = false, userId, userPass = false;
  const users = await getusers();
  formContainer.addEventListener("submit", async (event) => {
    event.preventDefault();

    for(let i = 0; i < users.length; i++) {
      if (users[i].user_name == userInput.value) {
        validUser = true;
        userId = users[i].id;
      }
      if (users[i].password == passwordInput.value) {
        validPassword = true;
      }
    }
    if (!validUser) {
      wrongnumber()
    } else if (validUser && validPassword) {
      // console.log("Ingresando ...");
      ingresando()
      userPass = true
      localStorage.setItem('userPass', JSON.stringify(validUser));
      localStorage.setItem('userId', JSON.stringify(userId));
    }
    if (!validPassword) {
      wrongpassword();
    } else  {
      let userId = localStorage.getItem('userId')
      const newFlag = {
        flag: true
      }
     await patchFlagUser(userId, newFlag)
      location.reload()
    }

  
  });

};

export default sign_in

// alerts:
const ingresando = async () => {
let timerInterval
Swal.fire({
  title: 'Joining ...',
  timer: 1000,
  timerProgressBar: true,
  didOpen:  () => {
    Swal.showLoading()
    const b = Swal.getHtmlContainer().querySelector('b')
    timerInterval = setInterval(() => {
      b.textContent = Swal.getTimerLeft()
    }, 100)
  },
  willClose: () => {
    clearInterval(timerInterval)
  }
}).then((result) => {
  if (result.dismiss === Swal.DismissReason.timer) {
    console.log('I was closed by the timer')
  }
})}

//wrong password
const wrongpassword = () => {
Swal.fire({
  icon: 'error',
  title: 'Wrong user or password',
  text: 'Try again or register now!',
  background: "#3b4a54",
  color: "#d1d7db",
  confirmButtonText: 'Oopsi..',
  customClass: {
    title: "title_alert",
    confirmButton: "confirm_button",
  },
})}

const wrongnumber = () => {
  Swal.fire({
    icon: 'error',
    title: 'Wrong number',
    text: 'Sorry, the number that you try to use isn`t in our base',
    background: "#3b4a54",
    color: "#d1d7db",
    confirmButtonText: 'Oopsi..',
    customClass: {
      confirmButton: "confirm_button",
    },
  })}