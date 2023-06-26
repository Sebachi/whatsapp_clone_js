const d = document
const actualPass = JSON.parse(localStorage.getItem('userPass'))

const bodyMain = d.getElementById('bodyMain')
const bodySignUp = d.getElementById('bodySignUp')

const printMain = () => {
  if (actualPass == true) {
    console.log('pasando pagina');
    bodyMain.classList.remove('hidden')
    bodySignUp.classList.add('hidden')
  }
}

export default printMain