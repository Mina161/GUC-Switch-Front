import axios from "axios";

const baseURL = "localhost:8080";

const postRequest = async (body, query, params, endPoint) => {
  return await axios.post(
    `${baseURL}/${endPoint}/${params ? params : ""}`,
    body,
    {
      params: query,
    }
  );
};

const getRequest = async (query, params, endPoint) => {
  return await axios.get(`${baseURL}/${endPoint}${params ? params : ""}`, {
    params: query,
  });
};

const delRequest = async (query, params, endPoint) => {
  return await axios.delete(`${baseURL}/${endPoint}${params ? params : ""}`, {
    params: query,
  });
};

const putRequest = async (body, query, params, endPoint) => {
  return await axios.put(
    `${baseURL}/${endPoint}/${params ? params : ""}`,
    body,
    {
      params: query,
    }
  );
};

export { postRequest, getRequest, delRequest, putRequest };
