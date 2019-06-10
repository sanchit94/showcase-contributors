import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-less/semantic.less';

import Root from './Root';
import { HashRouter } from "react-router-dom";
import * as firebase from 'firebase';

import App from './components/App';
import * as serviceWorker from './serviceWorker';

const firebaseConfig = {
    apiKey: "AIzaSyAj3JWUu8PeYi3OWuWqt2ghT7XzN0WqQvk",
    authDomain: "roadmap-714c8.firebaseapp.com",
    databaseURL: "https://roadmap-714c8.firebaseio.com",
    projectId: "roadmap-714c8",
    storageBucket: "roadmap-714c8.appspot.com",
    messagingSenderId: "408935502660",
    appId: "1:408935502660:web:d6ea7551b3fd0d08"
  };

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <Root>
        <HashRouter>
            <App />
        </HashRouter>
    </Root>,
    document.getElementById('root')
    );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
