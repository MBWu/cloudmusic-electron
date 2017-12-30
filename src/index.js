import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {HashRouter} from 'react-keeper';
import {Provider} from 'react-redux';

import {store} from './component/store.js';


ReactDOM.render(<Provider store={store}><HashRouter><App /></HashRouter></Provider>, document.getElementById('root'));
registerServiceWorker();
