import { jwtDecode } from "jwt-decode";
// check if tokenExpire
export  const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // current time in seconds
    return decoded.exp < currentTime; // if token is expired
  } catch (error) {
    return true; // if decoding fails, treat it as expired
  }
};