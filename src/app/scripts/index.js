
import sign_in from "./services/login.js";
import printMain from "./ui/printMain.js";
import { printUsers } from "./ui/main.js";
import { readingChat, readingFilter } from "./ui/main.js";
import { returnLogin, sendMessage, searchMessage } from "./ui/main.js";
import { quitMessage } from "./ui/main.js";
import "../styles/index.scss"
import { dropMenu } from "./ui/dropmenu.js";
import { printSign_up } from "./services/sign_up.js";
import { fnLog_out } from "./services/log_out.js";
import { delete_edit } from "./services/delete_edit.js";
import { menuRemover } from "./services/menuRemover.js";
import { getNewMessage } from "./services/constantmessage.js";
import { flagMessage } from "./services/flags.js";
import { changer_Listener } from "./ui/changeProfile.js";

const d = document
// const input_message = d.getElementById("input_message")
// const sent_button = d.getElementById("sent_button")
// const message__container = d.getElementById("message__container")

d.addEventListener('DOMContentLoaded', async () => {
  printMain()
  printSign_up()
  
  await sign_in();
  await printUsers();
  
  setInterval(getNewMessage, 1000);
  // flagMessage()
  readingChat()
  readingFilter()
  fnLog_out()
  changer_Listener()
  sendMessage()
  dropMenu()
  searchMessage()
  quitMessage()

})
menuRemover()
returnLogin()


