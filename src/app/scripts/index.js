
import sign_in from "./services/sign_in.js";
import printMain from "./ui/printMain.js";
import { printUsers } from "./ui/main.js";
import { readingChat } from "./ui/main.js";
import { returnLogin, sendMessage, quitMessage, searchMessage } from "./ui/main.js";
import "../styles/index.scss"
import { dropMenu } from "./ui/dropmenu.js";
import { printSign_up } from "./services/sign_up.js";
 import { fnLog_out } from "./services/log_out.js";
const d = document
// const input_message = d.getElementById("input_message")
// const sent_button = d.getElementById("sent_button")
// const message__container = d.getElementById("message__container")
const chats__container = d.getElementById("chats__container")
const backArrow = d.getElementById("backArrow");

d.addEventListener('DOMContentLoaded', async () => {
  printMain()
  printSign_up()
  await sign_in();
  await printUsers();
  readingChat()
  fnLog_out()
  sendMessage()
  dropMenu()
  quitMessage()
  searchMessage()
})

returnLogin()