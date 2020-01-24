import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyCXCqE0vo5gB7dg2CL7vmJWpyXf_vsHPno',
  authDomain: 'my-map-app.firebaseapp.com',
  databaseURL: 'https://mymapapp-a1df6.firebaseio.com',
  projectId: 'mymapapp-a1df6',
  storageBucket: 'https://mymapapp-a1df6.appspot.com',
  messagingSenderId: 838680990425,
};
class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }
  
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();
    
  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  addRoute = route => {
    return this.route(route.id).set({
        'name': route.name
      });
  }

  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref('users');

  route = rid => this.db.ref(`routes/${rid}`);
  deleteRoute = rid => {
    let route = this.db.ref(`routes/${rid}`);
    route.remove();
  } 
  routes = () => this.db.ref('routes');

  userFavourites = uid => {
    var ref = this.db().ref('favourites');
    ref.orderByChild('userid').equalTo(uid).on("child_added", function(snapshot) {
      console.log(snapshot.key);
    });
  } 
  favourite = fid => this.db.ref(`favourites/${fid}`);
  addToFavourites = (rid, uid, favourite) => {
    return this.favourite(favourite.id).set({
      'userId': uid,
      'routeId': rid
    });
  }
  removeFromFavourites = fid => {
    let favourite = this.db.ref(`favourites/${fid}`);
    favourite.remove();
  } 
}

export default Firebase;