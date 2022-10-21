import Header from '../components/Header';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Home from '../pages/Home';
import Login from '../pages/Login';
export default function Router() {
  return (
    <>
      <Header />;
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
      ;
    </>
  );
}
