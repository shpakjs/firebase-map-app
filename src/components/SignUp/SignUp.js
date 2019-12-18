import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { withFirebase } from '../Firebase/context';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';
import styles from './SignUp.module.css';

const SignUp = () => (
    <div>
      <h1>SignUp</h1>
      <SignUpForm />
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

class SignUpFormBase extends React.Component {
    constructor(props){
        super(props);
        this.state = { ...INITIAL_STATE };
    }
    
    onSubmit = event => {
      const { username, email, passwordOne } = this.state;
      this.props.firebase
          .doCreateUserWithEmailAndPassword(email, passwordOne)
          .then(authUser => {
            // Create a user in your Firebase realtime database
            return this.props.firebase
              .user(authUser.user.uid)
              .set({
                username,
                email,
              });
          })
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
          })
          .catch(error => {
            this.setState({ error });
          });
        event.preventDefault();
      }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
          } = this.state;
        const isInvalid =
          passwordOne !== passwordTwo ||
          passwordOne === '' ||
          email === '' ||
          username === '';
        return (
        <Grid container component="main" className={styles.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={styles.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={styles.paper}>
            <Avatar className={styles.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <form className={styles.form} noValidate onSubmit={this.onSubmit}>
                <TextField
                variant="outlined"
                margin="normal"
                name="username"
                value={username}
                onChange={this.onChange}
                required
                fullWidth
                id="username"
                label="User name"
                autoComplete="login"
                autoFocus
                />
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={this.onChange}
                autoComplete="email"
                />
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                label="Password"
                type="password"
                id="passwordOne"
                />
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                label="Confirm password"
                type="password"
                id="passwordTwo"
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isInvalid}
                className={styles.submit}
                >
                Sign Up
                </Button>
                {error && <p>{error.message}</p>}
            </form>
            </div>
        </Grid>
        </Grid>);
    }
}

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);


export default SignUp;