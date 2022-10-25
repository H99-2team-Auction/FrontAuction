import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isLogin, ID } from '../store/store';

export default function Header() {
  const [isLoging, setIsLoging] = useRecoilState(isLogin);
  const [recoilHeaderId, setRecoilHeaderId] = useRecoilState(ID);

  useEffect(() => {}, [isLoging]);
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem('Access_Token');
    localStorage.removeItem('Refresh_Token');
    setIsLoging(false);
    alert('로그아웃 완료');
    navigate('/');
  };

  return (
    <StHeader>
      <StHeaderSpan onClick={() => navigate('/')}>H99Auction</StHeaderSpan>
      <StHeaderRightBar>
        {isLoging === true ? <StHeaderId>{recoilHeaderId}님 반갑습니다.</StHeaderId> : null}
        {isLoging === true ? <StHeaderMyPage onClick={() => navigate('mypage')}>마이페이지</StHeaderMyPage> : null}
        {isLoging === true ? <StHeaderPostUp onClick={() => navigate('productregist')}>상품등록</StHeaderPostUp> : null}
        {isLoging === true ? <StHeaderLogout onClick={onLogout}>로그아웃</StHeaderLogout> : null}
        {isLoging === false ? <StHeaderLoginBtn onClick={() => navigate('login')}>로그인</StHeaderLoginBtn> : null}
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
