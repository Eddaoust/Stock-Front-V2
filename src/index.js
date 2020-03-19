import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import reducer from './reducers/reducer';
import './index.css';
import {Provider} from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import App from './containers/AppContainer/AppContainer';

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

const font = "'Comfortaa'";
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#2C58B5',
        },
        secondary: {
            main: '#42CAA4',
        }
    },
    typography: {
        fontFamily: font,
        h6: {
            fontSize: 35,
            fontWeight: "bold",
        }
    },
});


ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </MuiThemeProvider>
    , document.getElementById('root'));
