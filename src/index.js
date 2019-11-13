import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers/reducer';
import {Provider} from 'react-redux';

import App from './containers/AppContainer/AppContainer';

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
