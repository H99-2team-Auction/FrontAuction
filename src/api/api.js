import axios from 'axios';

// 토큰 담기
const token = localStorage.getItem('Access_Token');

// 기본 api, header
const api = axios.create({
  baseURL: 'http://3.35.52.225',
  headers: { Access_Token: token },
});

// get / 홈페이지 정보 불러오기
export async function ReadDatas() {
  const response = await api.get('/product');
  return response.data;
}

// get / 상세페이지 정보 불러오기
export async function ReadData(id) {
  const response = await api.get(`/product/${id}`);
  return response.data;
}

// get / 상세페이지 정보 불러오기
export async function SuccessBidData(id) {
  const response = await api.get(`/mypage/sold`);
  return response.data;
}
//

// post / 회원가입 유저정보 보내기
export async function RequestSignUp(userInfo) {
  const { data } = await api.post('/signup', userInfo);
  console.log(data);
  return data;
}

// post / 로그인 유저정보 보내기
export async function RequestLogin(userInfo) {
  const response = await api.post('/api/login', userInfo);
  return response;
}

// post / 로그아웃;
export async function RequestLogout() {
  const data = await axios.post(`http://3.35.52.225/api/logout`);
  return data;
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

// post / 상품 댓글 등록 입력 보내기
export async function RequestCommentInput({ id, comment }) {
  const data = await api.post(`/product/${id}/comment`, comment);
  console.log(data);
}

// post / 입찰하기
export async function RequestPriceInput({ id, price }) {
  const data = await api.post(`/product/${id}/bid`, price);
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
  const response = await api.get('/mypage/like');
  return response.data;
}

// get / 입찰한 상품목록 정보 불러오기
export async function BiddingDataRead() {
  const response = await api.get('/mypage/bid');
  return response.data;
}

// delete / 댓글 삭제하기
export async function RequestPostCommentDelete({ id, commentid }) {
  console.log('url', `/product/${id}/comment/${commentid}`);
  console.log('id', id);
  console.log('commentId', commentid);
  const { data } = await api.delete(`/product/${id}/comment/${commentid}`);
  console.log('aaa', data);
}

// put / 댓글 수정하기
export async function RequestPostCommentModify({ id, commentid, finalCommentModify }) {
  console.log('url', `/product/${id}/comment/${commentid}`);
  console.log('id', id);
  console.log('comment', finalCommentModify);
  const { data } = await api.put(`/product/${id}/comment/${commentid}`, finalCommentModify);
  console.log('aaa', data);
}

// patch / 상품수정 정보 보내기
export async function RequestProductModify({ id, productInfo }) {
  console.log(`/product/${id}`);
  console.log('id', id);
  console.log('data', { productInfo });

  const { data } = await api.patch(`/product/${id}`, productInfo);
  return data;
}
