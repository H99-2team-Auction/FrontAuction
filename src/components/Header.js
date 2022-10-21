import styled from 'styled-components';
import { Link } from 'react-router-dom';
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

const StHeaderLoginBtn = styled.span``;

export default function Header() {
  return (
    <>
      <StHeader>
        <StHeaderSpan>H99Auction</StHeaderSpan>
        <Link to='login'>로그인</Link>
      </StHeader>
    </>
  );
}
