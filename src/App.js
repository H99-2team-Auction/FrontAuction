import Router from './router/Router';
import './App.css';
import { isLogin } from './store/store';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userID } from './store/store';
function App() {
  const [recoilAppId, setRecoilAppId] = useRecoilState(userID);
  const [AppLogin, setAppLogin] = useRecoilState(isLogin);

  useEffect(() => {
    const myid = localStorage.getItem('myID');
    setRecoilAppId(myid);
  });

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
