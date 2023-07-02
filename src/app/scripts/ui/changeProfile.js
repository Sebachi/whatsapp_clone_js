import { getuser, patchUser } from "../services/request";
import { profileChanger } from "../services/sign_up";
import Swal from "sweetalert2";
const d = document;
const user_icon = d.getElementById("user_icon");
const skip_changer = d.getElementById("skip_changer");
const chats__section = d.getElementById("chats__section");
const changer_profile = d.getElementById("changer_profile");
const image_changer = d.querySelector(".image_container_changer");
const edit_name = d.getElementById("edit_name");
const edit_phrase = d.getElementById("edit_phrase");
const user_image_changer = d.getElementById("user_image_changer");
const name_changer = d.getElementById("name_changer");
const phrase_changer = d.getElementById("phrase_changer");

const userPass = localStorage.getItem("userPass") || null;


const setInfChanger = async ()=> {
  const userId = localStorage.getItem("userId");
  const userInf = await getuser(userId);
  let phraseUser
  if(userInf.phrase){
    phraseUser =  userInf.phrase
 } else {
    phraseUser =   "Hey there! I am using Whatsapp clone."
 }
 let imgUser = userInf.userImage;

 let nameUser = userInf.name;
  user_image_changer.src = imgUser;
  name_changer.innerText = nameUser;
  userInf.phrase || null;
    phrase_changer.innerText = phraseUser;
  }

export const changer_Listener = async () => {
  if (userPass !== null) {
    const userId = localStorage.getItem("userId");
    const userInf = await getuser(userId);
    user_icon.addEventListener("click", (e) => {
      //Acces change section
      e.preventDefault();
      changer_profile.classList.remove("hidden");
      chats__section.classList.add("hidden");
    });
   
    skip_changer.addEventListener("click", () => {
      chats__section.classList.remove("hidden");
      changer_profile.classList.add("hidden");
    });
    // set up user inf

    
    let phraseUser
    if(userInf.phrase){
      phraseUser =  userInf.phrase
   } else {
      phraseUser =   "Hey there! I am using Whatsapp clone."
   }
   let imgUser = userInf.userImage;
 
   let nameUser = userInf.name;
  
    setInfChanger()
    // Image change
    image_changer.addEventListener("click", async () => {
      const imgPromise = await profileChanger();

      const object = {
        userImage: imgPromise,
      };
      try {
       await patchUser(userId, object);
      } catch (error) {
        console.log(error);
        return error;
      }

      await setInfChanger()
    });
  
    // Name changer
    edit_name.addEventListener ('click', async ()=> {
    name_chagerAlert(nameUser, userId)
   
  }
  )
    edit_phrase.addEventListener('click', async ()=> {
    phrase_chagerAlert(phraseUser, userId)
  
    }
    )

  }
};

// Name and edit swal

const name_chagerAlert =  (nameUser, userId )=>{
const inputValue = nameUser

   Swal.fire({
  title: 'Edit your name',
  input: 'text',
  inputLabel: 'This name is not your username or a PIN.',
  inputValue: inputValue,
  background: "#3b4a54",
    color: "#d1d7db",
  showCancelButton: true,
  customClass: {
    confirmButton: "confirm_button",
    title: "title_alert",
    cancelButton: "cancel_button",
  },
  inputValidator: async (value) => {
    if (!value) {
      return 'You need to write a name!'
    }
    else {
      const object = {
        name: value,
      }
      await patchUser(userId, object);
      await  setInfChanger()
    }
  }
})
}

// Phrase swal
const phrase_chagerAlert =  (phraseUser, userId )=>{
  const inputValue = phraseUser
  
    Swal.fire({
    title: 'Edit your iconic Phrase',
    input: 'text',
    inputLabel: 'Here is your presentation letter',
    inputValue: inputValue,
    background: "#3b4a54",
      color: "#d1d7db",
    showCancelButton: true,
    customClass: {
      confirmButton: "confirm_button",
      title: "title_alert",
      cancelButton: "cancel_button",
    },
    inputValidator: async (value) => {
      if (!value) {
        return 'You need to write a phrase!'
      }
      else {
        const object = {
          phrase: value,
        }
      await  patchUser(userId, object);
      await  setInfChanger()
      }
    }
  })
  }
  
