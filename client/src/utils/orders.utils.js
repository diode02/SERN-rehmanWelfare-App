import axios from "axios";

export async function getOdersAPI(dataWhere) {
  const data = await axios({
    method: "get",
    url: "orders",
    data: dataWhere,
  }).then(
    (response) => {
      return Object.values(response.data);
    },
    (error) => {
      throw error;
    }
  );
  return data;
}
