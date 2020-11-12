import { connect } from 'react-redux';
import classes from './App.module.scss';
import { addTask, doneTask, unDoneTask } from './redux/tasksReducer';
import { Formik } from 'formik';

var cn = require('classnames');

function Task({ taskText, isTaskDone, id, doneTask, unDoneTask }) {
	return (
		<div className={cn(classes.task, { [classes.taskDone]: isTaskDone })}>
			{taskText}
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
			>
				<span></span>
			</button>
		</div>
	);
}

function App({ currentTasks, doneTasks, addTask, doneTask, unDoneTask }) {
	return (
		<div className={classes.app}>
			<header className={classes.title}>
				<h1>All Tasks</h1>
			</header>
			<main>
				<Formik
					initialValues={{ newTaskText: '' }}
					onSubmit={(values) => {
						addTask(values.newTaskText);
					}}
				>
					{({ handleSubmit, handleChange, values }) => (
						<form onSubmit={handleSubmit}>
							<input
								type="text"
								name="newTaskText"
								onChange={handleChange}
								value={values.newTaskText}
							/>
							<button type="submit">Add Task</button>
						</form>
					)}
				</Formik>
				{currentTasks
					.map((task) => {
						if (task) {
							return (
								<Task
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
}

const MSTP = (state) => {
	return {
		currentTasks: state.tasks.currentTasks,
		doneTasks: state.tasks.doneTasks,
	};
};

export default connect(MSTP, { addTask, doneTask, unDoneTask })(App);
