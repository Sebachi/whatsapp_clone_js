const d = document
const bodySignUp2 = d.getElementById('bodySignUp2')
const sign_up_page = d.getElementById('sign_up_page')
const bodySignUp = d.getElementById('bodySignUp')
const return_login = d.getElementById('return_login')


export const printSign_up = () =>{ 
    sign_up_page.addEventListener('click', ()=>{
        bodySignUp2.classList.remove('hidden')
            bodySignUp.classList.add('hidden')
    })
    return_login.addEventListener('click', ()=>{
            bodySignUp.classList.remove('hidden')
            bodySignUp2.classList.add('hidden')
    })

}