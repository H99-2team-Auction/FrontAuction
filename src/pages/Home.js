import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ReadDatas } from '../api/api';
import { useEffect, useState } from 'react';

export default function Home() {
  // queryClient
  // const queryClient = useQueryClient();

  // navigate 라우터
  const navigate = useNavigate();

  const [viewLowPrice, setViewLowPrice] = useState();
  const [viewHighPrice, setViewHighPrice] = useState();

  // useQuery GET 상품 정보 불러오기
  const { data: homeData } = useQuery(['HomeData'], ReadDatas, {
    onSuccess: (data) => {
      // price 콤마(,)찍기위한 정규표현식
      // const createLowPrice = data.data.lowPrice;
      // const createHighPrice = data.data.highPrice;
      // const commaLowPrice = createLowPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      // const commaHighPrice = createHighPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      // setViewLowPrice(commaLowPrice);
      // setViewHighPrice(commaHighPrice);
    },
  });

  return (
    <>
      <StPostContainer>
        <StGap />

        {homeData &&
          homeData?.data.map((data) => {
            return (
              <StPostBox key={data?.id} onClick={() => navigate(`detail/${data?.id}`)}>
                <StTitleBox>
                  <StPostHeader>{data?.title}</StPostHeader>
                  <StHeaderId>{data?.username}</StHeaderId>
                </StTitleBox>
                <StPostImage src={`https://jaesa-bucket.s3.ap-northeast-2.amazonaws.com/${data?.path}`} />
                <StPriceBox>
                  <StMinPrice>최저 입찰가 : {data?.lowPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</StMinPrice>
                  <StMaxPrice>현재 최대 입찰가 : {data?.highPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</StMaxPrice>
                </StPriceBox>
                <StBodyBox>{data?.content}</StBodyBox>
              </StPostBox>
            );
          })}
      </StPostContainer>
    </>
  );
}

const StPostContainer = styled.div`
  margin: 0 auto;
`;

const StGap = styled.div`
  margin-top: 120px;
`;

const StPostBox = styled.div`
  border: 2px solid #dbdbdb;
  border-radius: 5px;
  margin-top: 50px;
  margin-bottom: 30px;
  width: 471px;
  cursor: pointer;
`;

const StTitleBox = styled.div`
  display: flex;
  flex-direction: row;
  text-overflow: ellipsis;
  word-break: break-all;
  background: #dce2f0;
`;

const StHeaderId = styled.p`
  width: 25%;
  margin-top: 20px;
  margin-right: 8px;
  font-size: 15px;
  font-weight: bold;
  text-overflow: ellipsis;
  display: flex;
  justify-content: right;
  background: #dce2f0;
`;

const StPostHeader = styled.div`
  width: 75%;
  height: 56px;
  font-size: 20px;
  display: flex;
  align-items: center;
  margin-left: 20px;
  text-overflow: ellipsis;
  word-break: break-all;
  background: #dce2f0;
`;

const StPostImage = styled.img`
  width: 471px;
  height: 471px;
  object-fit: fill;
  /* object-fit: cover; */
`;

const StPriceBox = styled.div`
  display: flex;
  flex-direction: row;
`;
const StMinPrice = styled.div`
  background-color: #ffdfde;
  width: 50%;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StMaxPrice = styled.div`
  background-color: #6a7ba2;
  color: white;
  width: 240px;
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
