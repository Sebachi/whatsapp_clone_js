// export const URL_API = "https://backend-whatsappclone.onrender.com";

export const URL_API = "http://localhost:3000";
// export const URL_API = "https://whatsapclone-backend-production.up.railway.app"
import axios from "axios";
export const getusers = async () => {
  try {
    const { data } = await axios.get(`${URL_API}${"/users"}`);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const getuser = async (callback) => {
  try {
    const { data } = await axios.get(`${URL_API}${"/users"}/${callback}`);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getMessage = async () => {
  try {
    const { data } = await axios.get(`${URL_API}${"/messages"}`);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getMessageForEdition = async (messageID) => {
  try {
    const { data } = await axios.get(`${URL_API}${"/messages"}/${messageID}`);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postMessage = async (message) => {
  try {
    await axios.post(`${URL_API}${"/messages"}`, message);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postUser = async (user) => {
  try {
    await axios.post(`${URL_API}${"/users"}`, user);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const patchMessage = async (idMessage, messageEdited) => {
  try {
    await axios.patch(`${URL_API}/messages/${idMessage}`, messageEdited);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const deleteMessage = async (messageId) => {
  try {
    await axios.delete(`${URL_API}${"/messages"}/${messageId}`);
  } catch (error) {
    console.log(error);
    return error;
  }
};

// const getMessageStatus = async (idUser, idOtherUser) => {
//   try{const data = await axios.get(`${URL_API}/messages?emisor=${idOtherUser}&receptor=${idUser}}`)
//   return data}
//   catch(error) {
//       console.log(error);
//       return  error;
//   }
// }

export const patchStatusMessage = async (idUser, idOtherUser) => {
  try {
    const data = await getMessage();
    for (let i = 0; i < data.length; i++) {
      if (data[i].emisor == idOtherUser && data[i].receptor == idUser) {
          const idMessage = data[i].id
          const newStatus = {
            status: "active"
          }
           await patchMessage(idMessage, newStatus)
      }
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const patchFlagUser = async (idUser, newFlag) => {
  try {
    await axios.patch(`${URL_API}/users/${idUser}`, newFlag);
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const patchUser = async (idUser, patchfile) => {
  try {
    await axios.patch(`${URL_API}/users/${idUser}`, patchfile);
  } catch (error) {
    console.log(error);
    return error;
  }
};