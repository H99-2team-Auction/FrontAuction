import axios from 'axios';

const token = localStorage.getItem('Access_Token');

const api = axios.create({
  baseURL: 'http://3.35.52.225',
  headers: { Access_Token: token },
});

// localhost:3001/todos
export function ReadData() {
  return api.get('/product/').then((response) => {
    return response.data;
  });
}

export async function RequestSignUp(userInfo) {
  const { data } = await api.post('/signup', userInfo);
  return data;
}

export async function RequestLogin(userInfo) {
  const response = await api.post('/login', userInfo);
  return response;
}

export async function RequestProductRegist(userInfo) {
  const { data } = await api.post('/product', userInfo);
  console.log('ddd', data);
  return data;
}
