import axios from "axios";
const url = "users/";

export async function createUserWithEmailAndPassword(userData) {
  const response = await axios({
    method: "post",
    url: `${url}`,
    data: userData,
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
  return response;
}

export async function resetSecVerify(userData) {
  const response = await axios({
    method: "post",
    url: `${url}secVerify`,
    data: userData,
  })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
  return response;
}

export async function signInWithEmailAndPassword(userData) {
  const data = await axios({
    method: "post",
    url: url + "login",
    data: userData,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.message;
    });
  return data;
}

export async function updateUserAsync(payload) {
  var bodyParameters = {
    ...payload,
  };
  return await axios
    .patch(url + "updateuser", bodyParameters)
    .then((response) => {
      // response.data.user["token"] = response.data.token;
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function resetUserPassword(payload) {
  return await axios
    .patch(url + "resetuser", payload)
    .then((response) => {
      // response.data.user["token"] = response.data.token;
      console.log(response);
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export async function updateUserSecAsync(payload) {
  return await axios
    .patch(url + "updateusersec", payload)
    .then((response) => {
      // response.data.user["token"] = response.data.token;
      return response;
    })
    .catch((error) => {
      throw error;
    });
}

export async function generateBackup() {
  return await axios
    .get(url + "genBackup")
    .then((response) => {
      // let url = response.data;
      // let a = document.createElement("a");
      // a.href = url;
      // a.download = "employees.json";
      // a.click();
      // window.location.href = response.data;
      return response;
    })
    .catch((error) => {
      throw error;
    });
}
