const d = document
const fullbody = d.getElementById('fullbody')

export const menuRemover = () =>  {fullbody.addEventListener('click', (e) => {
    const target = e.target
if (!target.closest('.async_menu') && !target.closest('.menuTrigger') && !target.closest('.menuTrigger2')){
    const down_arrow = d.querySelectorAll('.down_arrow')
    const async_menu = d.querySelector('.async_menu')
    if (async_menu){
        down_arrow.forEach((element) => {
            element.classList.add('down_arrow_active');
          });
    async_menu.remove()
}
}
})}