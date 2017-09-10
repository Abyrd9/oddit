import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import store from './store';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyD1wyQdTBD-621KfTJAJaSmcUUrYnok_MI",
  authDomain: "oddit-5fc6b.firebaseapp.com",
  databaseURL: "https://oddit-5fc6b.firebaseio.com",
  projectId: "oddit-5fc6b",
  storageBucket: "oddit-5fc6b.appspot.com",
  messagingSenderId: "567284884542"
};
firebase.initializeApp(config);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root')
);
registerServiceWorker();
