import styled from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';

const StMypageNavbar = styled.div`
  background-color: black;
  width: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StSuccessBidMenu = styled.div``;
const StBiddingMenu = styled.div``;
const StLikeProductMenu = styled.div``;

export default function Mypage() {
  const navigate = useNavigate();
  return (
    <>
      <StMypageNavbar>
        <StSuccessBidMenu
          onClick={() => {
            navigate('successbid');
          }}
        >
          낙찰받은 상품목록
        </StSuccessBidMenu>
        <StBiddingMenu>낙찰받은 상품목록</StBiddingMenu>
        <StLikeProductMenu>관심있는 상품목록</StLikeProductMenu>
      </StMypageNavbar>
      <Outlet></Outlet>
    </>
  );
}
