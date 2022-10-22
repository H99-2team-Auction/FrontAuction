import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

export default function Login() {
  const navigate = useNavigate();
  return (
    <StLoginBoxContainer>
      <StLoginPTag>ID</StLoginPTag>
      <StLoginIdInput type={'text'}></StLoginIdInput>
      <StLoginPTag>PASSWORD</StLoginPTag>
      <StLoginPasswordInput type={'password'}></StLoginPasswordInput>
      <StloginBtn>로그인</StloginBtn>
      <StSignUpBtn onClick={() => navigate('/signup')}>회원가입</StSignUpBtn>
    </StLoginBoxContainer>
  );
}
