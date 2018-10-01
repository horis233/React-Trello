// @flow
import React, {Component} from "react";
import {Helmet} from "react-helmet";
import List from "./List";
import "./Board.scss";

type State = {
  lists: Array < {
    title: string,
    id: string,
    cards: Array < {
      title: string,
      id: string
    } >
  } >
};

class Board extends Component < {},
State > {
  constructor() {
    super();
    this.state = {
      lists: [
        {
          title: "TODO Big picture",
          id: "1",
          cards: [
            {
              title: "Inspect how trello deals with loading boards, images",
              id: "2",
            }, {
              title: "Make skeleton structure of whatever",
              id: "3",
            }
          ]
        }, {
          title: "TODO details",
          id: "4",
          cards: [
            {
              title: "Do some stuff",
              id: "5",
            }, {
              title: "Maybe a really really long one: How should I manage board state, and generally state for components that are the same but have different data?",
              id: "6",
            }
          ]
        }
      ]
    };
  }
  render = () => (<div className="board">
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

export default Board;
