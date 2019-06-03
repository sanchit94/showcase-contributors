import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-less/semantic.less';

import Root from './Root';
import { HashRouter } from "react-router-dom";

import App from './components/App';
import * as serviceWorker from './serviceWorker';

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
