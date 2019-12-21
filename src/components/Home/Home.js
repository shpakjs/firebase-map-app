import React from 'react';
import  { FirebaseContext } from '../Firebase';
import RouteList from '../RouteList/RouteList';
import Map from '../Map/Map';
import {Redirect} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
const styles={
  height: '100vh'
};

const Home = (props) => (
  <FirebaseContext.Consumer>
    {
      firebase => {
        if(!props.authUser) return <Redirect to="/signin" />;
        else return <div >
            <Grid container spacing={0} >
            <Grid item xs={3}>
              <Paper style={styles}><RouteList /></Paper>
            </Grid>
            <Grid item xs={9}>
              <Paper style={styles}><Map /></Paper>
            </Grid>
          </Grid>
        </div>;
    }}
  </FirebaseContext.Consumer>
);
export default Home;