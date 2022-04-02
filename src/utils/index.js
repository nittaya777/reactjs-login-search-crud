import jwt_decode from "jwt-decode";

const jwtDecode = (token)=>{
    if(!token){
        return {};
    }
    return jwt_decode(token);
}


export {
    jwtDecode
}
