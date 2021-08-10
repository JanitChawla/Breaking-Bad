import React, { Fragment } from "react";
import Header from "./Header";
import Home from "./Home";
import Detail from "./Detail";
import store from "../store";
import { Provider } from "react-redux";
import {
  HashRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Spotify from "./spotify";

const App = () => {
        return (
            <Provider store={store}>
                <Router>
                    <Fragment>
                        <Header />
                        <Spotify />
                        <div className="container">
                            <br />
                            <br />
                            <div className="col-md-12">
                                <Switch>
                                    <Route exact path="/" render={() => <Home />}/>
                                    <Route exact path="/detail" render={() => <Detail />}/>
                                </Switch>
                            </div>
                        </div>
                    </Fragment>
                </Router>
            </Provider>
        )
    }

export default App;