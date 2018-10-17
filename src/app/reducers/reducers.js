// @flow

const cardsById = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_CARD':
		case 'EDIT_CARD_TITLE': {
			const { cardTitle, cardId } = action.payload;
			return {
				...state,
				[cardId]: {
					title: cardTitle,
					id: cardId
				}
			};
		}

		case 'DELETE_CARD': {
			const { cardId } = action.payload;
			const { [cardId]: deletedCard, ...restOfCards } = state;
			return restOfCards;
		}

		default:
			return state;
	}
};

const listsById = (state = {}, action) => {
	switch (action.type) {
		case 'ADD_CARD': {
			const { listId, cardId } = action.payload;
			return {
				...state,
				[listId]: {
					...state[listId],
					cards: [ ...state[listId].cards, cardId ]
				}
			};
		}
		case 'ADD_LIST': {
			const { listId, listTitle } = action.payload;
			return {
				...state,
				[listId]: { id: listId, title: listTitle, cards: [] }
			};
		}

		case 'DELETE_CARD': {
			const { cardId: newCardId, listId } = action.payload;
			return {
				...state,
				[listId]: {
					...state[listId],
					cards: state[listId].cards.filter((cardId) => cardId !== newCardId)
				}
			};
		}

		case 'EDIT_LIST_TITLE': {
			const { listId, listTitle } = action.payload;
			return {
				...state,
				[listId]: {
					...state[listId],
					title: listTitle
				}
			};
		}
		case 'REORDER_LIST': {
			const { sourceIndex, destinationIndex, sourceId, destinationId } = action.payload;
			// Reorder within the same list
			if (sourceId === destinationId) {
				const newCards = Array.from(state[sourceId].cards);
				const [ removedCard ] = newCards.splice(sourceIndex, 1);
				newCards.splice(destinationIndex, 0, removedCard);
				return {
					...state,
					[sourceId]: { ...state[sourceId], cards: newCards }
				};
			}
			// Switch card from one list to another
			const sourceCards = Array.from(state[sourceId].cards);
			const [ removedCard ] = sourceCards.splice(sourceIndex, 1);
			const destinationCards = Array.from(state[destinationId].cards);
			destinationCards.splice(destinationIndex, 0, removedCard);
			return {
				...state,
				[sourceId]: { ...state[sourceId], cards: sourceCards },
				[destinationId]: { ...state[destinationId], cards: destinationCards }
			};
		}
		default:
			return state;
	}
};

const boardsById = (state = {}, action) => {
	switch (action.type) {
		case 'REORDER_BOARD': {
			const { destinationIndex, sourceId, sourceIndex } = action.payload;
			const newLists = Array.from(state[sourceId].lists);
			const [ removedList ] = newLists.splice(sourceIndex, 1);
			newLists.splice(destinationIndex, 0, removedList);
			return {
				...state,
				[sourceId]: { ...state[sourceId], lists: newLists }
			};
		}

		case 'ADD_LIST': {
			const { boardId, listId } = action.payload;
			return {
				...state,
				[boardId]: {
					...state[boardId],
					lists: [ ...state[boardId].lists, listId ]
				}
			};
		}

		default:
			return state;
	}
};

export default { cardsById, listsById, boardsById };
