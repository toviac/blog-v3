import axios from 'axios';

const responseHandler = response => new Promise((resolve, reject) => {
  const { data } = response;
  if (data.resultCode === '100') {
    resolve(data);
  } else {
    reject(data);
  }
});

const formatUrl = (arg) => {
  const url = arg.toString();
  if (/\/api\//.test(url.substring(0, 5))) return url;
  return `/api/${url.charAt(0) === '/' ? '' : url.charAt(0)}${url.substring(1)}`;
};

export default {
  async get(url, param) {
    const response = await axios.get(formatUrl(url), { params: param });
    return responseHandler(response);
  },
  async post(url, param) {
    const response = await axios.post(formatUrl(url), param);
    return responseHandler(response);
  },
  async put(url, param) {
    const response = await axios.put(formatUrl(url), param);
    return responseHandler(response);
  },
  async delete(url, param) {
    const response = await axios.delete(formatUrl(url), { data: param });
    return responseHandler(response);
  },
};
