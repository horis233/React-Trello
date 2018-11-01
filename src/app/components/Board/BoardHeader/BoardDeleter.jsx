import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Wrapper, Menu, MenuItem } from 'react-aria-menubutton';
class BoardDeleter extends Component {
	static propTypes = {
		match: PropTypes.shape({
			params: PropTypes.shape({ boardId: PropTypes.string })
		}).isRequired,
		history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
		dispatch: PropTypes.func.isRequired
	};
	handleSelection = () => {
		const { dispatch, match, history } = this.props;
		const { boardId } = match.params;
		dispatch({ type: 'DELETE_BOARD', payload: { boardId } });
		history.push('/');
	};
	render = () => {
		return (
			<Wrapper className="board-deleter-wrapper" onSelection={this.handleSelection}>
				<Button className="board-deleter-button">Delete board</Button>
				<Menu className="board-deleter-menu">
					<div className="board-deleter-header">Are you sure?</div>
					<MenuItem className="board-deleter-confirm">Delete</MenuItem>
				</Menu>
			</Wrapper>
		);
	};
}
export default withRouter(connect()(BoardDeleter));
