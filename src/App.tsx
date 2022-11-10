import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import RequireAuth from './components/RequireAuth';
import CountryPage from './pages/countries/[id]/CountryPage';
import IndexPage from './pages/countries/index/IndexPage';
import LoginPage from './pages/login';

import '../src/styles/global.scss';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<RequireAuth redirectTo="/" reverse />}>
        <Route index element={<LoginPage />} />
      </Route>
      <Route path="/" element={<RequireAuth redirectTo="/login" />}>
        <Route
          element={
            <>
              <Header />
              <Outlet />
            </>
          }
        >
          <Route path="/" element={<IndexPage />} />
          <Route path="details/:alphaCode" element={<CountryPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
