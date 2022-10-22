import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StSignUpBoxContainer = styled.div`
  width: 400px;
  height: 400px;
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

export default function SignUp() {
  const navigate = useNavigate();
  return (
    <StSignUpBoxContainer>
      <StSignUpPTag>ID</StSignUpPTag>
      <StSignUpIdInput type={'text'}></StSignUpIdInput>
      <StSignUpPTag>PASSWORD</StSignUpPTag>
      <StSignUpPasswordInput type={'password'}></StSignUpPasswordInput>
      <StSignUpPTag>PASSWORD 확인</StSignUpPTag>
      <StSignUpPasswordCheckInput type={'password'}></StSignUpPasswordCheckInput>

      <StSignUpBtn>회원등록</StSignUpBtn>
    </StSignUpBoxContainer>
  );
}
