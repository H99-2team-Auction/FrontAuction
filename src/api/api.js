import axios from 'axios';
import { useRecoilValue, useRecoilState } from 'recoil';
import { productID } from '../store/store';
const token = localStorage.getItem('Access_Token');

const api = axios.create({
  baseURL: 'http://3.35.52.225',
  headers: { Access_Token: token },
});

// get / 홈페이지 정보 불러오기
export async function ReadDatas() {
  const response = await api('/product');
  return response.data;
}

// get / 상세페이지 정보 불러오기
export async function ReadData(id) {
  const response = await api(`/product/${id}`);
  return response.data;
}

// post / 회원가입 유저정보 보내기
export async function RequestSignUp(userInfo) {
  const { data } = await api.post('/signup', userInfo);
  console.log(data);
  return data;
}

// post / 로그인 유저정보 보내기
export async function RequestLogin(userInfo) {
  const response = await api.post('/login', userInfo);
  return response;
}

// post / 상품등록 정보 보내기
export async function RequestProductRegist(formData) {
  const { data } = await api.post('/product', formData, {
    headers: {
      headers: { Access_Token: token },
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
}

// post / 상품 댓글 등록 정보 보내기
export async function RequestCommentInput({ id, comment }) {
  const data = await api.post(`/product/${id}/comment`, comment);
  console.log(data);
}

// post / 입찰하기
export async function RequestPriceInput({ id, price }) {
  const data = await api.post(`/product/${id}/bid`, price);
  console.log('123', data);
}

// post / 낙찰하기
export async function RequestSuccessBidInput(id) {
  const data = await api.post(`/product/${id}/winning-bid`);
  console.log(data);
}

// delete / 게시글 삭제하기
export async function RequestDeletePost(id) {
  const { data } = await api.delete(`/product/${id}`);
  console.log('aaa', data);
}

// post / 게시글 관심등록
export async function RequestLikePost(id) {
  console.log('api', id);
  const { data } = await api.post(`/product/${id}/like`);
  console.log('aaa', data);
}

// get / 관심있는 상품목록 정보 불러오기
export async function LikeDataRead() {
  const response = await api('/mypage/like');
  return response.data;
}

// get / 입찰한 상품목록 정보 불러오기
export async function BiddingDataRead() {
  const response = await api('/mypage/bid');
  return response.data;
}
