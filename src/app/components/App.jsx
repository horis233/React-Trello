// @flow
import * as React from "react";
import { Route, Link } from "react-router-dom";
import Board from "./Board/Board";
import Header from "./Header";
import Home from "./Home";
import "./App.scss";

const App = () => (
  <div>
    <Header/>

    <Route exact path="/" component={Home} />
    <Route path="/b/:id" component={Board} />
  </div>
);

export default App;
