import { denormalize, schema } from 'normalizr';
import axios from 'axios';

const persistMiddleware = (store) => (next) => (action) => {
	next(action);
	const { user, boardsById, listsById, cardsById, currentBoardId: boardId } = store.getState();
	if (user) {
		if (action.type === 'DELETE_BOARD') {
			// All action-types that are not DELETE_BOARD or PUT_BOARD_ID_IN_REDUX are currently modifying a board in a way that should
			// be persisted to db. If other types of actions are added, this logic has be get more specific.	      // be persisted to db. If other types of actions are added, this logic will get unwieldy.
			axios.delete('/api/board', { data: { boardId } });
		} else if (action.type !== 'PUT_BOARD_ID_IN_REDUX') {
			const card = new schema.Entity('cardsById', {}, { idAttribute: '_id' });
			const list = new schema.Entity('listsById', { cards: [ card ] }, { idAttribute: '_id' });
			const board = new schema.Entity('boardsById', { lists: [ list ] }, { idAttribute: '_id' });
			const entities = { cardsById, listsById, boardsById };

			const boardData = denormalize(boardId, board, entities);
			// TODO: Provide warning message to user when put request doesn't work for whatever reason
			axios.put('/api/board', boardData);
		}
	}
};

export default persistMiddleware;
