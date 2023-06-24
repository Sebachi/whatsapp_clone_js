export const URL_API = "http://localhost:3000";

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
      const { data } = await axios.post(`${URL_API}${'/messages'}`,
      {
        message
      }
      )
      console.log(message);
    } catch (error) {
      console.log(error);
      return  error;
    }
  }



