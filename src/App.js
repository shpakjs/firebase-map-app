import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import SignUpPage from './components/SignUp/SignUp';
import SignInPage from './components/SignIn/SignIn';
import PasswordForgetPage from './components/ForgotPassword/ForgotPassword';
import HomePage from './components/Home/Home';
import AccountPage from './components/Account/Account';
import AdminPage from './components/Admin/Admin';
import * as ROUTES from './constants/routes';
const App = () => (
  <Router>
    <div>
      <Navigation />
      <hr />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
    </div>
  </Router>
);

export default App;


