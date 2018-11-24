import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class BoardTitle extends Component {
	static propTypes = {
		boardTitle: PropTypes.string.isRequired,
		boardId: PropTypes.string.isRequired,
		dispatch: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			newText: props.boardTitle
		};
	}

	handleClick = () => {
		this.setState({ isOpen: true });
	};

	handleChange = (event) => {
		this.setState({ newText: event.target.value });
	};

	submitTitle = () => {
		const { dispatch, boardId, boardTitle } = this.props;
		const { newText } = this.state;
		if (newText === '') return;
		if (boardTitle !== newText) {
			dispatch({
				type: 'EDIT_BOARD_TITLE',
				payload: {
					boardTitle: newText,
					boardId
				}
			});
		}
		this.setState({ isOpen: false });
	};

	revertTitle = () => {
		const { boardTitle } = this.props;
		this.setState({ newText: boardTitle, isOpen: false });
	};

	handleKeyDown = (event) => {
		if (event.keyCode === 13) {
			this.submitTitle();
		} else if (event.keyCode === 27) {
			this.revertTitle();
		}
	};

	handleFocus = (event) => {
		event.target.select();
	};

	render() {
		const { isOpen, newText } = this.state;
		const { boardTitle } = this.props;
		return isOpen ? (
			<input
				autoFocus
				value={newText}
				type="text"
				onKeyDown={this.handleKeyDown}
				onChange={this.handleChange}
				onBlur={this.revertTitle}
				onFocus={this.handleFocus}
				className="board-text-input"
				spellCheck={false}
			/>
		) : (
			<button className="board-text-button" onClick={this.handleClick}>
				<h1 className="board-text">{boardTitle}</h1>
			</button>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const { boardId } = ownProps.match.params;
	return {
		boardTitle: state.boardsById[boardId].text,
		boardId
	};
};

export default withRouter(connect(mapStateToProps)(BoardTitle));
