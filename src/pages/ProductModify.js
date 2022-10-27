import styled from 'styled-components';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { RequestProductModify } from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';
import { postTitle, postBody, postPrice } from '../store/store';
import { useRecoilState } from 'recoil';

export default function ProductModify() {
  // useParams 주소의 id값 받아오기
  const { id } = useParams();

  // navigate 라우터
  const navigate = useNavigate();

  // useRecoilState 상세 페이지에서 받아온 값
  const [ModifyPostTitle, setModifyPostTitle] = useRecoilState(postTitle);
  const [ModifyPostBody, setModifyPostBody] = useRecoilState(postBody);
  const [ModifyPostLowPrice, setModifyPostLowPrice] = useRecoilState(postPrice);

  // 상세 페이지에서 받아온 값 초기화
  const initialState = {
    title: ModifyPostTitle,
    content: ModifyPostBody,
    lowprice: ModifyPostLowPrice,
  };

  // useState 입력된 값 적용
  const [inputProduct, setInputProduct] = useState(initialState);

  // useState 서버로 전송하기 위한 상품 정보 담기
  const [productInfo, setProductInfo] = useState('');
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [lowPrice, setLowPrice] = useState();

  // onChange Title 정보 담기
  const onTitleChangeHandler = (event) => {
    const { name, value } = event.target;
    setProductInfo({ ...productInfo, [name]: value });
    setInputProduct({ ...setInputProduct, [name]: value });
    setTitle(value);
  };

  // onChange Body 정보 담기
  const onBodyChangeHandler = (event) => {
    const { name, value } = event.target;
    setProductInfo({ ...productInfo, [name]: value });
    setInputProduct({ ...setInputProduct, [name]: value });
    setBody(value);
  };

  // onChange 최소 입찰가 정보 담기
  const onLowPriceChangeHandler = (event) => {
    const { name, value } = event.target;
    setProductInfo({ ...productInfo, [name]: value });
    setLowPrice(value);
  };

  // useMutation 서버로 상품정보 보내기 mutate
  const { mutate } = useMutation(RequestProductModify, {
    onSuccess: () => {
      alert('수정 성공');
      navigate(`/detail/${id}`);
    },
    onError: () => {
      alert('수정 실패');
    },
  });

  // 상품 정보 보내기 버튼 클릭 시
  const onSubmitData = (event) => {
    mutate({ id, productInfo });
  };

  return (
    <ProductContainer>
      <StGap />
      <ProductBox>
        <ProductTitleBox>
          <p></p>
          <ProductTitleSpan>제목 : </ProductTitleSpan>
          <ProductTitleInput type={'text'} name='title' placeholder={'제목 입력...'} onChange={onTitleChangeHandler} value={inputProduct.title}></ProductTitleInput>
        </ProductTitleBox>
        <StLine />
        <ProductBody type={'text'} name='content' placeholder={'내용 입력...'} onChange={onBodyChangeHandler} value={inputProduct.content}></ProductBody>

        <StLine />
        <ProductMinInputBox>
          <ProductMinSpan>최저 입찰가 : </ProductMinSpan>
          <ProductMinInput type='number' name='lowPrice' placeholder={'최저가 입력(숫자만 가능)'} onChange={onLowPriceChangeHandler} value={inputProduct.lowprice}></ProductMinInput>
          <ProductSubmit
            onClick={() => {
              onSubmitData();
            }}
          >
            등록하기
          </ProductSubmit>
        </ProductMinInputBox>
      </ProductBox>
    </ProductContainer>
  );
}

const StGap = styled.div`
  margin-top: 120px;
`;

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
  height: 610px;
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
  border: 1px solid #bdbdbd;
  outline: none;
`;

const ProductBody = styled.textarea`
  width: 99.9%;
  height: 500px;
  border: none;
  outline: none;
`;

const ProductMinInputBox = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  outline: none;
`;

const ProductMinSpan = styled.span`
  margin-left: 5px;
  width: 140px;
  height: 100%;
  display: flex;
  align-items: center;
  margin-top: 5px;
`;

const ProductMinInput = styled.input`
  width: 40%;
  height: 30px;
  margin-right: 370px;
  margin-top: 8px;
  border: 1px solid #bdbdbd;
`;

const ProductSubmit = styled.button`
  padding: 0;
  margin-right: 10px;
  margin-top: 5px;
  height: 30px;
  width: 100px;
  background-color: #f0edcc;
  color: #02343f;
  &:hover {
    background-color: #02343f;
    color: #f0edcc;
  }
`;
