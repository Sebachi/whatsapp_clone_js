const d = document
const  log_out = d.getElementById('log_out')

const btnLog_out = () =>  {log_out.addEventListener('click', ()=> {
    const dropdownLog_out = log_out.querySelector('.dropdownLog_out');
    if (dropdownLog_out) {
      // El dropdown ya existe, ocultarlo o eliminarlo
      dropdownLog_out.remove();
    } else {
      const dropdownLog_out = document.createElement('ul');
      dropdownLog_out.classList.add('dropdownLog_out');
      // Crear los elementos del menú
      const menuItem1 = document.createElement('li');
      menuItem1.textContent = 'Cerrar sesion';
      menuItem1.classList.add('log_out_btn');
      // Agregar los elementos del menú al menú desplegable
      dropdownLog_out.appendChild(menuItem1);
      // Agregar el menú desplegable como hijo del elemento target
      log_out.appendChild(dropdownLog_out);
    }
  }
)}

export const fnLog_out = async () => {
  btnLog_out()
    // Eliminar el listener de eventos antes de agregarlo nuevamente
    log_out.addEventListener('click', (event) =>{
      const target = event.target.closest('.log_out_btn') || null
      if(target !== null){
        localStorage.removeItem("userPass")
        localStorage.removeItem("userId")
        location.reload()
      }
    });
  };


