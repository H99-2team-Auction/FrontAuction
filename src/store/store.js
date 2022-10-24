import { atom } from 'recoil';

export const isLogin = atom({
  key: 'isLogin',
  default: false,
});

export const ID = atom({
  key: 'ID',
  default: '',
});
