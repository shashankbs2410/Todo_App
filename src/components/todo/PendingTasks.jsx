import { Fragment } from "react";
import { useSelector } from "react-redux";
import Task from "./Task";
import classes from "./TasksList.module.css";

const PendingTasks = (props) => {
  const items = useSelector((state) => state.tasks.pendingTasks);
  const completedItems = useSelector((state) => state.tasks.completedTasks);
  const markCompleteHandler = (task) => {
    props.onMarkComplete(task);
    props.onDeletePending(task);
  };

  const deleteHandler = (task) => {
    props.onDeletePending(task);
  };

  let content = (
    <p className={classes.empty}>Nothing to show yet! Please add new tasks.</p>
  );

  if (items.length === 0 && completedItems.length > 0) {
    content = (
      <p className={classes.empty}>
        No pending tasks as of now. Please add new tasks.
      </p>
    );
  }

  if (items.length > 0) {
    content = (
      <div>
        <div className={classes.items}>
          <h3>Pending Tasks</h3>
          {items.map((task) => (
            <Task
              key={task.id}
              task={task}
              markCompleteHandler={markCompleteHandler}
              deleteHandler={deleteHandler}
            />
          ))}
        </div>
      </div>
    );
  }

  return <Fragment>{content}</Fragment>;
};

export default PendingTasks;
