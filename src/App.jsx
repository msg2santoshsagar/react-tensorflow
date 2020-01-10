import React from 'react';
import './App.css';
import {Route, Router, Switch} from "react-router-dom";
import PageNotFoundContainer from "./containers/PageNotFoundContainer";
import {customHistory} from "./utils/history";
import HomeContainer from "./containers/HomeContainer";

function App() {
    return (
        <div className="App">
            <Router history={customHistory}>
                <Switch>
                    <Route exact path="/">
                        <HomeContainer/>
                    </Route>
                    <Route path="*">
                        <PageNotFoundContainer/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
