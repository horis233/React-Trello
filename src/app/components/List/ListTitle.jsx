import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';
import { Button, Wrapper, Menu, MenuItem } from 'react-aria-menubutton';
import FaTrash from 'react-icons/lib/fa/trash';

class ListTitle extends Component {
	static propTypes = {
		listTitle: PropTypes.string.isRequired,
		listId: PropTypes.string.isRequired,
		cards: PropTypes.arrayOf(PropTypes.string).isRequired,
		dragHandleProps: PropTypes.object.isRequired,
		dispatch: PropTypes.func.isRequired
	};

	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			newText: props.listTitle
		};
	}

	handleChange = (event) => {
		this.setState({ newText: event.target.value });
	};

	handleKeyDown = (event) => {
		if (event.keyCode === 13) {
			event.preventDefault();
			this.handleSubmit();
		} else if (event.keyCode === 27) {
			this.revertTitle();
		}
	};

	handleSubmit = () => {
		const { newText } = this.state;
		const { listTitle, listId, dispatch } = this.props;
		if (newText === '') return;
		if (newText !== listTitle) {
			dispatch({
				type: 'EDIT_LIST_TITLE',
				payload: { listTitle: newText, listId }
			});
		}
		this.setState({ isOpen: false });
	};

	revertTitle = () => {
		this.setState({ newText: this.props.listTitle, isOpen: false });
	};

	deleteList = () => {
		const { listId, cards, dispatch } = this.props;
		dispatch({
			type: 'DELETE_LIST',
			payload: { cards, listId }
		});
	};

	openTitleEditor = () => {
		this.setState({ isOpen: true });
	};

	handleButtonKeyDown = (event) => {
		if (event.keyCode === 13) {
			event.preventDefault();
			this.openTitleEditor();
		}
	};

	render() {
		const { isOpen, newText } = this.state;
		const { dragHandleProps, listTitle } = this.props;
		return (
			<div className="list-text">
				{isOpen ? (
					<div className="list-text-textarea-wrapper">
						<Textarea
							autoFocus
							useCacheForDOMMeasurements
							value={newText}
							onChange={this.handleChange}
							onKeyDown={this.handleKeyDown}
							className="list-text-textarea"
							onBlur={this.handleSubmit}
							spellCheck={false}
						/>
					</div>
				) : (
					<div
						{...dragHandleProps}
						role="button"
						tabIndex={0}
						onClick={this.openTitleEditor}
						onKeyDown={(event) => {
							this.handleButtonKeyDown(event);
							dragHandleProps.onKeyDown(event);
						}}
						className="list-text-button"
					>
						{listTitle}
					</div>
				)}
				<Wrapper className="delete-list-wrapper" onSelection={this.deleteList}>
					<Button className="delete-list-button">
						<FaTrash />
					</Button>
					<Menu className="delete-list-menu">
						<div className="delete-list-header">Are you sure?</div>
						<MenuItem className="delete-list-confirm">Delete</MenuItem>
					</Menu>
				</Wrapper>
			</div>
		);
	}
}

export default connect()(ListTitle);
