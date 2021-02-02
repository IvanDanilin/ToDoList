import { Formik } from 'formik';
import { useState } from 'react';
import { connect } from 'react-redux';
import { changeTask, doneTask, unDoneTask } from '../redux/tasksReducer';
import classes from './ToDoList.module.scss';

var cn = require('classnames');

const Task = ({
	taskText,
	isTaskDone,
	id,
	doneTask,
	unDoneTask,
	changeTask,
	addTaskFormActive,
	setAddTaskFormActive,
	isAddTask
}) => {
	const [ changeTaskFetch, setChangeTaskFetch ] = useState(isAddTask);
	return (
		<div className={cn(classes.task, { [classes.taskDone]: isTaskDone })}>
			{changeTaskFetch ? (
				<Formik
					initialValues={{ taskText: taskText }}
					onSubmit={(values) => {
						if (values.taskText) {
							changeTask({ text: values.taskText, id, isTaskDone });
							setChangeTaskFetch(false);
							if (addTaskFormActive) {
								setAddTaskFormActive(false);
							}
						}
					}}
				>
					{({ handleSubmit, handleChange, values }) => (
						<form onSubmit={handleSubmit}>
							<input type="text" name="taskText" onChange={handleChange} value={values.taskText} />
							<button type="submit">Save</button>
						</form>
					)}
				</Formik>
			) : (
				<div>
					<span
						title="Change task"
						className={classes.taskText}
						onClick={() => {
							setChangeTaskFetch(true);
						}}
					>
						{taskText}
					</span>
					<button
						onClick={() => {
							if (isTaskDone) {
								unDoneTask(id);
							} else {
								doneTask(id);
							}
						}}
						type="button"
						className={classes.taskDoneButton}
					/>
				</div>
			)}
		</div>
	);
};

const ToDoList = ({ currentTasks, doneTasks, changeTask, doneTask, unDoneTask }) => {
	const [ addTaskFormActive, setAddTaskFormActive ] = useState(false);
	return (
		<div className={classes.app}>
			<header className={classes.title}>
				<h1>Tasks</h1>
			</header>

			<main>
				{addTaskFormActive ? (
					<Task
						changeTask={changeTask}
						doneTask={doneTask}
						isTaskDone={false}
						addTaskFormActive={addTaskFormActive}
						setAddTaskFormActive={setAddTaskFormActive}
						isAddTask={true}
					/>
				) : (
					<button className={classes.addTaskButton} onClick={() => setAddTaskFormActive(true)} />
				)}
				{currentTasks
					.map((task) => {
						if (task) {
							return (
								<Task
									changeTask={changeTask}
									taskText={task.text}
									key={task.id}
									id={task.id}
									doneTask={doneTask}
									isTaskDone={false}
								/>
							);
						} else {
							return null;
						}
					})
					.reverse()}
				{doneTasks
					.map((task) => {
						if (task) {
							return (
								<Task
									changeTask={changeTask}
									taskText={task.text}
									key={task.id}
									id={task.id}
									isTaskDone={true}
									unDoneTask={unDoneTask}
								/>
							);
						} else {
							return null;
						}
					})
					.reverse()}
			</main>
		</div>
	);
};

const MSTP = (state) => {
	return {
		currentTasks: state.tasks.currentTasks,
		doneTasks: state.tasks.doneTasks
	};
};

export default connect(MSTP, { changeTask, doneTask, unDoneTask })(ToDoList);
