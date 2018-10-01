// @flow
import * as React from "react";
import {connect} from "react-redux";
import NewCardForm from "./NewCardForm";
import Textarea from "react-textarea-autosize";
import shortid from "shortid";

type Props = {
  list: {
    id: string,
    title: string
  },
  cards: Array < {
    title: string,
    id: string
  } >,
  dispatch: ({type: string}) => void
};

type State = {
  cardComposerIsOpen: boolean,
  newCardTitle: string
};

class List extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      cardComposerIsOpen: false,
      newCardTitle: ""
    };
  }

  toggleCardComposer = () => {
    this.setState({
      cardComposerIsOpen: !this.state.cardComposerIsOpen
    });
  };

  handleCardComposerChange = (event : {
    target: {
      value: string
    }
  }) => {
    this.setState({newCardTitle: event.target.value});
  };

  handleKeyDown = (event : SyntheticEvent<>) => {
    if (event.keyCode === 13) {
      this.handleSubmitCard(event);
    }
  };

  handleSubmitCard = event => {
    event.preventDefault();
    const {newCardTitle} = this.state;
    const {list, dispatch} = this.props;
    if (newCardTitle === "")
      return;
    dispatch({
      type: "ADD_CARD",
      payload: {
        cardTitle: newCardTitle,
        cardId: shortid.generate(),
        listId: list.id
      }
    });
    this.setState({newCardTitle: "", cardComposerIsOpen: false});
  };

  render = () => {
    const {cards, list} = this.props;
    const {cardComposerIsOpen, newCardTitle} = this.state;
    return (<div className="list">
      <div className="list-title">{list.title}</div>
      {
        cards.map(card => (<div key={card.id} className="card-title">
          {card.title}
        </div>))
      }
      {
        cardComposerIsOpen
          ? (<NewCardForm toggleCardComposer={this.toggleCardComposer} newCardTitle={newCardTitle} handleCardComposerChange={this.handleCardComposerChange} handleKeyDown={this.handleKeyDown} handleSubmitCard={this.handleSubmitCard}/>)
          : (<button onClick={this.toggleCardComposer} className="open-composer-button">
            Add a card...
          </button>)
      }
    </div>);
  };
}

const mapStateToProps = (state, ownProps) => ({
  cards: ownProps.list.cards.map(cardId => state.cards[cardId])
});

export default connect(mapStateToProps)(List);
