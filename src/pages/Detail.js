import styled from 'styled-components';

// 전체 박스 컨테이너
const StDetailContainer = styled.div`
  margin: 0 auto;
  width: 1000px;
`;
// 디테일 박스
const StDetailBox = styled.div`
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  width: 1007px;
  height: 682px;
  margin-top: 40px;
  display: flex;
  flex-direction: row;
`;

// hr 대체용
const StLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #dbdbdb;
`;

// 디테일 박스 왼쪽 구간
const StDetailLeftBox = styled.div``;

// 왼쪽 박스 이미지
const StDetailImage = styled.img`
  width: 603px;
  height: 600px;
  display: flex;
  object-fit: cover;
`;

// 왼쪽 박스 가격 박스
const StDetailPriceBox = styled.div`
  display: flex;
  flex-direction: row;
`;

// 왼쪽 박스 최저가
const StDetailMin = styled.div`
  background-color: #ffdfde;
  width: 300px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 왼쪽 박스 최대가
const StDetailMax = styled.div`
  background-color: #6a7ba2;
  color: white;
  width: 300px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 왼쪽 박스 입찰가 입력란
const StDetailInputPrice = styled.input`
  border: 1px solid #dbdbdb;
  background-color: #fcf6f5;
  width: 470px;
  height: 50px;
  font-size: 20px;
  text-align: center;
`;

// 왼쪽 박스 입찰 버튼
const StDetailBidding = styled.div`
  width: 130px;
  border: 1px solid #dbdbdb;
  background-color: #7b9acc;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

// 디테일 박스 오른쪽 박스
const StDetailRightBox = styled.div``;

// 오른쪽 박스 ID 박스
const StDetailIdBox = styled.div`
  width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// 오른쪽 박스 ID란
const StDetailId = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
`;

// 오른쪽 박스 ID란 수정하기/삭제하기 버튼 박스
const StDetailIdBtnBox = styled.div`
  display: flex;
  border: 1px solid #dbdbdb;
`;

// 오른쪽 ID ID란 수정하기/삭제하기
const StDetailIdBtn = styled.button`
  border: 1px solid #dbdbdb;
`;

// 오른쪽 Body란 Body 박스
const StDetailBodyBox = styled.div``;

// 오른쪽 Body란
const StDetailBody = styled.div`
  margin-top: 10px;
  margin-left: 10px;
`;

// 오른쪽 Body란 댓글리스트
const StDetailCommentList = styled.ul`
  height: 455px;
`;

// 오른쪽 Body란 댓글
const StDetailComment = styled.li`
  margin-left: 10px;
  margin-top: 10px;
  list-style: none;
`;

// 오른쪽 Input란 박스
const StCommentInputBox = styled.div`
  display: flex;
  flex-direction: row;
`;

// 오른쪽 Input란 Input
const StCommentInput = styled.input`
  border: 1px solid #dbdbdb;
  width: 300px;
  height: 49px;
`;

// 오른쪽 Input란 버튼
const StCommentInputBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #50586c;
  color: white;
  width: 99px;
  cursor: pointer;
`;

export default function Detail() {
  return (
    <StDetailContainer>
      <StDetailBox>
        <StDetailLeftBox>
          <StDetailImage src={`https://upload.wikimedia.org/wikipedia/ko/thumb/d/d4/%ED%8E%AD%EC%88%98.jpg/300px-%ED%8E%AD%EC%88%98.jpg`}></StDetailImage>

          <StDetailPriceBox>
            <StDetailMin>최저 입찰가 : 1,200원</StDetailMin>
            <StDetailMax>현재 최대 입찰가 : 1,000,000원</StDetailMax>
          </StDetailPriceBox>

          <StDetailPriceBox>
            <StDetailInputPrice type={`number`} placeholder={`입찰가격 입력...`}></StDetailInputPrice>
            <StDetailBidding>입찰하기</StDetailBidding>
          </StDetailPriceBox>
        </StDetailLeftBox>

        <StDetailRightBox>
          <StDetailIdBox>
            <StDetailId>
              <StDetailId>
                <b>ID : 해물탕좋아해요</b>
              </StDetailId>
            </StDetailId>

            <StDetailIdBtnBox>
              <StDetailIdBtn>수정하기</StDetailIdBtn>
              <p>{'\u00A0'}</p>
              <StDetailIdBtn>삭제하기</StDetailIdBtn>
            </StDetailIdBtnBox>
          </StDetailIdBox>

          <StLine />
          <StDetailBodyBox>
            <StDetailBody>
              길가다 주운 펭수 팝니다. <br />
              밥은 주로 송로버섯을 먹습니다. <br />
              결벽증 있습니다. <br />
              먼지 하나라도 발견하면 집안에서 구르기 합니다. <br />
              <br />
            </StDetailBody>
            <StLine />
            <StDetailCommentList>
              <StDetailComment>
                <b>북극곰</b> 맛있겠다ㅋㅋ
              </StDetailComment>
              <StDetailComment>
                <b>조류심리학과박사</b> 100만원은 너무 비싼데
              </StDetailComment>
            </StDetailCommentList>
            <StCommentInputBox>
              <StCommentInput placeholder={`\u00A0댓글 입력...`}></StCommentInput>
              <StCommentInputBtn>댓글등록</StCommentInputBtn>
            </StCommentInputBox>
          </StDetailBodyBox>
        </StDetailRightBox>
      </StDetailBox>
    </StDetailContainer>
  );
}
