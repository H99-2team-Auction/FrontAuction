import Router from './router/Router';
import { useEffect } from 'react';
import './App.css';
import { useRecoilState } from 'recoil';
import { isLogin } from './store/store';

function App() {
  const [AppLogin, setAppLogin] = useRecoilState(isLogin);
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
