import { atom } from 'recoil';

// 로그인 여부
export const isLogin = atom({
  key: 'isLogin',
  default: false,
});

// 유저 ID 담기
export const userID = atom({
  key: 'userID',
  default: '',
});
