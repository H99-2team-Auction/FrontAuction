import { atom } from 'recoil';

export const isLogin = atom({
  key: 'isLogin',
  default: false,
});

export const userID = atom({
  key: 'userID',
  default: '',
});
