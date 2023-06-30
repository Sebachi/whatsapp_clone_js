import { getMessage, patchStatusMessage } from "./request";

const d = document
const userId = localStorage.getItem('userId') || null

const  userPass = localStorage.getItem('userPass')
const message__container = d.getElementById('message__container')

const users = await getMessage()

export const flagMessage = async () => {
   let sendId = localStorage.getItem('sendId')|| null
let currentSendId = message__container.getAttribute('data-id')
if (currentSendId == sendId){
   await patchStatusMessage(userId, sendId)
}
}


