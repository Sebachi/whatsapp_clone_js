export const URL_API = "http://localhost:3000";

export const getusers = async () => {
    try {
      const { data } = await axios.get(`${URL_API}${'/users'}`);;
      console.log("funciona");
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


