import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import classnames from 'classnames';
import ListTitle from './ListTitle';
import Cards from './Cards';
import CardComposer from './CardComposer/CardComposer';
import './List.scss';

class List extends Component {
	static propTypes = {
		boardId: PropTypes.string.isRequired,
		index: PropTypes.number.isRequired,
		list: PropTypes.shape({ _id: PropTypes.string.isRequired }).isRequired
	};

	constructor() {
		super();
		this.state = {
			cardComposerIsOpen: false
		};
	}

	toggleCardComposer = () => this.setState({ cardComposerIsOpen: !this.state.cardComposerIsOpen });

	render = () => {
		const { list, boardId, index } = this.props;
		const { cardComposerIsOpen } = this.state;
		return (
			<Draggable draggableId={list._id} index={index} disableInteractiveElementBlocking>
				{(provided, snapshot) => (
					<div>
						<div
							ref={provided.innerRef}
							{...provided.draggableProps}
							className="list-wrapper"
						>
							<div
								className={classnames('list', {
									'list--drag': snapshot.isDragging
								})}
							>
								<ListTitle
									dragHandleProps={provided.dragHandleProps}
									listTitle={list.title}
									listId={list._id}
									cards={list.cards}
									boardId={boardId}
								/>
								<div className="cards-wrapper">
									<Cards listId={list._id} boardId={boardId} />
								</div>
							</div>
							{cardComposerIsOpen ? (
								<CardComposer
									isOpen={cardComposerIsOpen}
									toggleCardComposer={this.toggleCardComposer}
									boardId={boardId}
									listId={list._id}
								/>
							) : (
								<button
									onClick={this.toggleCardComposer}
									className="open-composer-button"
								>
									+
								</button>
							)}
						</div>
						{provided.placeholder}
					</div>
				)}
			</Draggable>
		);
	};
}

export default connect()(List);
