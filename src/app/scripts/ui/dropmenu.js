const d = document

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
        }
      }
    }
    ;
    // Eliminar el listener de eventos antes de agregarlo nuevamente
    message__container.removeEventListener('click', handleDropdown);
    message__container.addEventListener('click', handleDropdown);
  };