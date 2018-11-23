import { denormalize, schema } from 'normalizr';
import axios from 'axios';

const persistMiddleware = (store) => (next) => (action) => {
	next(action);
	const { user, boardsById, listsById, cardsById, currentBoardId: boardId } = store.getState();
	if (user) {
		if (action.type === 'DELETE_BOARD') {
			axios.delete('/api/board', { data: { boardId } }).then(({ data }) => console.log(data));
		} else if (action.type !== 'PUT_BOARD_ID_IN_REDUX') {
			const card = new schema.Entity('cardsById', {}, { idAttribute: '_id' });
			const list = new schema.Entity('listsById', { cards: [ card ] }, { idAttribute: '_id' });
			const board = new schema.Entity('boardsById', { lists: [ list ] }, { idAttribute: '_id' });
			const entities = { cardsById, listsById, boardsById };

			const boardData = denormalize(boardId, board, entities);
			axios.put('/api/board', boardData).then(({ data }) => console.log(data));
		}
	}
};

export default persistMiddleware;
