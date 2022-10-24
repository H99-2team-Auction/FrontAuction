import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <StHeader>
      <StHeaderSpan onClick={() => navigate('/')}>H99Auction</StHeaderSpan>
      <StHeaderRightBar>
        <StHeaderId>ID</StHeaderId>
        <StHeaderMyPage onClick={() => navigate('mypage')}>마이페이지</StHeaderMyPage>
        <StHeaderPostUp onClick={() => navigate('productregist')}>상품등록</StHeaderPostUp>
        <StHeaderLogout>로그아웃</StHeaderLogout>
        <StHeaderLoginBtn onClick={() => navigate('login')}>로그인</StHeaderLoginBtn>
      </StHeaderRightBar>
    </StHeader>
  );
}

const StHeader = styled.div`
  background: #04343e;
  width: 100%;
  height: 80px;
  color: white;
  font-size: 40px;
  display: flex;
  justify-content: space-between;
`;

const StHeaderSpan = styled.span`
  background-color: #04343e;
  margin: auto 0;
  margin-left: 40px;
  margin-top: 10px;
  cursor: pointer;
`;

const StHeaderRightBar = styled.div`
  background-color: #04343e;
  margin: auto 0;
  margin-right: 30px;
  color: white;
  font-size: 20px;
`;

const StHeaderLoginBtn = styled.span`
  background-color: #04343e;
  cursor: pointer;
`;

const StHeaderLogout = styled.span`
  background-color: #04343e;
  margin-right: 15px;
  cursor: pointer;
`;

const StHeaderPostUp = styled.span`
  background-color: #04343e;
  margin-right: 15px;
  cursor: pointer;
`;

const StHeaderMyPage = styled.span`
  background-color: #04343e;
  margin-right: 15px;
  cursor: pointer;
`;

const StHeaderId = styled.span`
  background-color: #04343e;
  margin-right: 15px;
  cursor: default;
`;
