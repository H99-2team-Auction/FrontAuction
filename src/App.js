import Router from './router/Router';
import './App.css';
import { isLogin } from './store/store';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userID } from './store/store';

function App() {
  // useRecoilState 아이디 담기용
  const [recoilAppId, setRecoilAppId] = useRecoilState(userID);
  // useRecoilState 로그인 상태 여부
  const [AppLogin, setAppLogin] = useRecoilState(isLogin);

  // useEffect 아이디 담기
  useEffect(() => {
    const myid = localStorage.getItem('myID');
    setRecoilAppId(myid);
  });

  // useEffect 로그인 상태 담기
  useEffect(() => {
    if (localStorage.getItem('Access_Token') !== null) {
      setAppLogin(true);
    } else {
      setAppLogin(false);
    }
  }, [AppLogin]);

  return <Router />;
}

export default App;
