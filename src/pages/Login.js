import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ReadData } from '../api/api';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { RequestLogin } from '../api/api';

export default function Login() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState('');
  // const { data } = useQuery(['myData'], ReadData, {
  //   onSuccess: (temp) => {
  //     console.log('___', temp);
  //   },
  // });

  const onIdChangeHandler = (event) => {
    const { name, value } = event.target;
    console.log({ [name]: value });
    setUserInfo({ ...userInfo, [name]: value });
  };

  const onPasswordChangeHandler = (event) => {
    const { name, value } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const { mutate } = useMutation(RequestLogin, {
    onSuccess: () => {},
  });

  const AdduserInfo = (userInfo) => {
    mutate(userInfo);
  };

  return (
    <StLoginBoxContainer>
      <StLoginPTag>ID</StLoginPTag>
      <StLoginIdInput type={'text'} name='username' onChange={onIdChangeHandler}></StLoginIdInput>
      <StLoginPTag>PASSWORD</StLoginPTag>
      <StLoginPasswordInput type={'password'} name='password' onChange={onPasswordChangeHandler}></StLoginPasswordInput>
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
  height: 300px;
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
