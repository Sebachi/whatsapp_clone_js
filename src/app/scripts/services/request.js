// export const URL_API = "https://backend-whatsappclone.onrender.com";
export const URL_API = "https://whatsapclone-backend-production.up.railway.app"
import axios from "axios";
export const getusers = async () => {
    try {
      const { data } = await axios.get(`${URL_API}${'/users'}`);;
      return data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

export  const getMessage = async () => {
    try {
      const { data } = await axios.get(`${URL_API}${'/messages'}`);
      return data;
    } catch (error) {
      console.log(error);
      return  error;
    }
  }

  export  const getMessageForEdition = async (messageID) => {
    try {
      const { data } = await axios.get(`${URL_API}${'/messages'}/${messageID}`);
      return data;
    } catch (error) {
      console.log(error);
      return  error;
    }
  }  

  export  const postMessage = async (message) => {
    try {
      await axios.post(`${URL_API}${'/messages'}`,
      message
      )
    } catch (error) {
      console.log(error);
      return  error;
    }
  }


  export  const postUser = async (user) => {
    try {
      await axios.post(`${URL_API}${'/users'}`,
      user
      )
    } catch (error) {
      console.log(error);
      return  error;
    }
  }

export const patchMessage = async (idMessage, messageEdited) => {
  try {
  
    await axios.patch(`${URL_API}/messages/${idMessage}`, messageEdited);
    
  } catch (error) {
    console.log(error);
    return  error;
  }
}


export const deleteMessage = async (messageId) => {
  try {
    await axios.delete(`${URL_API}${'/messages'}/${messageId}`)
  } catch (error) {
    console.log(error);
    return  error;
  }
}