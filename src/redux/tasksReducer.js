import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentTasks: [
		{
			id: 0,
			text: 'Lorem',
		},
		{
			id: 1,
			text: 'Lorem ipsum dolore',
		},
		{
			id: 2,
			text: 'Lorem ips',
		},
		{
			id: 3,
			text: 'Lorem ipsum',
		},
	],
	doneTasks: [],
	newTaskId: 4,
};

const { reducer, actions } = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		// Добавить задачу
		addTask(state, action) {
			state.currentTasks = [
				...state.currentTasks,
				{ id: state.newTaskId++, text: action.payload },
			];
		},
		// Выполнить задачу
		doneTask(state, action) {
			// В action.payload приходит id задачи, которую нужно отметить, как выполненную
			// Фильтруется массив текущих задач
			state.currentTasks = state.currentTasks.filter((task) => {
				// Если id текущей задачи не совпадает с id, из action,
				// то возвращается текущая задача (копируется в новый массив)
				if (task.id !== action.payload) {
					return task;
				}
				// Если id совпадает, то текущая задача копируется в массив выполненных задач
				// и возвращается false (задача не копируется в новый массив)
				state.doneTasks = [...state.doneTasks, task];
				return false;
			});
		},
		// Отменить выполнение задачи
		unDoneTask(state, action) {
			state.doneTasks = state.doneTasks.filter((task) => {
				// Если id задачи не совпадает с id, из action,
				// то возвращается текущая задача (копируется в новый массив)
				if (task.id !== action.payload) {
					return task;
				}
				// Если id совпадает, то задача копируется в массив текущих задач
				// и возвращается false (задача не копируется в новый массив)
				state.currentTasks = [...state.currentTasks, task];
				return false;
			});
		},
	},
});

export const { addTask, unDoneTask, doneTask } = actions;
export default reducer;
