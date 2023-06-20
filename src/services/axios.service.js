import axios, { AxiosInstance } from "axios";

const methods = "post" | "get" | "delete" | "put";

class AxiosService {
  constructor() {
    this.init();
  }

  init() {
    this.api = axios.create({
      baseURL: import.meta.env.API_ENDPOINT,
    });
  }
  sendRequest(url, method, body) {
    switch (method) {
      case "get":
        return this.api.get(url);

      case "post":
        return this.api.post(url, body);

      case "delete":
        return this.api.delete(url, body);

      case "put":
        return this.api.put(url, body);

      default:
        return null;
        break;
    }
  }
}
export default AxiosService;
