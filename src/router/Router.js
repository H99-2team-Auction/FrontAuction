import Header from '../components/Header';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Detail from '../pages/Detail';
import Mypage from '../pages/Mypage';
import SuccessBid from '../pages/mypage/Successbid';
import Bidding from '../pages/mypage/Bidding';
import LikeProduct from '../pages/mypage/Likeproduct';
import ProductRegist from '../pages/ProductRegist';
import ProductModify from '../pages/ProductModify';
export default function Router() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/detail/:id' element={<Detail />} />
        <Route path='/productregist' element={<ProductRegist />} />
        <Route path='/productmodify/:id' element={<ProductModify />} />
        <Route path='/mypage' element={<Mypage />}>
          <Route path='successbid' element={<SuccessBid />} />
          <Route path='bidding' element={<Bidding />} />
          <Route path='likeproduct' element={<LikeProduct />} />
        </Route>
      </Routes>
    </>
  );
}
