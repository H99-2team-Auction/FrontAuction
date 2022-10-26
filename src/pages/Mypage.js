import styled from 'styled-components';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Mypage() {
  // 라우터 navigate
  const navigate = useNavigate();

  return (
    <>
      <StMypageNavbar>
        {/* 낙찰받은 상품목록 버튼 */}
        <StSuccessBidMenu
          onClick={() => {
            navigate('successbid');
          }}
        >
          낙찰받은 상품목록
        </StSuccessBidMenu>

        {/* 입찰중인 상품목록 버튼 */}
        <StBiddingMenu
          onClick={() => {
            navigate('bidding');
          }}
        >
          입찰중인 상품목록
        </StBiddingMenu>

        {/* 관심있는 상품목록 버튼 */}
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
