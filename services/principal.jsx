import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import qs from "qs";

export const Production = false;

const credentialsDev = {
  api: "http://52.54.227.142/",
  authorization: "Basic YXBwOjhWYkk0ekVPNDg2",
};
const credentialsProd = {
  api: "https://api.aqku.pe/api/v1/",
  authorization: "Basic YXBwX3dhbGxldDppNFF5aWtsNm1pZU5WVFM",
};

const { api, authorization } = credentialsDev;

export const mainApi = async (data, endpoint, type) => {
  let requestOptions = {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  };
  console.log("llegue main");
  let petition;
  switch (type) {
    case "POST":
      petition = axios.post(
        credentialsDev.api + endpoint,
        qs.stringify(data),
        requestOptions
      );
      break;
    case "GET":
      petition = axios.get(
        credentialsDev.api + endpoint,
        qs.stringify(data),
        requestOptions
      );
      break;
    default:
      petition = axios.post(
        credentialsDev.api + endpoint,
        qs.stringify(data),
        requestOptions
      );
      break;
  }

  let responseApi = await petition;
  return responseApi;
};

export const webApi = async (endpoint) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  let responseApi = await fetch(
    "https://aqku.pe/wp-json/wp/v2/pages" + endpoint,
    {
      method: "GET",
      headers: myHeaders,
    }
  ).then((response) => response.json());
  return responseApi;
};

export const generalApi = async (endpoint, method) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Version", version);
  let responseApi = await fetch(endpoint, {
    method: method,
    headers: myHeaders,
  }).then((response) => response.json());
  return responseApi;
};

export const processResponse = async (response) => {
  const statusCode = response.status;
  const data = await response.json();
  return Promise.all([statusCode, data]).then((res) => ({
    statusCode: res[0],
    data: res[1],
  }));
};

export const getPaymentMethods = async () => {
  try {
    return await mainApi(null, "/payment", "GET").then((res) => {
      console.log({ resGetPaymentMethods: res.data.methods });
      return res.data;
    });
  } catch (error) {
    console.log({ getPaymentMethods: error });
  }
};
