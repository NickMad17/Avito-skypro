import { Routes, Route } from 'react-router-dom';

import { Layout, LayoutAuth } from '@layouts/';
import {
  SignIn, SignUp, Home, Adv, Profile, SellerProfile
} from '@pages/';
import { RequireAuth } from '@hocs/';


export const AppRouter = () => (
  <Routes>
    <Route element={ <Layout /> }>
      <Route index element={ <Home /> } path="/" />
      <Route element={ <Adv /> } path="/adv/:id" />
      <Route element={ <SellerProfile /> } path="/profile-seller/:id" />
      <Route element={ <RequireAuth /> }>
        <Route element={ <Profile /> } path="/profile" />
      </Route>
    </Route>
    <Route element={ <LayoutAuth /> }>
      <Route element={ <SignIn /> } path="/login" />
      <Route element={ <SignUp /> } path="/register" />
    </Route>
  </Routes>
);
