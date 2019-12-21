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
import { withFirebase } from './components/Firebase/context';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      authUser: null,
    };
  }
  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authUser => {
        authUser
          ? this.setState({ authUser, loading: false })
          : this.setState({ authUser: null, loading: false });
      },
    );
  }
  componentWillUnmount() {
    this.listener();
  }
  render() {
    return(<Router>
      {this.state.loading 
      ? <div>Loading</div>
      :<div>
        <Navigation authUser={this.state.authUser}/>
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
        <Route exact path={ROUTES.HOME} render = { () => <HomePage authUser={this.state.authUser}/> } />
        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
        <Route path={ROUTES.ADMIN} component={AdminPage} />
      </div>}
    </Router>
  )}
}
export default withFirebase(App);


