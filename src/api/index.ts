import axios from "axios";

const corsProxyUrl = "https://service.bnpb.go.id/api/proxy/";

const instance = axios.create({
  baseURL: corsProxyUrl + "https://newsapi.org/v2",
  params: {
    apiKey: "0293201a54894987a83bea0cb8abc9c2"
  }
});

export default instance;
