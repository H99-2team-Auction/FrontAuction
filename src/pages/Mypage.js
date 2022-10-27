import styled from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Mypage() {
  // navigate 라우터
  const navigate = useNavigate();

  // useState 메뉴 색상 변경용
  const [checkMenu, setCheckMenu] = useState(0);

  // 낙찰된 메뉴를 클릭했을 때
  const onSuccessMenu = () => {
    setCheckMenu(1);
    navigate('successbid');
  };

  // 입찰중인 메뉴를 클릭했을 때
  const onBiddingMenu = () => {
    setCheckMenu(2);
    navigate('bidding');
  };

  // 관심등록 상품 메뉴를 클릭했을 때
  const onLikeMenu = () => {
    setCheckMenu(3);
    navigate('likeproduct');
  };

  return (
    <>
      <StGap />
      <StMypageNavbar>
        {checkMenu === 0 ? (
          <>
            <StSuccessBidMenu
              onClick={() => {
                onSuccessMenu();
              }}
            >
              낙찰받은 상품목록
            </StSuccessBidMenu>
            <StBiddingMenu
              onClick={() => {
                onBiddingMenu();
              }}
            >
              입찰중인 상품목록
            </StBiddingMenu>
            <StLikeProductMenu
              onClick={() => {
                onLikeMenu();
              }}
            >
              관심있는 상품목록
            </StLikeProductMenu>{' '}
          </>
        ) : null}
        {checkMenu === 1 ? (
          <>
            <StSuccessBidMenu1
              onClick={() => {
                onSuccessMenu();
              }}
            >
              낙찰받은 상품목록
            </StSuccessBidMenu1>
            <StBiddingMenu1
              onClick={() => {
                onBiddingMenu();
              }}
            >
              입찰중인 상품목록
            </StBiddingMenu1>
            <StLikeProductMenu1
              onClick={() => {
                onLikeMenu();
              }}
            >
              관심있는 상품목록
            </StLikeProductMenu1>
          </>
        ) : null}
        {checkMenu === 2 ? (
          <>
            <StSuccessBidMenu2
              onClick={() => {
                onSuccessMenu();
              }}
            >
              낙찰받은 상품목록
            </StSuccessBidMenu2>
            <StBiddingMenu2
              onClick={() => {
                onBiddingMenu();
              }}
            >
              입찰중인 상품목록
            </StBiddingMenu2>
            <StLikeProductMenu2
              onClick={() => {
                onLikeMenu();
              }}
            >
              관심있는 상품목록
            </StLikeProductMenu2>
          </>
        ) : null}

        {checkMenu === 3 ? (
          <>
            <StSuccessBidMenu3
              onClick={() => {
                onSuccessMenu();
              }}
            >
              낙찰받은 상품목록
            </StSuccessBidMenu3>
            <StBiddingMenu3
              onClick={() => {
                onBiddingMenu();
              }}
            >
              입찰중인 상품목록
            </StBiddingMenu3>
            <StLikeProductMenu3
              onClick={() => {
                onLikeMenu();
              }}
            >
              관심있는 상품목록
            </StLikeProductMenu3>
          </>
        ) : null}
      </StMypageNavbar>
      <Outlet></Outlet>
    </>
  );
}

const StGap = styled.div`
  margin-top: 100px;
`;

const StMypageNavbar = styled.div`
  background-color: #603f83;
  border: 1px solid #603f83;
  border-radius: 15px;
  width: 60%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 40%;
`;

const StSuccessBidMenu = styled.div`
  background-color: #fcf6f5;
  border: 5px solid #fcf6f5;
  border-radius: 15px;
  color: #7b9acc;
  cursor: pointer;
`;
const StBiddingMenu = styled.div`
  background-color: #fcf6f5;
  border: 5px solid #fcf6f5;
  border-radius: 15px;
  color: #7b9acc;
  cursor: pointer;
`;
const StLikeProductMenu = styled.div`
  background-color: #fcf6f5;
  border: 5px solid #fcf6f5;
  border-radius: 15px;
  color: #7b9acc;
  cursor: pointer;
`;

const StSuccessBidMenu1 = styled.div`
  background-color: #7b9acc;
  border: 5px solid #7b9acc;
  border-radius: 15px;
  color: #fcf6f5;
  cursor: pointer;
`;
const StBiddingMenu1 = styled.div`
  background-color: #fcf6f5;
  border: 5px solid #fcf6f5;
  border-radius: 15px;
  color: #7b9acc;
  cursor: pointer;
`;
const StLikeProductMenu1 = styled.div`
  background-color: #fcf6f5;
  border: 5px solid #fcf6f5;
  border-radius: 15px;
  color: #7b9acc;
  cursor: pointer;
`;

const StSuccessBidMenu2 = styled.div`
  background-color: #fcf6f5;
  border: 5px solid #fcf6f5;
  border-radius: 15px;
  color: #7b9acc;
  cursor: pointer;
`;
const StBiddingMenu2 = styled.div`
  background-color: #7b9acc;
  border: 5px solid #7b9acc;
  border-radius: 15px;
  color: #fcf6f5;
  cursor: pointer;
`;
const StLikeProductMenu2 = styled.div`
  background-color: #fcf6f5;
  border: 5px solid #fcf6f5;
  border-radius: 15px;
  color: #7b9acc;
  cursor: pointer;
`;

const StSuccessBidMenu3 = styled.div`
  background-color: #fcf6f5;
  border: 5px solid #fcf6f5;
  border-radius: 15px;
  color: #7b9acc;
  cursor: pointer;
`;
const StBiddingMenu3 = styled.div`
  background-color: #fcf6f5;
  border: 5px solid #fcf6f5;
  border-radius: 15px;
  color: #7b9acc;
  cursor: pointer;
`;
const StLikeProductMenu3 = styled.div`
  background-color: #7b9acc;
  border: 5px solid #7b9acc;
  border-radius: 15px;
  color: #fcf6f5;
  cursor: pointer;
`;
