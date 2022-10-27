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

// 게시글 수정용 상품 제목
export const postTitle = atom({
  key: 'postTitle',
  default: '',
});

// 게시글 수정용 상품 내용
export const postBody = atom({
  key: 'postBody',
  default: '',
});

// 게시글 수정용 상품 가격
export const postPrice = atom({
  key: 'postPrice',
  default: '',
});
