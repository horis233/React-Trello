import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';
import classnames from 'classnames';
import marked from 'marked';
import CardEditor from './CardEditor';
import CardDetails from './CardDetails';
import findCheckboxes from './findCheckBoxes';
import './Card.scss';

// Create HTML string that identifies checkboxes by index
function formatMarkdown(markdown) {
	let i = 0;
	return marked(markdown, { sanitize: true, gfm: true, breaks: true })
		.replace(/<a/g, '<a target="_blank"')
		.replace(/\[(\s|x)\]/g, (match) => {
			let newString;
			if (match === '[ ]') {
				newString = `<input id=${i} onclick="return false" type="checkbox">`;
			} else {
				newString = `<input id=${i} checked onclick="return false" type="checkbox">`;
			}
			i += 1;
			return newString;
		});
}

class Card extends Component {
	static propTypes = {
		card: PropTypes.shape({
			_id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			color: PropTypes.string
		}).isRequired,
		listId: PropTypes.string.isRequired,
		isDraggingOver: PropTypes.bool.isRequired,
		index: PropTypes.number.isRequired,
		dispatch: PropTypes.func.isRequired
	};

	constructor() {
		super();
		this.state = {
			isOpen: false
		};
	}

	toggleCardEditor = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	handleKeyDown = (event) => {
		if (event.keyCode === 13 && event.target.tagName.toLowerCase() !== 'a') {
			event.preventDefault();
			this.toggleCardEditor();
		}
	};

	// identify the clicked checkbox by its index and give it a new checked attribute
	toggleCheckbox = (checked, i) => {
		const { card, dispatch } = this.props;

		let j = 0;
		const newTitle = card.title.replace(/\[(\s|x)\]/g, (match) => {
			let newString;
			if (i === j) {
				newString = checked ? '[x]' : '[ ]';
			} else {
				newString = match;
			}
			j += 1;
			return newString;
		});
		dispatch({
			type: 'EDIT_CARD_TITLE',
			payload: { cardId: card._id, cardTitle: newTitle }
		});
	};

	render() {
		const { card, index, listId, isDraggingOver } = this.props;		const { isOpen } = this.state;
		const checkboxes = findCheckboxes(card.title);
		return (
			<div>
				<Draggable draggableId={card._id} index={index}>
					{(provided, snapshot) => (
						<div>
							{/* eslint-disable */}
							<div
								className={classnames('card-title', {
									'card-title--drag': snapshot.isDragging
								})}
								ref={(ref) => {
									provided.innerRef(ref);
									this.ref = ref;
								}}
								{...provided.draggableProps}
								{...provided.dragHandleProps}
								onClick={(event) => {
									provided.dragHandleProps.onClick(event);
									const { tagName, checked, id } = event.target;
									if (tagName.toLowerCase() === 'input') {
										this.toggleCheckbox(
											checked,
											parseInt(id)
										);
									} else if (tagName.toLowerCase() !== 'a') {
										this.toggleCardEditor(event);
									}
								}}
								onKeyDown={(event) => {
									provided.dragHandleProps.onKeyDown(event);
									this.handleKeyDown(event);
								}}
								style={{
									...provided.draggableProps.style,
									background: card.color
								}}
							>
								<div
									className="card-title-html"
									dangerouslySetInnerHTML={{
										__html: formatMarkdown(card.title)
									}}
								/>
								{/* eslint-enable */}
								{card.date || checkboxes.total > 0 ? (
									<CardDetails
										date={card.date}
										checkboxes={checkboxes}
									/>
								) : null}
							</div>
							{isDraggingOver && provided.placeholder}
						</div>
					)}
				</Draggable>

				{/* {isOpen && ( */}
				<CardEditor
					isOpen={isOpen}
					cardElement={this.ref}
					card={card}
					listId={listId}
					toggleCardEditor={this.toggleCardEditor}
				/>
				{/* )} */}
			</div>
		);
	}
}
const mapStateToProps = (state, ownProps) => ({
	card: state.cardsById[ownProps.cardId]
});
export default connect(mapStateToProps)(Card);
