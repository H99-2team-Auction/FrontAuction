import styled from 'styled-components';
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

export default function ProductRegist() {
  return (
    <ProductContainer>
      <ProductBox>
        <ProductTitleBox>
          <ProductTitleSpan>제목 : </ProductTitleSpan>
          <ProductTitleInput></ProductTitleInput>
        </ProductTitleBox>
        <StLine />
        <ProductBody></ProductBody>
        <StLine />
        <ProductMinInputBox>
          <ProductMinSpan>최저 입찰가 : </ProductMinSpan>
          <ProductMinInput type='number'></ProductMinInput>
        </ProductMinInputBox>
        <StLine />
        <ProductImgBox>
          <ProductImgSpan>사진 업로드 : </ProductImgSpan>
          <ProductImgInput type='file' accept='image/*'></ProductImgInput>
        </ProductImgBox>
        <StLine />
        <ProductSubmit>등록하기</ProductSubmit>
      </ProductBox>
    </ProductContainer>
  );
}
