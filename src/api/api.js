import axios from 'axios';

// localhost:3001/todos
export function ReadData() {
  return axios.get('http://3.35.52.225/product').then((response) => {
    return response.data;
  });
}

export async function RequestSignUp(userInfo) {
  const { data } = await axios.post('http://3.35.52.225/signup', userInfo);
  return data;
}

export async function RequestLogin(userInfo) {
  const { data } = await axios.post('http://3.35.52.225/login', userInfo).then((response) => {
    console.log('resposne', response);
    localStorage.setItem('Access_Token', response.getHeader);
    localStorage.setItem('Refresh_Token', response.getHeader);
    localStorage.setItem('expiredTime', response.data.cur_time);
    axios.defaults.headers.common['x-access-token'] = response.data.data.accessToken;
  });
  console.log('abcd', data);
  return data;
}
