import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './Layout/Layout';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import RestrictedRoute from './RestrictedRoute/RestrictedRoute';
import HomePage from '../pages/HomePage/HomePage';
import AuthPage from '../pages/AuthPage/AuthPage';
import WelcomePage from 'pages/WelcomePage/WelcomePage';

export const App = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<WelcomePage />} />
          <Route path='auth' element={<AuthPage />} />
          <Route path='dashboard/:userType' element={<PrivateRoute component={<HomePage />} />} />
          <Route path='*' element={<RestrictedRoute component={WelcomePage} />} />
        </Route>
      </Routes>
    </>
  );
};
