// @flow
import * as React from "react";
import {connect} from "react-redux";
import FaPencil from "react-icons/lib/fa/pencil";
import ClickOutside from "./ClickOutside";
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
  cardInEdit:
    ?string,
  newCardTitle: string
};

class List extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      cardComposerIsOpen: false,
      cardInEdit: null,
      newCardTitle: ""
    };
  }

  toggleCardComposer = () => {
    this.setState({
      cardComposerIsOpen: !this.state.cardComposerIsOpen
    });
  };

  handleCardComposerChange = (event
  : {
    target: {
      value: string
    }
  }) => {
    this.setState({newCardTitle: event.target.value});
  };

  handleKeyDown = (event
  : SyntheticEvent<>) => {
    if (event.keyCode === 13) {
      this.handleSubmitCard(event);
    }
  };

  openCardEditor = (id) => {
    this.setState({cardInEdit: id});
  }

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
    const {cardComposerIsOpen, cardInEdit, newCardTitle} = this.state;
    return (<div className="list">
      <div className="list-title">{list.title}</div>
      {
        cards.map(card => (<div key={card.id} className="card-title">
          {
            cardInEdit !== card.id
              ? (<> < span > {
                card.title
              }</span> < button onClick = {
                () => this.openCardEditor(card.id)
              }
              className = "edit-card-button" > <FaPencil/>
            </button>
          </>)
              : (<Textarea autoFocus="autoFocus" useCacheForDOMMeasurements="useCacheForDOMMeasurements" minRows={3} value="hej"/>)
          }
        </div>))
      }
      {
        cardComposerIsOpen
          ? (<ClickOutside handleClickOutside={this.toggleCardComposer}>
            <form onSubmit={this.handleSubmitCard}>
              <Textarea autoFocus="autoFocus" useCacheForDOMMeasurements="useCacheForDOMMeasurements" minRows={3} onChange={this.handleCardComposerChange} onKeyDown={this.handleKeyDown} value={newCardTitle}/>
              <input type="submit" value="Add" className="submit-card-button" disabled={newCardTitle === ""}/>
            </form>
          </ClickOutside>)
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
