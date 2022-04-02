import axios from "axios";

export const requestAuthLogin = async (username,password)=>{
    const payload = {
        username: username,
        password: password,
      };
    const data = await axios.post('http://localhost:1500/login',payload)
    .then((response)=>response)
    .catch(error=>{
        return {...error.response};
    })

    return data;
}
export default {
    requestAuthLogin
}