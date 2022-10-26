import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ReadData, RequestCommentInput, RequestPriceInput, RequestSuccessBidInput, RequestDeletePost, RequestLikePost } from '../api/api';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { userID } from '../store/store';

export default function Detail() {
  const navigate = useNavigate();

  // useParams 주소값 ID 가져오기
  const { id } = useParams();
  // console.log('id', id);

  // queryClient
  const queryClient = useQueryClient();

  // useState 댓글 입력 정보 담기 useState
  const [comment, setComment] = useState('');

  const [price, setPrice] = useState('');

  // useQuery 상세 페이지 정보 가져오기
  const { data } = useQuery(['DetailData'], () => ReadData(id), {
    onSuccess: () => {},
  });
  console.log(data);

  // onChange 댓글 입력 정보 담기
  const onCommentInputHandler = (event) => {
    const { name, value } = event.target;
    setComment({ [name]: value });
  };

  // onChange 입찰 입력 정보 담기
  const onPriceInputHandler = (event) => {
    const { name, value } = event.target;
    setPrice({ [name]: value });
    console.log(price);
  };

  // useMuation 댓글 보내기
  const { mutate: commentMutate } = useMutation(RequestCommentInput, {
    onSuccess: () => {
      queryClient.invalidateQueries(['DetailData']);
    },
  });

  // 댓글 입력 버튼
  const onCommentInput = (id, comment) => {
    commentMutate({ id, comment });
  };

  // useMuation 댓글 보내기
  const { mutate: PriceInputMutate } = useMutation(RequestPriceInput, {
    onSuccess: () => {
      queryClient.invalidateQueries(['DetailData']);
    },
  });

  // 댓글 입력 버튼
  const onPriceInput = (id, price) => {
    PriceInputMutate({ id, price });
  };

  // useMuation 낙찰
  const { mutate: SuccessBidMutate } = useMutation(() => RequestSuccessBidInput(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['DetailData']);
    },
  });

  // 낙찰
  const onSuccessBid = () => {
    SuccessBidMutate();
  };

  // useMuation 게시글 삭제
  const { mutate: DeletePostMutate } = useMutation(() => RequestDeletePost(id), {
    onSuccess: (temp) => {
      queryClient.invalidateQueries(['DetailData']);
      console.log('SuccessDeletePost', temp);
      onSuccessPost();
    },
    onError: (temp) => {
      console.log('ErrorDeletePost', temp);
      onErrorPost();
    },
  });

  // 삭제
  const onDeletePost = () => {
    DeletePostMutate();
  };

  // 게시글 삭제 성공
  const onSuccessPost = () => {
    alert('삭제 성공');
    navigate('/');
  };
  // 게시글 삭제 실패
  const onErrorPost = () => {
    alert('삭제 실패');
  };

  // useMuation 관심있는 상품 등록
  const { mutate: LikePostMutate } = useMutation(() => RequestLikePost(id), {
    onSuccess: (temp) => {
      queryClient.invalidateQueries(['DetailData']);
      console.log('SuccessLikePost', temp);
    },
  });

  // 관심등록 버튼
  const onLikePost = () => {
    LikePostMutate();
  };

  // 수정하기 버튼
  const onModifyPost = (id) => {
    navigate(`/productmodify/${id}`);
  };

  // useMuation 댓글 삭제
  const { mutate: DeleteCommentMutate } = useMutation(() => RequestDeletePost(id), {
    onSuccess: (temp) => {
      queryClient.invalidateQueries(['DetailData']);
      console.log('SuccessDeleteComment', temp);
      // onSuccessPost();
    },
    onError: (temp) => {
      console.log('ErrorDeleteComment', temp);
      onErrorPost();
    },
  });

  // 댓글삭제 버튼
  const onDeleteComment = (id, commentid) => {
    DeleteCommentMutate(id, commentid);
  };

  return (
    <>
      {data !== undefined ? (
        <StDetailContainer>
          <StDetailBox>
            <StDetailLeftBox>
              <StDetailImage src={`https://upload.wikimedia.org/wikipedia/ko/thumb/d/d4/%ED%8E%AD%EC%88%98.jpg/300px-%ED%8E%AD%EC%88%98.jpg`}></StDetailImage>

              <StDetailPriceBox>
                <StDetailMin>최저 입찰가 : {data.data.lowPrice}원</StDetailMin>
                <StDetailMax>현재 최대 입찰가 : {data.data.highPrice}원</StDetailMax>
              </StDetailPriceBox>

              <StDetailInputBox>
                <StDetailInputPrice onChange={onPriceInputHandler} name='biddingPrice' type={`number`} placeholder={`입찰가격 입력...`}></StDetailInputPrice>
                <StDetailBidding
                  onClick={() => {
                    onPriceInput(id, price);
                  }}
                >
                  입찰하기
                </StDetailBidding>
              </StDetailInputBox>
            </StDetailLeftBox>

            <StDetailRightBox>
              <StDetailIdBox>
                <StDetailId>
                  <StDetailId>
                    <b>ID : {data.data.username}</b>
                  </StDetailId>
                </StDetailId>

                <StDetailIdBtnBox>
                  <StDetailIdBtn onClick={() => onSuccessBid(id)}>낙찰하기</StDetailIdBtn>
                  <p>{'\u00A0'}</p>
                  <StDetailIdBtn onClick={() => onModifyPost(id)}>수정하기</StDetailIdBtn>
                  <p>{'\u00A0'}</p>
                  <StDetailIdBtn onClick={() => onDeletePost(id)}>삭제하기</StDetailIdBtn>
                </StDetailIdBtnBox>
              </StDetailIdBox>

              <StLine />
              <StDetailBodyBox>
                <StDetailBodyTitleBox>
                  <StDetailBodyTitle>{data.data.title}</StDetailBodyTitle>
                  <StDetailBodyTitleLike
                    onClick={() => {
                      onLikePost();
                    }}
                  >
                    좋아요
                  </StDetailBodyTitleLike>
                </StDetailBodyTitleBox>

                <StDetailBody>{data.data.content}</StDetailBody>
                <StLine />
                <StDetailCommentList>
                  {data !== undefined
                    ? data.data.comments.map((comments) => {
                        return (
                          <StDetailComment>
                            <b>{comments.username}</b> {comments.comment}
                            <StDetailCommentDelete onClick={() => onDeleteComment(id, comments.commentid)}>삭제</StDetailCommentDelete>
                          </StDetailComment>
                        );
                      })
                    : null}
                </StDetailCommentList>
                <StCommentInputBox>
                  <StCommentInput name='comment' onChange={onCommentInputHandler} placeholder={`\u00A0댓글 입력...`}></StCommentInput>
                  <StCommentInputBtn
                    onClick={() => {
                      onCommentInput(id, comment);
                    }}
                  >
                    댓글등록
                  </StCommentInputBtn>
                </StCommentInputBox>
              </StDetailBodyBox>
            </StDetailRightBox>
          </StDetailBox>
        </StDetailContainer>
      ) : null}
    </>
  );
}

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
const StDetailLeftBox = styled.div`
  width: 600px;
`;

// 왼쪽 박스 이미지
const StDetailImage = styled.img`
  width: 100%;
  height: 86%;
  display: flex;
  object-fit: cover;
`;

// 왼쪽 박스 가격 박스
const StDetailPriceBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 7%;
`;

// 왼쪽 박스 최저가
const StDetailMin = styled.div`
  background-color: #ffdfde;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// 왼쪽 박스 최대가
const StDetailMax = styled.div`
  background-color: #6a7ba2;
  color: white;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StDetailInputBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 7.3%;
`;
// 왼쪽 박스 입찰가 입력란
const StDetailInputPrice = styled.input`
  border: none;
  background-color: #fcf6f5;
  width: 80%;

  font-size: 20px;
  text-align: center;
`;

// 왼쪽 박스 입찰 버튼
const StDetailBidding = styled.div`
  width: 20%;
  background-color: #7b9acc;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

// 디테일 박스 오른쪽 박스
const StDetailRightBox = styled.div`
  width: 400px;
`;

// 오른쪽 박스 ID 박스
const StDetailIdBox = styled.div`
  width: 400px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

// 오른쪽 박스 ID란
const StDetailId = styled.div`
  height: 50px;
  margin-left: 7px;
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

const StDetailBodyTitleBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
`;

// 오른쪽 Body란 Title 박스
const StDetailBodyTitle = styled.p`
  margin-left: 14px;
  margin-top: 10px;
  font-weight: bold;
  font-size: 20px;
`;

const StDetailBodyTitleLike = styled.button`
  margin-right: 270px;
  margin-top: 11px;
`;

// 오른쪽 Body란
const StDetailBody = styled.div`
  margin-left: 14px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

// 오른쪽 Body란 댓글리스트
const StDetailCommentList = styled.ul`
  width: 400px;
  height: 455px;
  overflow-y: auto;
  overflow-x: hidden;
  word-break: break-all;
`;

// 오른쪽 Body란 댓글
const StDetailComment = styled.li`
  width: 90%;
  margin-left: 14px;
  margin-top: 10px;
  /* margin-right: 30px; */
  list-style: none;
  overflow-y: auto;
  overflow-x: hidden;
  word-break: break-all;
`;

const StDetailCommentDelete = styled.button``;

// 오른쪽 Input란 박스
const StCommentInputBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 58px;
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

{
  /* <StDetailContainer>
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
      </StDetailContainer> */
}
