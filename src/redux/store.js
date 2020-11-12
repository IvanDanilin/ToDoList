import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import tasks from './tasksReducer';

const middleware = getDefaultMiddleware({
	immutableCheck: false,
	serializableCheck: false,
	thunk: true,
});

const store = configureStore({
	reducer: {
		tasks,
	},
	middleware,
	devTools: process.env.NODE_ENV !== 'production',
});

window.store = store;

export default store;
