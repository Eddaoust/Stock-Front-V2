import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from '../../pages/Login';
import Registration from "../../pages/Registration";
import Appli from '../../pages/Appli';

function AppContainer() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/registration" component={Registration}/>
                <Route path="/app" component={Appli}/>
            </Switch>
        </Router>
    );
}

export default AppContainer;
