// src/utils/auth.js
import { jwtDecode } from 'jwt-decode';


export const isTokenExpired = (token) => {
  if (!token) return true;
  const { exp } = jwtDecode(token);
  if (Date.now() >= exp * 1000) {
    return true; // Token-ul a expirat
  }
  return false; // Token-ul este încă valid
};
