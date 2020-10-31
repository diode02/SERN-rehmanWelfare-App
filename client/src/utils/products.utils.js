import axios from "axios";

export async function getProductsApi(bodyParameters) {
  const data = await axios.post("products/get", bodyParameters).then(
    (response) => {
      return response.data;
    },
    (error) => {
      throw error;
    }
  );
  return data;
}

export async function postProductApi(order) {
  // return;
  const data = await axios({
    method: "post",
    url: "products",
    data: order,
  }).then(
    (response) => {
      return response.data;
    },
    (error) => {
      throw error.response.data;
    }
  );
  return data;
}

export async function patchProductApi(dataWhereUpdates) {
  const data = await axios({
    method: "patch",
    url: "products",
    data: dataWhereUpdates,
  }).then(
    (response) => {
      // let data = Object.values(response.data);
      return response.data;
    },
    (error) => {
      throw error;
    }
  );
  return data;
}

export async function deleteProductApi(id) {
  const data = await axios({
    method: "delete",
    url: "products/" + id,
  }).then(
    (response) => {
      // let data = Object.values(response.data);
      return response.data;
    },
    (error) => {
      throw error.response.data.error;
    }
  );
  return data;
}
