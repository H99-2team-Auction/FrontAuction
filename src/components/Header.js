import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
const StHeader = styled.div`
  background-color: #04343e;
  width: 100%;
  height: 80px;
  color: white;
  font-size: 50px;
  display: flex;
  justify-content: space-between;
`;

const StHeaderSpan = styled.span`
  margin-left: 40px;
`;

const StHeaderLoginBtn = styled.span`
  color: white;
  font-size: 20px;
  margin: auto 0;
  margin-right: 20px;
  cursor: pointer;
`;

export default function Header() {
  const navigate = useNavigate();
  return (
    <>
      <StHeader>
        <StHeaderSpan>H99Auction</StHeaderSpan>
        <StHeaderLoginBtn onClick={() => navigate('login')}>로그인</StHeaderLoginBtn>
      </StHeader>
    </>
  );
}
