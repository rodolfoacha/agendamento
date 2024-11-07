import axios from "axios";

const authorizationToken = process.env.REACT_APP_AUTHORIZATION_TOKEN;

if (!authorizationToken) {
  throw new Error("Authorization token is not defined in environment variables");
}

export const api = axios.create({
  baseURL: String(process.env.REACT_APP_API_URL),
  timeout: 5000,
  headers: { 'AUTHORIZATION': authorizationToken }
});