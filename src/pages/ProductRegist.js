import styled from 'styled-components';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ReadData, RequestProductRegist } from '../api/api';

export default function ProductRegist() {
  // useState 서버로 전송하기 위한 상품 정보 담기
  const [productInfo, setProductInfo] = useState('');

  // useState 서버로 전송하기 위한 이미지 정보 담기
  const [image, setImage] = useState();

  // onChange Title 정보 담기
  const onTitleChangeHandler = (event) => {
    const { name, value } = event.target;
    setProductInfo({ ...productInfo, [name]: value });
    console.log(productInfo);
  };

  // onChange Body 정보 담기
  const onBodyChangeHandler = (event) => {
    const { name, value } = event.target;
    setProductInfo({ ...productInfo, [name]: value });
    console.log(productInfo);
  };

  // onChange 최소 입찰가 정보 담기
  const onLowPriceChangeHandler = (event) => {
    const { name, value } = event.target;
    setProductInfo({ ...productInfo, [name]: value });
    console.log(productInfo);
  };

  // onChange Image 정보 담기
  const onImageHandler = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setImage(file);
    console.log('!!!', image);
  };

  // useMutation 서버로 상품정보 보내기 mutate
  const { mutate } = useMutation(RequestProductRegist, {
    onSuccess: () => {},
  });

  // 상품 정보 보내기 버튼 클릭 시
  const onSubmitData = (event) => {
    const formData = new FormData();
    console.log('상품 보내기 이미지', image);
    console.log('상품 보내기 정보', productInfo);

    formData.append('file', image);
    formData.append('title', productInfo.title);
    formData.append('content', productInfo.content);
    formData.append('lowPrice', productInfo.lowPrice);
    // formData.append('dto', ([JSON.stringify(productInfo)], { type: 'application/json' }));
    mutate(formData);
  };

  return (
    <ProductContainer>
      <ProductBox>
        <ProductTitleBox>
          <ProductTitleSpan>제목 : </ProductTitleSpan>
          <ProductTitleInput type={'text'} name='title' onChange={onTitleChangeHandler} placeholder={'제목 입력...'}></ProductTitleInput>
        </ProductTitleBox>
        <StLine />
        <ProductBody type={'text'} name='content' onChange={onBodyChangeHandler} placeholder={'내용 입력...'}></ProductBody>
        <StLine />
        <ProductMinInputBox>
          <ProductMinSpan>최저 입찰가 : </ProductMinSpan>
          <ProductMinInput type='number' name='lowPrice' onChange={onLowPriceChangeHandler} placeholder={'최저가 입력(숫자만 가능)'}></ProductMinInput>
        </ProductMinInputBox>
        <StLine />
        <ProductImgBox>
          <ProductImgSpan>사진 업로드 : </ProductImgSpan>
          <ProductImgInput type='file' name='image' accept='image/*' onChange={onImageHandler}></ProductImgInput>
        </ProductImgBox>
        <StLine />
        <ProductSubmit
          onClick={() => {
            onSubmitData();
          }}
        >
          등록하기
        </ProductSubmit>
      </ProductBox>
    </ProductContainer>
  );
}

const ProductContainer = styled.div`
  margin: auto 0;
`;

const StLine = styled.div`
  width: 100%;
  height: 1px;
  margin-top: 3px;
  background-color: black;
`;

const ProductBox = styled.div`
  width: 800px;
  height: 720px;
  border: 1px solid black;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const ProductTitleBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  margin-top: 3px;
`;

const ProductTitleSpan = styled.span`
  font-size: 35px;
  margin-bottom: 5px;
`;
const ProductTitleInput = styled.input`
  width: 80%;
  height: 40px;
  margin-right: 50px;
  font-size: 30px;
`;

const ProductBody = styled.textarea`
  width: 99.9%;
  height: 500px;
  border: none;
`;

const ProductMinInputBox = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProductMinSpan = styled.span`
  margin-left: 5px;
  height: 100%;
  display: flex;
  align-items: center;
`;

const ProductMinInput = styled.input`
  width: 40%;
  height: 80%;
  margin-right: 370px;
  margin-top: 3px;
`;

const ProductImgBox = styled.div`
  width: 600px;
  height: 50px;
  margin-right: 400px;
`;

const ProductImgSpan = styled.span``;

const ProductImgInput = styled.input`
  width: 400px;
  height: 40px;
  margin-top: 16px;
`;

const ProductSubmit = styled.button`
  margin-left: 680px;
  margin-top: 10px;
  height: 40px;
  width: 100px;
`;
// formData.append('dto', productInfo);
