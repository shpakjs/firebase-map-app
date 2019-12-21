import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {

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
  routes = () => this.db.ref('routes');
}

export default Firebase;