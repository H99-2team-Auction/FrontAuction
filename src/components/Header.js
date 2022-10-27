import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isLogin, userID } from '../store/store';
import { useMutation } from '@tanstack/react-query';
import { RequestLogout } from '../api/api';

export default function Header() {
  // useRecoilState 로그인 여부 state
  const [isLoging, setIsLoging] = useRecoilState(isLogin);

  // useRecoilState 아이디 표시용 state
  const [recoilHeaderId, setRecoilHeaderId] = useRecoilState(userID);
  const navigate = useNavigate();

  // 로그아웃
  const { mutate: LogoutMutate } = useMutation(RequestLogout, {
    onSuccess: () => {
      console.log('logout');
    },
    onError: () => {},
  });

  // 로그아웃 버튼
  const onLogout = (a) => {
    localStorage.removeItem('Access_Token');
    localStorage.removeItem('Refresh_Token');
    localStorage.removeItem('myID');
    setIsLoging(false);
    alert('로그아웃 완료');
    LogoutMutate();
  };

  return (
    <a>
      <StHeader>
        <StHeaderSpan onClick={() => navigate('/')}>H99Auction</StHeaderSpan>
        <StHeaderRightBar>
          {isLoging === true ? <StHeaderId>{recoilHeaderId}님 반갑습니다.</StHeaderId> : null}
          {isLoging === true ? <StHeaderMyPage onClick={() => navigate('mypage')}>마이페이지</StHeaderMyPage> : null}
          {isLoging === true ? <StHeaderPostUp onClick={() => navigate('productregist')}>상품등록</StHeaderPostUp> : null}
          {isLoging === true ? <StHeaderLogout onClick={() => onLogout()}>로그아웃</StHeaderLogout> : null}
          {isLoging === false ? <StHeaderLoginBtn onClick={() => navigate('login')}>로그인</StHeaderLoginBtn> : null}
        </StHeaderRightBar>
      </StHeader>
    </a>
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const StHeaderSpan = styled.span`
  background-color: #04343e;
  margin: auto 0;
  margin-left: 420px;
  margin-top: 10px;
  cursor: pointer;
`;

const StHeaderRightBar = styled.div`
  background-color: #04343e;
  margin: auto 0;
  margin-right: 430px;
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
