import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import slugify from "slugify";
import classnames from "classnames";
import Header from "../Header/Header";
import BoardAdder from "./BoardAdder";
import "./Home.scss";

class Home extends Component {
  static propTypes = {
    boards: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    history: PropTypes.object.isRequired
  };
  render = () => {
    const { boards, listsById, history } = this.props;
    return (
      <>
        <Helmet>
          <title>Home | kanban.live</title>
        </Helmet>
        <Header />
        <div className="home">
          <div className="main-content">
            <h1>Boards</h1>
            <div className="boards">
              {boards.map(board => (
                <Link
                  key={board._id}
                  className={classnames("board-link", board.color)}
                  to={`/b/${board._id}/${slugify(board.title, {
                    lower: true
                  })}`}
                >
                  <div className="board-link-title">{board.title}</div>
                  <div className="mini-board">
                    {board.lists.map(listId => (
                      <div
                        key={listId}
                        className="mini-list"
                        style={{
                          height: `${Math.min(
                            (listsById[listId].cards.length + 1) * 18,
                            100
                          )}%`
                        }}
                      />
                    ))}
                  </div>
                </Link>
              ))}
              <BoardAdder history={history} />
            </div>
          </div>
        </div>
      </>
    );
  };
}
const mapStateToProps = state => ({
  boards: Object.values(state.boardsById),
  listsById: state.listsById
});
export default connect(mapStateToProps)(Home);