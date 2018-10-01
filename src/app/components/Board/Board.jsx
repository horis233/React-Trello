import React, {Component} from "react";
import { connect } from "react-redux";
import {Helmet} from "react-helmet";
import List from "./List";
import "./Board.scss";


class Board extends Component {

  render = () => {
    const { lists } =  this.props;
    return (<div className="board">
      <Helmet>
        <title>Board name | Trello</title>
      </Helmet>
      <div className="board-header">
        <h1 className="board-title">Board name</h1>
      </div>
      <div className="lists">
        {this.state.lists.map(list => <List key={list.id} list={list}/>)}
      </div>
    </div>);
  }
}

const mapStateToProps = state => {
  return {
    lists: state.lists
  };
};


export default connect(mapStateToProps)(Board);
