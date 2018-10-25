// @flow
import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import marked from 'marked';
import FaPencil from 'react-icons/lib/fa/pencil';
import FaTimesCircle from 'react-icons/lib/fa/times-circle';
import classnames from 'classnames';

type Props = {
	card: { _id: string, title: string },
	index: number,
	i: number,
	deleteCard: string => void,
	openCardEditor: ({ _id: string, title: string }) => void
};

type States = {
	isDragging: boolean
};

class Card extends Component<Props, States> {
	constructor() {
		super();
		this.state = {
			isDragging: false
		};
	}
	render() {
		const { card, index, i, deleteCard, openCardEditor } = this.props;
		return (
			<Draggable draggableId={card._id} index={index}>
				{({ innerRef, draggableProps, dragHandleProps: handleProps, placeholder }, { isDragging }) => (
					<div>
						{/* eslint-disable jsx-a11y/no-static-element-interactions */}
						<div
							className={classnames('card-title', {
								'card-title-drag': isDragging
							})}
							ref={innerRef}
							{...draggableProps}
							{...handleProps}
							onMouseDown={(event) => {
								handleProps.onMouseDown(event);
								console.log('itsw rtokgin');
								// do shit
							}}
							data-react-beautiful-dnd-draggable={i}
							data-react-beautiful-dnd-drag-handle={i}
						>
							<div
								className="card-title-html"
								dangerouslySetInnerHTML={{
									__html: marked(card.title, { sanitize: true, breaks: true })
								}}
							/>
							<button onClick={() => deleteCard(card._id)} className="delete-card-button">
								<FaTimesCircle />
							</button>
							<button onClick={() => openCardEditor(card)} className="edit-card-button">
								<FaPencil />
							</button>
						</div>
						{placeholder}
					</div>
				)}
			</Draggable>
		);
	}
}
export default Card;
