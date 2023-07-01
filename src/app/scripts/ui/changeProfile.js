const d = document
const user_icon = d.getElementById('user_icon')
const skip_changer = d.getElementById('skip_changer')
const chats__section = d.getElementById('chats__section')
const changer_profile = d.getElementById('changer_profile')

console.log('hola mundo');

export const changer_Listener = () => {
    user_icon.addEventListener("click", (e) => {
        e.preventDefault()
        changer_profile.classList.remove("hidden");
        chats__section.classList.add("hidden");
      });
      skip_changer.addEventListener("click", () => {
        chats__section.classList.remove("hidden");
        changer_profile.classList.add("hidden");
      });

}
