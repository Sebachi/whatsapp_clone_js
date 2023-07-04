import { getuser } from "../services/request";
import { setInfChanger } from "./changeProfile";

const d = document;
const chats__container = d.getElementById("chats__container");
const edit_name = d.getElementById("edit_name");
const edit_phrase = d.getElementById("edit_phrase");
const skip_changer = d.getElementById("skip_changer");
const chats__section = d.getElementById("chats__section");
const changer_profile = d.getElementById("changer_profile");
const your_image_figure_hover = d.querySelector(".your_image_figure_hover");
const image_container_changer = d.querySelector(".image_container_changer");
const user_image_changer = d.getElementById("user_image_changer");
const camera = "../../assets/camera.svg";
const textProfile = d.getElementById("textProfile");

export const viewContact = () => {
  chats__container.addEventListener("click", async (e) => {
    const profile = e.target.closest(".contact-icon");

    if (profile) {
      const contact = profile.getAttribute("name");
      await setInfChanger(contact);
      changer_profile.classList.remove("hidden");
      chats__section.classList.add("hidden");
      edit_name.classList.add("hidden");
      edit_phrase.classList.add("hidden");
      your_image_figure_hover.innerHTML = ``;

      const userInf = await getuser(contact);
      textProfile.innerText = `Perfil del contacto ${userInf.user_name}`;
      let imgUser = userInf.userImage;
      user_image_changer.src = imgUser;

      skip_changer.addEventListener("click", () => {
        changer_profile.classList.add("hidden");
        chats__section.classList.remove("hidden");
        edit_name.classList.remove("hidden");
        edit_phrase.classList.remove("hidden");
        textProfile.innerText = `Perfil`;
        your_image_figure_hover.innerHTML = `<figure class="your_image_figure_hover"><img class="user_image_changer" src=${camera} alt="camera">CAMBIAR FOTO <br> DEL PERFIL</figure>
        `;
      });
    }
  });
};
