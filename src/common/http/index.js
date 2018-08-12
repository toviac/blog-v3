import axios from 'axios';

const responseHandler = response => new Promise((resolve, reject) => {
  const { data } = response.data;
  if (data.resultCode === '100') {
    resolve(data);
  } else {
    reject(data);
  }
});

export default {
  async get(url, param) {
    const response = await axios.get(url, { params: param });
    return responseHandler(response);
  },
  async post(url, param) {
    const response = await axios.post(url, param);
    return responseHandler(response);
  },
  async put(url, param) {
    const response = await axios.put(url, param);
    return responseHandler(response);
  },
  async delete(url, param) {
    const response = await axios.delete(url, { data: param });
    return responseHandler(response);
  },
};
