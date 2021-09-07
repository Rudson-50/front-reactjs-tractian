import axios from "axios";

const URL_API = "https://my-json-server.typicode.com/tractian/fake-api"

const api = axios.create({
  baseURL: URL_API,
});





export default api;