const d = document;
const Swal = require("sweetalert2");
import { getusers } from "./request";
import { postUser } from "./request";
//Print variables
const bodySignUp2 = d.getElementById("bodySignUp2");
const sign_up_page = d.getElementById("sign_up_page");
const bodySignUp = d.getElementById("bodySignUp");
const return_login = d.getElementById("return_login");
//Form variables
const register = d.getElementById("register");
const newImage = d.getElementById("newImage");
const signUpRealForm = d.getElementById("signUpRealForm");
const newNumber = d.getElementById("newNumber");
const newName = d.getElementById("newName");
const newPassword = d.getElementById("newPassword");
const newPhrase = d.getElementById("newPhrase");

// Print sign_up function
export const printSign_up = () => {
  sign_up_page.addEventListener("click", () => {
    bodySignUp2.classList.remove("hidden");
    bodySignUp.classList.add("hidden");
  });
  return_login.addEventListener("click", () => {
    bodySignUp.classList.remove("hidden");
    bodySignUp2.classList.add("hidden");
  });
};

// Image profile listener
let img_url;
const profileChanger = async () => {
  const { value: file } = await Swal.fire({
    title: "Select image profile",
    input: "file",
    background: "#3b4a54",
    color: "#d1d7db",
    confirmButtonText: 'Upload',
    customClass: {
      confirmButton: "confirm_button",
    },
    inputAttributes: {
      accept: "image/*",
      "aria-label": "Upload your profile picture",
    },
  });
  if (file) {
    const reader = new FileReader();
    const imgPromise = new Promise((resolve, reject) => {
      reader.onload = (e) => {
        Swal.fire({
          background: "#3b4a54",
          color: "#d1d7db",
          title: "Your uploaded picture",
          imageUrl: e.target.result,
          imageAlt: "The uploaded picture",
        });
        img_url = e.target.result;
        resolve(img_url);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
    reader.readAsDataURL(file);
    return imgPromise;
  }
};

const new_user_image = new Promise((resolve, reject) => {
  const handleClick = async () => {
    try {
      const imgPromise = await profileChanger();
      resolve(imgPromise);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  newImage.addEventListener("click", handleClick);
});
// new User function
const creatorUser = async () => {
  if (
    newName.value === "" ||
    newName.value === null ||
    newName.value === undefined ||
    newNumber.value === "" ||
    newNumber.value === null ||
    newNumber.value === undefined ||
    newPassword.value === "" ||
    newPassword.value === null ||
    newPassword.value === undefined ||
    newPhrase.value === "" ||
    newPhrase.value === null ||
    newPhrase.value === undefined
  ) {
    notValues();
  } else {
    try {
    const users = await getusers();
      for (let i = 0; i < users.length; i++) {
        if (Number(users[i].user_name) == newNumber.value) {
          console.log(users[i].user_name);
       await wrongNumber();
        }
      }
      const userImgPromise = await new_user_image;
      const userImg = await userImgPromise;
      const newUser = {
        name: newName.value,
        userImage: userImg,
        user_name: newNumber.value.toString(),
        password: newPassword.value,
        flag: false,
        phrase: newPhrase.value,
      };
      await postUser(newUser);
      confirm_Sign_up();
    } catch (error) {
      console.log(error);
    }
  }
};

// register button
register.addEventListener('click', async(event) => {
    event.preventDefault();
    await creatorUser();
  })


// alerts
const confirm_Sign_up = () => {
  Swal.fire({
    title: "You are register in Whatsapp clone!",
    color: "#d1d7db",
    confirmButtonText: "Yeah",
    confirmButtonColor: "#63cb77",
    iconHtml:
      '<img src="../../../assets/whatsapp-logo-black-com.svg" alt="whatsapp-logo-black-com.svg">',
    background: "#3b4a54",
    allowOutsideClick: false,
    customClass: {
      icon: "icon_animated",
      background: "alerts_container",
      confirmButton: "confirm_button",
      title: "title_alert",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      location.reload();
    }
  });
};

const wrongNumber = async () => {
  await Swal.fire({
    title:
      "Sorry, your phone number is already in our base, try with another number.",
    color: "#d1d7db",
    confirmButtonText: "Ok 🥲",
    confirmButtonColor: "#63cb77",
    icon: "error",
    background: "#3b4a54",
    customClass: {
      background: "alerts_container",
      confirmButton: "confirm_button",
      title: "title_alert",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      location.reload();
    }
  });
};

const notImage = () => {
  Swal.fire({
    title: "Please upload an image",
    color: "#d1d7db",
    confirmButtonText: "Ok 🥲",
    confirmButtonColor: "#63cb77",
    icon: "error",
    background: "#3b4a54",
    customClass: {
      background: "alerts_container",
      confirmButton: "confirm_button",
      title: "title_alert",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      location.reload();
    }
  });
  ;
};
const notValues = () => {
  Swal.fire({
    title: "Please complete the folder",
    color: "#d1d7db",
    confirmButtonText: "Ok 🥲",
    confirmButtonColor: "#63cb77",
    icon: "error",
    background: "#3b4a54",
    customClass: {
      background: "alerts_container",
      confirmButton: "confirm_button",
      title: "title_alert",
    },
  });
};
