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
};

const { reducer, actions } = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask(state, action) {
			const taskId = state.currentTasks.length;
			state.currentTasks.push({ id: taskId, text: action.payload });
		},
		// Выполнить задачу
		doneTask(state, action) {
			// Перебор массива текущих задач
			for (let i = 0; i < state.currentTasks.length; i++) {
				// Задача в текущей итерации
				const task = state.currentTasks[i];
				// Если id задачи в текущей итерации совпадает с id, переданным в action
				if (task && task.id === action.payload) {
					// Добавление текущей задачи в массив выполненных задач
					state.doneTasks.push(state.currentTasks[task.id]);
					// Удаление задачи из массива невыполненных(текущих) задач
					state.currentTasks[task.id] = null;
				}
			}
		},
		// Отменить выполнение задачи
		unDoneTask(state, action) {
			// Перебор массива выполненных задач
			for (let i = 0; i < state.doneTasks.length; i++) {
				// Задача в текущей итерации
				const task = state.doneTasks[i];
				// Если id задачи в текущей итерации совпадает с id, переданным в action
				if (task && task.id === action.payload) {
					// Добавление выполненной задачи обратно в массив текущих задач,
					// на ее прежнее место
					state.currentTasks[task.id] = task;
					// Удаление задачи из массива выполненных задач
					state.doneTasks[i] = null;
				}
			}
		},
	},
});

export const { addTask, unDoneTask, doneTask } = actions;
export default reducer;
