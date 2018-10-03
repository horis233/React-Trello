// @flow
import * as React from "react";
import { Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Board from "./Board/Board";
import "./App.scss";

const App = () => (
  <div>
    <Header />
    <Route exact path="/" component={Home} />
    <Route path="/b/:boardId" component={Board} />
  </div>
);
export default App;
