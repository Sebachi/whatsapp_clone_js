import { deleteMessage } from "./request";
import { patchMessage } from "./request";
import { dropMenu } from "../ui/dropmenu";
const d = document

const message__container = d.getElementById("message__container")

export const delete_edit = async (e) => {
    
   




    message__container.removeEventListener('click', handleDelete_edit);
    message__container.addEventListener('click', handleDelete_edit);

}

