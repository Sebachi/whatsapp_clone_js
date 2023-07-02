const d = document
import { deleteMessage } from "../services/request";
import { patchMessage } from "../services/request";
import { getMessageForEdition } from "../services/request";
import { printMessage, printUsers } from "./main";
const Swal = require("sweetalert2");



export const dropMenu = () => {
    const handleDropdown = (event) => {
      const target = event.target.closest('.down_arrow') || null;
      let dropdownMenu
      if (target !== null) {
        // Verificar si el dropdown ya existe
        dropdownMenu = target.querySelector('.dropdown-menu');
  
        if (dropdownMenu)  {
          // El dropdown ya existe, ocultarlo o eliminarlo
          dropdownMenu.remove(); // Eliminar el elemento del DOM
          // Opción alternativa: dropdownMenu.style.display = 'none'; // Ocultar el elemento
          target.classList.add('down_arrow_active');
        } else {
          const dropdownMenu = document.createElement('ul');
          dropdownMenu.classList.add('dropdown-menu');
          dropdownMenu.classList.add('async_menu');
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
          //Edit y delete
          dropdownMenu.addEventListener('click', (e)=>{
            const targetDelete = e.target.closest('.delete_btn') || null;
            if (targetDelete !== null) {
              const messageId = e.target.closest('.message').getAttribute("id")
              modalDelete(messageId)
          }
            const targetEdit = e.target.closest('.edit_btn') || null;
            if (targetEdit !== null) {
              const messageId = e.target.closest('.message').getAttribute("id")
              modalEdit(messageId)
          }
          })
        }
      }
    }
    ;
    // Eliminar el listener de eventos antes de agregarlo nuevamente
    message__container.removeEventListener('click', handleDropdown);
    message__container.addEventListener('click', handleDropdown);
  };


 const modalDelete =  (messageId) =>  {Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    background: "#3b4a54",
    color: "#d1d7db",
    showCancelButton: true,
    confirmButtonColor: "#63cb77",
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    allowOutsideClick: false,
    customClass: {
      confirmButton: "confirm_button",
      title: "title_alert",
      cancelButton: "cancel_button",
    },
  }).then(async (result) => {
    const sendId = localStorage.getItem('sendId')
    if (result.isConfirmed) {
      await deleteMessage(messageId)
      Swal.fire(
        'Deleted!',
        'Your message has been deleted.',
        'success',
        printMessage(sendId),
        printUsers(),
      )
    }
  })}

const modalEdit = async (messageId) => {
    const data = await getMessageForEdition(messageId)
    const textmessage = data.text
    const { value: text } = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Edit your message',
      confirmButtonText: 'Edit!',
      color: "#d1d7db",
      background: "#3b4a54",
      confirmButtonColor: "#63cb77",
      allowOutsideClick: false,
      inputValue: textmessage,

      customClass: {
        confirmButton: "confirm_button",
        inputLabel: "title_alert",
        cancelButton: "cancel_button",
      },
      inputAttributes: {
        'aria-label': 'Edit your message here'
      },
      showCancelButton: true
    })
    
    if (text) { 
      const sendId = localStorage.getItem('sendId')
      const newText = {
        text: text,
      }
    await patchMessage(messageId, newText)
     Swal.fire(
      'Done!',
      'Your message has been edited.',
      'success',
      printMessage(sendId),
      printUsers(),
    )
    }

  }