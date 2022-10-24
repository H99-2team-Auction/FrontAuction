import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { RequestSignUp } from '../api/api';

export default function SignUp() {
  // 라우터 navigate
  const navigate = useNavigate();

  // ID, PASSWORD, PASSWORD CHECK 담는 useState
  const [userInfo, setUserInfo] = useState('');

  // 비밀번호 확인 검증 useState
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  // 에러
  const [SignUpError, setSignUpError] = useState('\u00A0');

  // ID INPUT
  const onIdChangeHandler = (event) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  // PASSWORD INPUT
  const onPasswordChangeHandler = (event) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
    setPassword(value);
  };

  // PASSWORD CHECK INPUT
  const onPasswordConfirmChangeHandler = (event) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
    setPasswordCheck(value);
  };

  // 유저 정보 서버로 보내기
  const { mutate } = useMutation(RequestSignUp, {
    onSuccess: () => {
      alert('회원가입 성공');
      navigate('/login');
    },
    onError: () => {
      setSignUpError('회원가입 실패');
    },
  });

  // 서버 전송 함수
  const AdduserInfo = (userInfo) => {
    mutate(userInfo);
  };

  return (
    <StSignUpBoxContainer>
      <StSignUpPTag>ID</StSignUpPTag>
      <StSignUpIdInput type={'text'} name='username' onChange={onIdChangeHandler}></StSignUpIdInput>
      <StSignUpPTag>PASSWORD</StSignUpPTag>
      <StSignUpPasswordInput type={'password'} name='password' onChange={onPasswordChangeHandler} maxLength='12'></StSignUpPasswordInput>
      <StSignUpPasswordErrorP>대소문자, 숫자, 특수문자 포함 8자 이상</StSignUpPasswordErrorP>
      <StSignUpPTag>PASSWORD 확인</StSignUpPTag>
      <StSignUpPasswordCheckInput type={'password'} name='passwordConfirm' onChange={onPasswordConfirmChangeHandler} maxLength='12'></StSignUpPasswordCheckInput>

      <StSignUpErrorP>{SignUpError}</StSignUpErrorP>
      <StSignUpBtn
        onClick={() => {
          {
            password === passwordCheck ? AdduserInfo(userInfo) : setSignUpError('회원가입 실패');
          }
        }}
      >
        회원등록
      </StSignUpBtn>
    </StSignUpBoxContainer>
  );
}

const StSignUpBoxContainer = styled.div`
  width: 400px;
  height: 460px;
  border: 1px solid black;
  border-radius: 15px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`;

const StSignUpPTag = styled.p`
  width: 80%;
  display: flex;
  justify-content: left;
  margin-top: 40px;
`;

const StSignUpIdInput = styled.input`
  width: 80%;
  height: 30px;
  border: 1px solid #bdbdbd;
  margin-top: 10px;
`;

const StSignUpPasswordInput = styled.input`
  width: 80%;
  height: 30px;
  border: 1px solid #bdbdbd;
  margin-top: 10px;
`;

const StSignUpPasswordCheckInput = styled.input`
  width: 80%;
  height: 30px;
  border: 1px solid #bdbdbd;
  margin-top: 10px;
`;

const StSignUpBtn = styled.button`
  width: 100%;
  border: none;
  cursor: pointer;
  margin-top: 25px;
  background-color: #8dd8be;
  font-size: 25px;
`;

const StSignUpErrorP = styled.p`
  margin-top: 15px;
`;

const StSignUpPasswordErrorP = styled.p`
  margin-top: 15px;
  font-size: 14px;
`;
