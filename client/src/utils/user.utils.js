import axios from "axios";
const url = "users/";

export async function createUserWithEmailAndPassword(userData) {
  const response = await axios({
    method: "post",
    url: `${url}`,
    data: userData,
  })
    .then((response) => {
      response.data.data["token"] = response.data.token;
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
    ...payload.data,
  };
  var config = {
    headers: { Authorization: payload.token },
  };
  return await axios
    .patch(url + "updateuser", bodyParameters, config)
    .then((response) => {
      response.data.user["token"] = response.data.token;
      return response.data.user;
    })
    .catch((error) => {
      throw error;
    });
}
