import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import * as ROUTES from '../../constants/routes';
import styles from './SignIn.module.css';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase/context';
import { Link, withRouter } from 'react-router-dom';

const INITIAL_STATE = {
    email: '',
    password: '',
  };


class SignInForm extends React.Component {
    constructor(props){
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { email, password } = this.state;
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
            this.setState({ error });
            });
        event.preventDefault();
    };
    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            email,
            password,
            error,
        } = this.state;
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
                    <form className={styles.form} noValidate onSubmit={this.onSubmit.bind(this)}>
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={this.onChange}
                        value={email}
                        autoFocus
                        />
                        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        onChange={this.onChange}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        autoComplete="current-password"
                        />
                        {error && <p>{error.message}</p>}
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={styles.submit}
                        >
                        Sign In
                        </Button>
                        <Grid container>
                        <Grid item xs>
                            <Link to={ROUTES.PASSWORD_FORGET} variant="body2">
                            Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to={ROUTES.SIGN_UP} variant="body2">
                            {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                        </Grid>
                    </form>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

const SignIn = compose(
    withRouter,
    withFirebase)(SignInForm);

export default SignIn;