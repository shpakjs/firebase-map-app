import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SignOut from '../SignOut/SignOut';

const useStyles = makeStyles(theme => ({
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
      },
      li: {
        listStyle: 'none',
      },
    },
    appBar: {
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbar: {
      flexWrap: 'wrap',
    },
    toolbarTitle: {
      flexGrow: 1,
    },
    link: {
      margin: theme.spacing(1, 1.5),
    },
  }));
  
const Navigation = ({ authUser }) => (
  <div>{authUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const NavigationAuth = () => {
    const classes = useStyles();

    return(  
        <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            </Typography>
            <nav>
                <Link variant="button" color="textPrimary" to={ROUTES.HOME}>
                Home
                </Link>
                <Link variant="button" color="textPrimary" to={ROUTES.ACCOUNT} className={classes.link}>
                Account
                </Link>
                <Link variant="button" color="textPrimary" to={ROUTES.ADMIN} className={classes.link}>
                Admin
                </Link>
            </nav>
            <SignOut />
            </Toolbar>
        </AppBar>);
};

const NavigationNonAuth = () => {
  const classes = useStyles();

  return(  
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          </Typography>
          <Button color="primary" variant="outlined" to={ROUTES.SIGN_IN} className={classes.link}>
              Sign In
          </Button>
          <Button color="primary" variant="outlined" to={ROUTES.SIGN_UP} className={classes.link}>
              Sign Up
          </Button>
          </Toolbar>
      </AppBar>);
};
export default Navigation;