import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ReadData, RequestCommentInput, RequestPriceInput, RequestSuccessBidInput, RequestDeletePost, RequestLikePost, RequestPostCommentDelete, RequestPostCommentModify } from '../api/api';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { postTitle, postBody, postPrice } from '../store/store';
import { useEffect } from 'react';

export default function Detail() {
  // 라우터 navigate
  const navigate = useNavigate();

  // useParams 주소값 ID 가져오기
  const { id } = useParams();
  // console.log('id', id);

  // queryClient
  const queryClient = useQueryClient();

  // useState 댓글 입력 정보 담기 useState
  const [comment, setComment] = useState('');

  // useState 입력된 가격 담기
  const [price, setPrice] = useState('');

  // useState 입찰가 콤마찍기용
  const [createData, setCreateData] = useState();
  const [modifiedData, setModifiedData] = useState();
  const [viewLowPrice, setViewLowPrice] = useState();
  const [viewHighPrice, setViewHighPrice] = useState();
  const [inputPrice, setInputPrice] = useState();

  // useRecoilState 수정할 때 제목, 내용, 가격 데이터 받아가기
  const [detailModifyPostTitle, setDetailModifyPostTitle] = useRecoilState(postTitle);
  const [detailModifyPostBody, setDetailModifyPostBody] = useRecoilState(postBody);
  const [detailModifyPostLowPrice, setDetailModifyPostLowPrice] = useRecoilState(postPrice);

  // useQuery GET 상세 페이지 정보 가져오기
  const { data } = useQuery(['DetailData'], () => ReadData(id), {
    onSuccess: () => {
      // 입찰가 콤마찍기용
      // const createA = data.data.createdAt;
      // const createB = data.data.createdAt;
      // const createASlice = createA.slice(0, 10);
      // const createBSlice = createB.slice(11, 19);
      // const modifiedA = data.data.modifiedAt;
      // const modifiedB = data.data.modifiedAt;
      // const modifiedASlice = modifiedA.slice(0, 10);
      // const modifiedBSlice = modifiedB.slice(11, 19);
      // setCreateData(createASlice + ' ' + createBSlice);
      // setModifiedData(modifiedASlice + ' ' + modifiedBSlice);
      // const createLowPrice = data.data.lowPrice;
      // const createHighPrice = data.data.highPrice;
      // const commaLowPrice = createLowPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      // const commaHighPrice = createHighPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      // setViewLowPrice(commaLowPrice);
      // setViewHighPrice(commaHighPrice);
    },
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });

  useEffect(() => {
    queryClient.invalidateQueries(['DetailData']);
  }, [data]);

  // onChange 댓글 입력 정보 담기
  const onCommentInputHandler = (event) => {
    const { name, value } = event.target;
    setComment({ [name]: value });
  };

  // onChange 입찰 입력 정보 담기
  const onPriceInputHandler = (event) => {
    const { name, value } = event.target;
    setPrice({ [name]: value });
  };

  // useMuation POST 댓글 입력
  const { mutate: commentMutate } = useMutation(RequestCommentInput, {
    onSuccess: () => {
      queryClient.invalidateQueries(['DetailData']);
    },
  });

  // 댓글 입력 버튼
  const onCommentInput = (id, comment) => {
    commentMutate({ id, comment });
  };

  // useMuation 입찰하기
  const { mutate: PriceInputMutate } = useMutation(RequestPriceInput, {
    onSuccess: () => {
      queryClient.invalidateQueries(['DetailData']);
    },
    onError: () => {
      alert('입찰 최대 가격보다 입찰가격이 낮습니다.');
    },
  });

  // 입찰하기 버튼
  const onPriceInput = (id, price) => {
    PriceInputMutate({ id, price });
  };

  // useMuation POST 낙찰하기
  const { mutate: SuccessBidMutate } = useMutation(() => RequestSuccessBidInput(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(['DetailData']);
    },
    onError: () => {
      alert('낙찰 불가능');
    },
  });

  // 낙찰하기 버튼
  const onSuccessBid = () => {
    SuccessBidMutate();
  };

  // useMuation DELETE 게시글 삭제
  const { mutate: DeletePostMutate } = useMutation(() => RequestDeletePost(id), {
    onSuccess: (temp) => {
      queryClient.invalidateQueries(['DetailData']);
      console.log('SuccessDeletePost', temp);
      onSuccessPost();
    },
    onError: (temp) => {
      console.log('ErrorDeletePost', temp);
      alert('삭제 불가능');
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

  // useMuation POST 관심있는 상품 등록
  const { mutate: LikePostMutate } = useMutation(() => RequestLikePost(id), {
    onSuccess: (temp) => {
      queryClient.invalidateQueries(['DetailData']);
      console.log('SuccessLikePost', temp);
    },
  });

  // 관심있는 상품 버튼
  const onLikePost = () => {
    LikePostMutate();
  };

  // 수정하기 버튼
  const onModifyPost = (title, content, lowPrice) => {
    const bucketTitle = title;
    const bucketContent = content;
    const bucketLowPrice = lowPrice;
    setDetailModifyPostTitle(bucketTitle);
    setDetailModifyPostBody(bucketContent);
    setDetailModifyPostLowPrice(bucketLowPrice);

    navigate(`/productmodify/${id}`);
  };

  // useMuation DELETE 댓글 삭제
  const { mutate: DeleteCommentMutate } = useMutation(RequestPostCommentDelete, {
    onSuccess: (temp) => {
      queryClient.invalidateQueries(['DetailData']);
      console.log('SuccessDeleteComment', temp);
      alert('삭제 성공');
    },
    onError: (temp) => {
      console.log('ErrorDeleteComment', temp);
      alert('삭제 실패');
    },
  });

  // 댓글삭제 버튼
  const onDeleteComment = (id, commentid) => {
    DeleteCommentMutate({ id, commentid });
  };

  // useMuation PUT 댓글 수정
  const { mutate: ModifyCommentMutate } = useMutation(RequestPostCommentModify, {
    onSuccess: (temp) => {
      queryClient.invalidateQueries(['DetailData']);
      alert('수정 성공');
    },
    onError: (temp) => {
      alert('수정 실패');
    },
  });

  // 댓글수정 버튼
  const onModifyComment = (id, commentid) => {
    const commentModify = prompt('수정할 댓글 내용을 입력하세요');
    const finalCommentModify = { comment: commentModify };
    console.log(finalCommentModify);
    ModifyCommentMutate({ id, commentid, finalCommentModify });
  };

  return (
    <>
      <StGap />
      {data !== undefined ? (
        <StDetailContainer>
          <StDetailBox>
            <StDetailLeftBox>
              <StDetailImage src={`https://jaesa-bucket.s3.ap-northeast-2.amazonaws.com/${data.data.path}`}></StDetailImage>

              <StDetailPriceBox>
                <StDetailMin>최저 입찰가 : {data.data.lowPrice}원</StDetailMin>
                <StDetailMax>현재 최대 입찰가 : {data.data.highPrice}원</StDetailMax>
              </StDetailPriceBox>

              <StDetailInputBox>
                {data.data.isSold === false ? (
                  <>
                    <StDetailInputPrice value={inputPrice} onChange={onPriceInputHandler} name='biddingPrice' type={`number`} placeholder={`입찰가격 입력...`}></StDetailInputPrice>
                    <StDetailBidding
                      onClick={() => {
                        onPriceInput(id, price);
                      }}
                    >
                      입찰하기
                    </StDetailBidding>
                  </>
                ) : (
                  <StDetailSuccessBid>낙찰 완료</StDetailSuccessBid>
                )}
              </StDetailInputBox>
            </StDetailLeftBox>

            <StDetailRightBox>
              <StDetailIdBox>
                <StDetailId>
                  <StDetailId>
                    <b>ID : {data.data.username}</b>
                  </StDetailId>
                </StDetailId>
                {localStorage.getItem('myID') === data.data.username ? (
                  <StDetailIdBtnBox>
                    <StDetailIdBtn onClick={() => onSuccessBid(id)}>낙찰하기</StDetailIdBtn>
                    <p>{'\u00A0'}</p>
                    <StDetailIdBtn onClick={() => onModifyPost(data.data.title, data.data.content, data.data.lowPrice)}>수정하기</StDetailIdBtn>
                    <p>{'\u00A0'}</p>
                    <StDetailIdBtn onClick={() => onDeletePost(id)}>삭제하기</StDetailIdBtn>
                  </StDetailIdBtnBox>
                ) : null}
              </StDetailIdBox>

              <StLine />
              <StDetailBodyBox>
                <StDetailBodyTitleBox>
                  <StDetailBodyTitle>{data.data.title}</StDetailBodyTitle>
                  <StDetailBodyLikeBox>
                    <StDetailBodyLikeBtn
                      onClick={() => {
                        onLikePost();
                      }}
                    >
                      Like + {data.data.likeCnt}
                    </StDetailBodyLikeBtn>
                  </StDetailBodyLikeBox>
                </StDetailBodyTitleBox>

                <StDetailBody>{data.data.content}</StDetailBody>
                <StDetailBodyBiddingCnt>현재 입찰중인 유저 : {data.data.participants.length}</StDetailBodyBiddingCnt>
                <StDetailBodyCreateDate>게시글 생성 날짜 : {createData}</StDetailBodyCreateDate>
                <StDetailBodyModifyDate>게시글 수정 날짜 : {modifiedData}</StDetailBodyModifyDate>
                <StLine />
                <StDetailCommentList>
                  {data !== undefined
                    ? data.data.comments.map((comments) => {
                        return (
                          <StDetailComment>
                            <b>{comments.username}</b> {comments.comment}
                            {localStorage.getItem('myID') === comments.username ? (
                              <>
                                <StDetailCommentModify onClick={() => onModifyComment(id, comments.id)}>수정</StDetailCommentModify>
                                <StDetailCommentDelete onClick={() => onDeleteComment(id, comments.id)}>삭제</StDetailCommentDelete>{' '}
                              </>
                            ) : null}
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

const StGap = styled.div`
  margin-top: 120px;
`;

// 전체 박스 컨테이너
const StDetailContainer = styled.div`
  margin: 0 auto;
  width: 1000px;
`;
// 디테일 박스
const StDetailBox = styled.div`
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  width: 1000px;
  height: 684px;
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
  cursor: default;
`;

// 왼쪽 박스 최대가
const StDetailMax = styled.div`
  background-color: #6a7ba2;
  color: white;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
`;

// 입찰하기란 박스
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
  &:hover {
    background-color: #02343f;
  }
`;

// 낙찰 완료
const StDetailSuccessBid = styled.div`
  width: 100%;
  height: 100%;
  background-color: #ed6f63;
  color: #2d2926;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
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
  cursor: default;
`;

// 오른쪽 박스 ID란 낙찰하기/수정하기/삭제하기 버튼 박스
const StDetailIdBtnBox = styled.div`
  display: flex;
  margin-left: 45px;
`;

// 오른쪽 ID ID란 수정하기/삭제하기
const StDetailIdBtn = styled.button`
  border: 1px solid #dbdbdb;
  height: 25px;
  width: 70px;
  background-color: #fbeaeb;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    background-color: #2e3c7e;
    color: #fbeaeb;
  }
`;

// 오른쪽 Body란 Body 박스
const StDetailBodyBox = styled.div``;

// 오른쪽 Box란 Title 박스
const StDetailBodyTitleBox = styled.div`
  width: 400px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
`;

// 오른쪽 Body란 Title 박스
const StDetailBodyTitle = styled.p`
  width: 75%;
  margin-left: 14px;
  margin-top: 10px;
  font-weight: bold;
  font-size: 20px;
  cursor: default;
`;

const StDetailBodyLikeBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 130px;
  margin-top: 3px;
`;
// 오른쪽 Body란 좋아요 버튼
const StDetailBodyLikeBtn = styled.div`
  height: 25px;
  margin-top: 10px;
  width: 65px;
  border: 1px solid black;
  border-radius: 25px;
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffe8f5;
  color: #9000ff;
  cursor: pointer;
  &:hover {
    background-color: #9000ff;
    color: #ffe8f5;
  }
`;

const StDetailBodyBiddingCnt = styled.p`
  margin-top: 2px;
  margin-left: 13px;
  font-size: 11px;
`;

const StDetailBodyCreateDate = styled.p`
  margin-top: 2px;
  margin-left: 13px;
  font-size: 11px;
`;

const StDetailBodyModifyDate = styled.p`
  margin-top: 2px;
  margin-left: 13px;
  font-size: 11px;
  margin-bottom: 10px;
`;

// 오른쪽 Body란
const StDetailBody = styled.div`
  margin-left: 14px;
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: default;
`;

// 오른쪽 Body란 댓글리스트
const StDetailCommentList = styled.ul`
  width: 400px;
  height: 395px;
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
  cursor: default;
`;

// 오른쪽 Body란 댓글 삭제
const StDetailCommentDelete = styled.button`
  margin-left: 5px;
  border: none;
  color: #64c8fa;
  cursor: pointer;
  &:hover {
    color: #0928f2;
  }
`;

// 오른쪽 Body란 댓글 수정
const StDetailCommentModify = styled.button`
  margin-left: 5px;
  border: none;
  color: #64c8fa;
  cursor: pointer;
  &:hover {
    color: #0928f2;
  }
`;

// 오른쪽 Input란 박스
const StCommentInputBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 45px;
`;

// 오른쪽 Input란 Input
const StCommentInput = styled.input`
  border: 1px solid #dbdbdb;
  width: 400px;
  height: 49px;
  margin-top: 3.1px;
`;

// 오른쪽 Input란 버튼
const StCommentInputBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e2d3f3;
  color: #013dc4;
  font-weight: bold;
  width: 100px;
  height: 50px;
  margin-top: 3px;
  cursor: pointer;
  border: 1px solid #dbdbdb;

  &:hover {
    background-color: #013dc4;
    color: #e2d3f3;
  }
`;
