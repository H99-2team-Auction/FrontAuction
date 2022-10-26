import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { RequestLogin } from '../api/api';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLogin } from '../store/store';
import { userID } from '../store/store';

export default function Login() {
  // 로그인 여부 recoil
  const [isLoging, setIsLoging] = useRecoilState(isLogin);

  // 로그인 ID recoil
  const [recoilLoginId, setRecoilLoginId] = useRecoilState(userID);

  const [myId, setMyId] = useState();
  // 라우터 navigate
  const navigate = useNavigate();

  // ID, PASSWORD 담는 useState
  const [userInfo, setUserInfo] = useState('');

  // 로그인 실패시 에러메세지 출력 useState
  const [ErrorMsg, setErrorMsg] = useState('');

  // ID INPUT
  const onIdChangeHandler = (event) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
    setMyId(value);
  };
  // PASSWORD INPUT
  const onPasswordChangeHandler = (event) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // 로그인 정보 서버로 보내기 / 토큰 담기
  const { mutate } = useMutation(RequestLogin, {
    onSuccess: (response) => {
      localStorage.setItem('Access_Token', response.headers.access_token);
      localStorage.setItem('Refresh_Token', response.headers.refresh_token);

      // localStorage.setItem('expiredTime', response.data.cur_time);
      // axios.defaults.headers.common['x-access-token'] = response.data.data.accessToken;

      console.log(response);

      // 로그인 성공시 홈페이지로 이동
      onLoginSuccess();
    },
    onError: () => {
      setErrorMsg('아이디 또는 비밀번호가 일치하지 않습니다.');
    },
  });

  // 서버로 데이터 전달 함수
  const AdduserInfo = (userInfo) => {
    mutate(userInfo);
  };

  // 로그인 성공시 함수
  const onLoginSuccess = () => {
    setRecoilLoginId(myId);
    setIsLoging(true);
    alert('로그인 성공');
    navigate('/');
  };

  return (
    <StLoginBoxContainer>
      <StLoginPTag>ID</StLoginPTag>
      <StLoginIdInput type={'text'} name='username' onChange={onIdChangeHandler}></StLoginIdInput>
      <StLoginPTag>PASSWORD</StLoginPTag>
      <StLoginPasswordInput type={'password'} name='password' onChange={onPasswordChangeHandler}></StLoginPasswordInput>
      <StSignErrorBar>{ErrorMsg}</StSignErrorBar>
      <StloginBtn
        onClick={() => {
          AdduserInfo(userInfo);
        }}
      >
        로그인
      </StloginBtn>
      <StSignUpBtn onClick={() => navigate('/signup')}>회원가입</StSignUpBtn>
    </StLoginBoxContainer>
  );
}
const StLoginBoxContainer = styled.div`
  width: 400px;
  height: 350px;
  border: 1px solid black;
  border-radius: 15px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`;

const StLoginPTag = styled.p`
  width: 80%;
  display: flex;
  justify-content: left;
  margin-top: 40px;
`;

const StLoginIdInput = styled.input`
  width: 80%;
  height: 30px;
  border: 1px solid #bdbdbd;
  margin-top: 10px;
`;

const StLoginPasswordInput = styled.input`
  width: 80%;
  height: 30px;
  border: 1px solid #bdbdbd;
  margin-top: 10px;
`;

const StloginBtn = styled.button`
  width: 100%;
  border: none;
  cursor: pointer;
  margin-top: 15px;
  background-color: #8dd8be;
  font-size: 25px;
`;

const StSignUpBtn = styled.button`
  width: 100%;
  border: none;
  cursor: pointer;
  background-color: #2e3e7c;
  color: white;
  font-size: 25px;
`;

const StSignErrorBar = styled.p`
  margin-top: 14px;
`;
