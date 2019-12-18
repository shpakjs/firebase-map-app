import React from 'react';
import  { FirebaseContext } from '../Firebase';
import RouteList from '../RouteList/RouteList';
import Map from '../Map/Map';

const Home = () => (
  <FirebaseContext.Consumer>
    {firebase => {
      return <div>
        <RouteList />
        <Map />
        </div>
    }}
  </FirebaseContext.Consumer>
);
export default Home;