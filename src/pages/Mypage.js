import styled from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';

const StMypageNavbar = styled.div`
  margin-top: 20px;
  background-color: #348597;
  border: 1px solid #348597;
  border-radius: 15px;
  width: 60%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StSuccessBidMenu = styled.div`
  background-color: #333d79;
  border: 5px solid #333d79;
  border-radius: 15px;
  color: white;
  cursor: pointer;
`;
const StBiddingMenu = styled.div`
  background-color: #faebef;
  border: 5px solid #faebef;
  border-radius: 15px;
  color: black;
  cursor: pointer;
`;
const StLikeProductMenu = styled.div`
  background-color: #faebef;
  border: 5px solid #faebef;
  border-radius: 15px;
  color: black;
  cursor: pointer;
`;

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
        <StBiddingMenu
          onClick={() => {
            navigate('bidding');
          }}
        >
          낙찰받은 상품목록
        </StBiddingMenu>
        <StLikeProductMenu
          onClick={() => {
            navigate('likeproduct');
          }}
        >
          관심있는 상품목록
        </StLikeProductMenu>
      </StMypageNavbar>
      <Outlet></Outlet>
    </>
  );
}
