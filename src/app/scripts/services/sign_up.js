
import { getusers } from "./request";
const formContainer = document.getElementById("signUp");
const userInput = document.getElementById("user");
const passwordInput = document.getElementById("password");





const sign_up =  async () => {
  let validUser = false, validPassword = false, userId, userPass = false;

  const users = await getusers();
  console.log(users);
  formContainer.addEventListener("submit", (event) => {
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
      console.log("usuario incorrecto");
    } else if (validUser && validPassword) {
      console.log("Ingresando ...");
      userPass = true
      localStorage.setItem('userPass', JSON.stringify(validUser));
      localStorage.setItem('userId', JSON.stringify(userId));
    }
    if (!validPassword) {
      console.log("contraseña incorrecta");
    } else if (validPassword) {
      console.log("contraseña correcta");
    }

   location.reload()
  });

};

export default sign_up
