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
      console.log(response.data);
      return response.data;
    },
    (error) => {
      throw error.response.data;
    }
  );
  return data;
}
