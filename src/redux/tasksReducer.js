import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentTasks: [
		{
			id: 1,
			text: 'Lorem'
		},
		{
			id: 2,
			text: 'Lorem ipsum dolore'
		},
		{
			id: 3,
			text: 'Lorem ips'
		},
		{
			id: 5,
			text: 'Lorem ipsum'
		}
	],
	doneTasks: [
		{
			id: 4,
			text: 'Lorem ips'
		},
		{
			id: 6,
			text: 'Lorem ipsum'
		}
	],
	newTaskId: 7
};

const { reducer, actions } = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		// Добавить задачу
		changeTask(state, action) {
			if (action.payload.id) {
				if (action.payload.isTaskDone) {
					const index = state.doneTasks.findIndex((task) => task.id === action.payload.id);
					console.log(index);
					state.doneTasks[index].text = action.payload.text;
				} else {
					const index = state.currentTasks.findIndex((task) => task.id === action.payload.id);
					console.log(index);
					state.currentTasks[index].text = action.payload.text;
				}
			} else {
				state.currentTasks.push({ id: state.newTaskId, text: action.payload.text });
				state.newTaskId = state.newTaskId + 1;
			}
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
				state.doneTasks = [ ...state.doneTasks, task ];
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
				state.currentTasks = [ ...state.currentTasks, task ];
				return false;
			});
		}
	}
});

export const { changeTask, unDoneTask, doneTask } = actions;
export default reducer;
