import React, { Component } from "react";
import { Helmet } from "react-helmet";	import { Helmet } from "react-helmet";
import List from "./List";
 class Board extends Component {	class Board extends Component {
  constructor() {
    super();
    this.state = {
      lists: [
        {
          title: "TODO Big picture",
          cards: [
            {
              title: "Inspect how trello deals with loading boards, images"
            },
            { title: "Make skeleton structure of whatever" }
          ]
        }
      ]
    };
  }
  render = () => (	  render = () => (
    <div className="board">	    <div className="board">
      <Helmet>	      <Helmet>
        <title>Board name | Trello</title>	        <title>Board name | Trello</title>
      </Helmet>	      </Helmet>
      <h1>Hello its me your board</h1>	      {this.state.lists.map(list => <List list={list} />)}
    </div>	    </div>
  );	  );
}	}
