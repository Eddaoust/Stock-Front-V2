import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
// Persist react state after page refresh
import {persistStore, persistReducer} from "redux-persist";
import storageSession from 'redux-persist/es/storage/session'
import {PersistGate} from "redux-persist/lib/integration/react";

import reducer from './reducers/reducer';
import './index.css';
import {Provider} from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import App from './containers/AppContainer/AppContainer';


const persistConfig = {
    key: 'root',
    storage: storageSession,
};
const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(persistedReducer, applyMiddleware(thunkMiddleware));
const persistor = persistStore(store);

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
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </MuiThemeProvider>
    , document.getElementById('root'));
