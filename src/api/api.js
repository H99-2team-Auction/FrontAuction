import axios from 'axios';

const token = localStorage.getItem('Access_Token');

const api = axios.create({
  baseURL: 'http://3.35.52.225',
  headers: { Access_Token: token },
});

export async function ReadData(id) {
  const response = await api(`/product/${id}`);
  return response.data;
}

export async function ReadDatas() {
  const response = await api('/product');
  return response.data;
}

export async function RequestSignUp(userInfo) {
  const { data } = await api.post('/signup', userInfo);
  console.log(data);
  return data;
}

export async function RequestLogin(userInfo) {
  const response = await api.post('/login', userInfo);
  return response;
}

export async function RequestProductRegist(userInfo) {
  const { data } = await api.post('/product', userInfo);
  return data;
}
