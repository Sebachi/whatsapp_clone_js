export const URL_API = "http://localhost:3000";
const axios = require('axios').default;

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

export const deleteMessage = async (messageId) => {
  try {
    await axios.delete(`${URL_API}${'/messages'}`,
    messageId
    )
  } catch (error) {
    console.log(error);
    return  error;
  }
}