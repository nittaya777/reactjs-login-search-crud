import {ACCESS_TOKEN_NAME} from "../Constants"
import TokenService from "../utils/TokenService";

export default function authHeader() {
    const token = TokenService.getLocalAccessToken();
  
    if (token) {
      return { Authorization: 'Bearer ' + token};
    } else {
      return {};
    }
  }