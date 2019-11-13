import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from '../../pages/Login';
import Registration from "../../pages/Registration";
import Appli from '../../pages/Appli';

function AppContainer() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/registration" component={Registration}/>
                <Route path="/app" component={Appli}/>
            </Switch>
        </BrowserRouter>
    );
}

export default AppContainer;
