import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ReadDatas } from '../api/api';

export default function Home() {
  // 라우터 navigate
  const navigate = useNavigate();

  // home product Data useQuery
  const { data: homeData } = useQuery(['HomeData'], ReadDatas, {
    onSuccess: (temp) => {
      console.log(temp);
    },
  });

  return (
    <>
      <StPostContainer>
        <StPostBox onClick={() => navigate('detail')}>
          <StPostHeader>이상한 펭귄 데려가세요. (테스트)</StPostHeader>
          <StPostImage src={`https://jaesa-bucket.s3.ap-northeast-2.amazonaws.com/Pictures/5851293a-6dcf-45b4-96c0-21e523a001a7.png`} />
          <StPriceBox>
            <StMinPrice>최저 입찰가 : 500,000원</StMinPrice>
            <StMaxPrice>최대 입찰가 : 1,000,000원</StMaxPrice>
          </StPriceBox>
          <StBodyBox>길가다 주운 펭수 팝니다. 밥은 주로 송로버섯을 먹습니다.</StBodyBox>
        </StPostBox>
      </StPostContainer>

      {homeData !== undefined
        ? homeData.data.map((data) => {
            return (
              <StPostBox key={data.id} onClick={() => navigate(`detail/${data.id}`)}>
                <StPostHeader>{data.title}</StPostHeader>
                <StPostImage src={`https://upload.wikimedia.org/wikipedia/ko/thumb/d/d4/%ED%8E%AD%EC%88%98.jpg/300px-%ED%8E%AD%EC%88%98.jpg`} />
                <StPriceBox>
                  <StMinPrice>최저 입찰가 : {data.lowPrice}원</StMinPrice>
                  <StMaxPrice>최대 입찰가 : 1,000,000원</StMaxPrice>
                </StPriceBox>
                <StBodyBox>{data.content}</StBodyBox>
              </StPostBox>
            );
          })
        : null}
    </>
  );
}

const StPostContainer = styled.div`
  margin: 0 auto;
`;

const StPostBox = styled.div`
  border: 2px solid #dbdbdb;
  border-radius: 5px;
  margin-top: 30px;
  width: 471px;
  cursor: pointer;
`;

const StPostHeader = styled.div`
  height: 56px;
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-weight: bold;
`;

const StPostImage = styled.img`
  width: 471px;
  height: 471px;
  background-color: black;
`;

const StPriceBox = styled.div`
  display: flex;
  flex-direction: row;
`;
const StMinPrice = styled.div`
  background-color: #ffdfde;
  width: 235px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StMaxPrice = styled.div`
  background-color: #6a7ba2;
  color: white;
  width: 236px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StBodyBox = styled.div`
  width: 400px;
  height: 40px;
  display: block;
  margin-left: 20px;
  margin-top: 15px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
