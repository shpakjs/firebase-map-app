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
import { withFirebase } from '../../hoc/withFirebase';
import { Link, withRouter } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { compose } from 'recompose';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


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

const SignUpForm = compose(
    withRouter,
    withFirebase,
  )(SignUpFormBase);

class SignUpFormBase extends React.Component {
    constructor(props){
        super(props);
        this.classes = useStyles();
        this.state = { ...INITIAL_STATE };
      }
    
    onSubmit = event => {
        const { username, email, passwordOne } = this.state;
        this.props.firebase
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
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
        };

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
        <Grid container component="main" className={this.classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={this.classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={this.classes.paper}>
            <Avatar className={this.classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <form className={this.classes.form} noValidate onSubmit={this.onSubmit}>
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
                className={this.classes.submit}
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

export default SignUp;