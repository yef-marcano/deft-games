//import { getUsuario, saveUsuario } from "../storage/UsuarioAsyncStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import { version } from '../../package.json';
import axios from "axios";
import qs from "qs";

export const Production = false

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
  let requestOptions = { headers: { "Content-Type": "application/x-www-form-urlencoded" } };
  console.log("llegue main");
  let petition 
  switch (type) {
    case 'POST':
      petition = axios.post(credentialsDev.api + endpoint, qs.stringify(data), requestOptions)
      break;
    case 'GET':
      petition = axios.get(credentialsDev.api + endpoint, qs.stringify(data), requestOptions)
      break;
    default:
      petition = axios.post(credentialsDev.api + endpoint, qs.stringify(data), requestOptions)
      break;
  }

  let responseApi = await petition
  //const { api, authorization } = credentialsDev;
  /*var userLogger = await getUsuario();

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  userLogger == null
    ? myHeaders.append("Authorization", authorization)
    : myHeaders.append("Authorization", "Bearer " + userLogger.token);

  myHeaders.append("Version", version)

  const Body = type == "GET" ? "" : JSON.stringify(data);
  let responseApi = await fetch(api + endpoint, {
    method: type,
    headers: myHeaders,
    body: Body,
  }).then(processResponse);

  responseApi.statusCode !== 200 && console.log(responseApi)

  if (responseApi.statusCode == 401 && userLogger !== null) {
    let refreshTokenOld = userLogger.refreshToken;
    let myHeadersRefreshToken = new Headers();
    myHeadersRefreshToken.append("Content-Type", "application/json");
    myHeadersRefreshToken.append("Authorization", "Bearer " + refreshTokenOld);
    myHeadersRefreshToken.append("Version", version)
    let responseApiRefresh = await fetch(api + "refresh", {
      method: "GET",
      headers: myHeadersRefreshToken,
    }).then(processResponse);
    console.log("refresh response");
    console.log(responseApiRefresh);
    let token = responseApiRefresh.data.token;
    let tokenNuevo = responseApiRefresh.data.token;
    let refreshToken = responseApiRefresh.data.refreshToken;

    const USUARIO_KEY = "@usuario:key";

    await AsyncStorage.setItem(
      USUARIO_KEY,
      JSON.stringify({ token, refreshToken })
    );

    const item = await AsyncStorage.getItem(USUARIO_KEY);

    console.log(item);
    console.log("nuevo usuario en local storage");
    console.log("guardado");
    console.log("peticion con el token refrescado");
    let myHeadersSpecial = new Headers();
    myHeadersSpecial.append("Content-Type", "application/json");
    myHeadersSpecial.append("Authorization", "Bearer " + tokenNuevo);
    responseApi = await fetch(api + endpoint, {
      method: type,
      headers: myHeadersSpecial,
      body: Body,
    }).then(processResponse);

    console.log(responseApi);

    responseApi.statusCode == 401 && AsyncStorage.removeItem(USUARIO_KEY)

  }*/

  return responseApi;
};




export const mainApiImage = async (data, endpoint, type) => {

  //const { api, authorization } = credentialsDev;
  //const { api, authorization } = credentialsDev;
  var userLogger = await getUsuario();

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "multipart/form-data");
  userLogger == null
    ? myHeaders.append("Authorization", authorization)
    : myHeaders.append("Authorization", "Bearer " + userLogger.token);

  myHeaders.append("Version", version)

  const Body = type == "GET" ? "" : JSON.stringify(data);

  //console.log(data.document)
  //console.log(data.document2)
  let un = data.document
  const unimg = un.split("/");
  let namedoc1 = unimg.slice(-1)[0]

  let dois = data.document2
  const dosimg = dois.split("/");
  let namedoc2 = dosimg.slice(-1)[0]

  var formdata = new FormData();
  formdata.append("document", {
    uri: un,
    type: "image/jpg",
    name: namedoc1,
  });
  formdata.append("document2", {
    uri: dois,
    type: "image/jpg",
    name: namedoc2,
  });


  let responseApi = await fetch(api + endpoint, {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
  }).then(processResponse);

  responseApi.statusCode !== 200 && console.log(responseApi)

  if (responseApi.statusCode == 401 && userLogger !== null) {
    /***** Convertir esto en funcion ****/

    //console.log("401");
    let refreshTokenOld = userLogger.refreshToken;
    let myHeadersRefreshToken = new Headers();
    myHeadersRefreshToken.append("Content-Type", "application/json");
    myHeadersRefreshToken.append("Authorization", "Bearer " + refreshTokenOld);
    myHeadersRefreshToken.append("Version", version)
    let responseApiRefresh = await fetch(api + "refresh", {
      method: "GET",
      headers: myHeadersRefreshToken,
    }).then(processResponse);
    console.log("refresh response");
    console.log(responseApiRefresh);
    let token = responseApiRefresh.data.token;
    let tokenNuevo = responseApiRefresh.data.token;
    let refreshToken = responseApiRefresh.data.refreshToken;

    const USUARIO_KEY = "@usuario:key";

    await AsyncStorage.setItem(
      USUARIO_KEY,
      JSON.stringify({ token, refreshToken })
    );

    const item = await AsyncStorage.getItem(USUARIO_KEY);

    console.log(item);
    console.log("nuevo usuario en local storage");
    console.log("guardado");
    console.log("peticion con el token refrescado");
    let myHeadersSpecial = new Headers();
    myHeadersSpecial.append("Content-Type", "multipart/form-data");
    myHeadersSpecial.append("Authorization", "Bearer " + tokenNuevo);
    responseApi = await fetch(api + endpoint, {
      method: 'POST',
      headers: myHeadersSpecial,
      body: formdata,
    }).then(processResponse);

    console.log(responseApi);

    responseApi.statusCode == 401 && AsyncStorage.removeItem(USUARIO_KEY)

  }

  return responseApi;
};




const refreshToken = async () => {
  let refreshTokenOld = userLogger.refreshToken;
  let myHeadersRefreshToken = new Headers();
  myHeadersRefreshToken.append("Content-Type", "application/json");
  myHeadersRefreshToken.append("Authorization", "Bearer " + refreshTokenOld);
  let responseApiRefresh = await fetch(api + "refresh", {
    method: "GET",
    headers: myHeadersRefreshToken,
  }).then(processResponse);
  console.log("refresh response");
  console.log(responseApiRefresh);
  let token = responseApiRefresh.data.token;
  let tokenNuevo = responseApiRefresh.data.token;
  let refreshToken = responseApiRefresh.data.refreshToken;

  const USUARIO_KEY = "@usuario:key";

  await AsyncStorage.setItem(
    USUARIO_KEY,
    JSON.stringify({ token, refreshToken })
  );

  const item = await AsyncStorage.getItem(USUARIO_KEY);

  console.log(item);
  console.log("nuevo usuario en local storage");
  console.log("guardado");
  console.log("peticion con el token refrescado");
  let myHeadersSpecial = new Headers();
  myHeadersSpecial.append("Content-Type", "application/json");
  myHeadersSpecial.append("Authorization", "Bearer " + tokenNuevo);
  responseApi = await fetch(api + endpoint, {
    method: type,
    headers: myHeadersSpecial,
    body: Body,
  }).then(processResponse);

  console.log(responseApi);
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
  myHeaders.append("Version", version)
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
