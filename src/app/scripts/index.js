
import sign_up from "./services/sign_up.js";
import printMain from "./ui/printMain.js";
import { printUsers } from "./ui/main.js";
import { readingChat } from "./ui/main.js";
import { returnLogin } from "./ui/main.js";
import "../styles/index.scss"

console.log('holawwwwww');
d.addEventListener('DOMContentLoaded', async ()=> {
  printMain()
  await sign_up()
  printUsers()
  readingChat()

})

returnLogin()