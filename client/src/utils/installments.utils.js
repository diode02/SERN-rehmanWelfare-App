import axios from "axios";
export async function getInstallmentsApi(dataWhere) {
  const data = await axios({
    method: "post",
    url: "installments/get",
    data: dataWhere,
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
