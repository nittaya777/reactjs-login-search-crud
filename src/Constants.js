export const API_BASE_URL = "http://localhost:1500";
export const ACCESS_TOKEN_NAME = 'login_access_token';

export const SECRET_KEY = "VGh1IERlYyAxNyAyMDIwIDEyOjQ3OjQ5IEdNVCswNzAwIChJbmRvY2hpbmEgVGltZSk=";

//
export const HTTP_LOGIN_FETCHING = "LOGIN_FETCHING";
export const HTTP_LOGIN_FAILED = "LOGIN_FAILED";
export const HTTP_LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const HTTP_LOGOUT = "LOGOUT";

export const HTTP_REGISTER_FETCHING = 'HTTP_REGISTER_FETCHING';
export const HTTP_REGISTER_SUCCESS = 'HTTP_REGISTER_SUCCESS';
export const HTTP_REGISTER_FAILED = 'HTTP_REGISTER_FAILED';

export const APP_INIT = 'APP_INIT';

// User Page
export const HTTP_USER_FETCHING = "USER_FETCHING";
export const HTTP_USER_FETCHED = "USER_FETCHED";
export const HTTP_USER_FAILED = "USER_FAILED";
// Profile Page
export const HTTP_PROFILE_FETCHING = "PROFILE_FETCHING";
export const HTTP_PROFILE_FETCHED = "PROFILE_FETCHED";
export const HTTP_PROFILE_FAILED = "PROFILE_FAILED";
//Sale
export const HTTP_ORDER_FETCHING = "ORDER_FETCHING";
export const HTTP_ORDER_FETCHED = "ORDER_FETCHED";
export const HTTP_ORDER_FAILED = "ORDER_FAILED";


export const imageUrl = "http://localhost:8085/";

export const YES = "YES";
export const NO = "NO";
export const OK = "ok";
export const NOK = "nok";

export const LOGIN_STATUS = "LOGIN_STATUS";

export const server = {
  LOGIN_URL: "auth/login",
  LOGOUT_URL: "auth/logout",
  REFRESH_TOKEN_URL: "auth/refreshtoken",
  REGISTER_URL: "register",
  USER_URL: "user",
  USER_UPDATE_AVATAR_URL: "user/update-avatar",
  USER_CHANGE_PASSWORD_URL: "user/change-password",
  USER_SEARCH_URL: "users",
  ORDER_URL: "sale/info",
  ORDER_SEARCH_URL: "sale/search",
  LOGIN_PASSED: "yes",
};

// Error Code
export const E_PICKER_CANCELLED = "E_PICKER_CANCELLED";
export const E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR =
  "E_PICKER_CANNOT_RUN_CAMERA_ON_SIMULATOR";
export const E_PERMISSION_MISSING = "E_PERMISSION_MISSING";
export const E_PICKER_NO_CAMERA_PERMISSION = "E_PICKER_NO_CAMERA_PERMISSION";
export const E_USER_CANCELLED = "E_USER_CANCELLED";
export const E_UNKNOWN = "E_UNKNOWN";
export const E_DEVELOPER_ERROR = "E_DEVELOPER_ERROR";
export const TIMEOUT_NETWORK = "ECONNABORTED"; // request service timeout
export const NOT_CONNECT_NETWORK = "NOT_CONNECT_NETWORK";

//////////////// Localization Begin ////////////////
export const NETWORK_CONNECTION_MESSAGE =
  "Cannot connect to server, Please try again.";
export const NETWORK_TIMEOUT_MESSAGE =
  "A network timeout has occurred, Please try again.";
export const UPLOAD_PHOTO_FAIL_MESSAGE =
  "An error has occurred. The photo was unable to upload.";
