import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import slugify from 'slugify';
import shortid from 'shortid';
import ClickOutside from '../ClickOutside';

class BoardAdder extends Component {
	static propTypes = {
		userId: PropTypes.string.isRequired,
		history: PropTypes.object.isRequired,
		dispatch: PropTypes.func.isRequired
	};
	constructor() {
		super();
		this.state = { isOpen: false, text: '' };
	}

	toggleOpen = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	handleChange = (event) => {
		this.setState({ text: event.target.value });
	};

	handleSubmit = (event) => {
		// Dispatch action to put new empty board in redux store and db + push new url to history
		event.preventDefault();
		const { text } = this.state;
		if (text === '') {
			return;
		}
		const { dispatch, history, userId } = this.props;
		const boardId = shortid.generate();
		dispatch({
			type: 'ADD_BOARD',
			payload: {
				boardTitle: text,
				boardId,
				userId
			}
		});

		const urlSlug = slugify(text, { lower: true });
		history.push(`/b/${boardId}/${urlSlug}`);

		this.setState({ isOpen: false, text: '' });
	};

	handleKeyDown = (event) => {
		if (event.keyCode === 27) {
			this.setState({ isOpen: false });
		}
	};

	render = () => {
		const { isOpen, text } = this.state;
		return isOpen ? (
			<ClickOutside handleClickOutside={this.toggleOpen}>
				<form onSubmit={this.handleSubmit} className="board-adder">
					<input
						autoFocus
						className="submit-board-input"
						type="text"
						value={text}
						onKeyDown={this.handleKeyDown}
						onChange={this.handleChange}
						spellCheck={false}
					/>
					<input
						type="submit"
						value="Create board"
						className="submit-board-button"
						disabled={text === ''}
					/>
				</form>
			</ClickOutside>
		) : (
			<button onClick={this.toggleOpen} className="create-board-button">
				Create a new board...
			</button>
		);
	};
}

const mapStateToProps = (state) => ({
	userId: state.user ? state.user._id : 'guest'
});

export default connect(mapStateToProps)(BoardAdder);
