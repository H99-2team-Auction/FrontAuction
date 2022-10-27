import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { LikeDataRead } from '../../api/api';

export default function LikeProduct() {
  // navigate 라우터
  const navigate = useNavigate();

  // useQuery GET 관심등록 데이터
  const { data: LikeProductDatas } = useQuery(['LikeProductData'], LikeDataRead, {
    onSuccess: (temp) => {
      console.log(temp);
    },
  });

  return (
    <StPostContainer>
      {LikeProductDatas !== undefined
        ? LikeProductDatas.map((data) => {
            return (
              <StPostBox key={data.id} onClick={() => navigate(`/detail/${data.id}`)}>
                <StPostHeader>{data.title}</StPostHeader>
                <StPostImage src={`https://jaesa-bucket.s3.ap-northeast-2.amazonaws.com/${data.path}`} />
                <StPriceBox>
                  <StMinPrice>최저 입찰가 : {data.lowPrice}원</StMinPrice>
                  <StMaxPrice>최대 입찰가 : {data.highPrice}원</StMaxPrice>
                </StPriceBox>
                <StBodyBox>{data.content}</StBodyBox>
              </StPostBox>
            );
          })
        : null}
    </StPostContainer>
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
