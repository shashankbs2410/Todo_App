import { Fragment } from "react";
import { useSelector } from "react-redux";
import classes from "./TasksList.module.css";

const CompletedTasks = (props) => {
  const items = useSelector((state) => state.tasks.pendingTasks);
  const completedItems = useSelector((state) => state.tasks.completedTasks);
  const markIncompleteHandler = (task) => {
    props.onMarkIncomplete(task);
    props.onDeleteCompleted(task);
  };

  const deleteHandler = (task) => {
    props.onDeleteCompleted(task);
  };

  let content = null;

  if (items.length > 0 && completedItems.length === 0) {
    content = (
      <p className={classes.empty}>
        No Task is finished yet! Mark the tasks to complete.
      </p>
    );
  }

  if (completedItems.length > 0) {
    content = (
      <div className={classes.items}>
        <h3>Completed Tasks</h3>
        {completedItems.map((task) => (
          <div key={task.id} className={classes.completed_task}>
            {task.text}
            <button
              title="Mark incomplete"
              onClick={() =>
                markIncompleteHandler({ id: task.id, text: task.text })
              }
              className={classes.mark_incomplete}
            >
              ✘
            </button>
            <button
              className={classes.delete_completed}
              title="Delete Task"
              onClick={() => deleteHandler({ id: task.id, text: task.text })}
            >
              🗑
            </button>
          </div>
        ))}
      </div>
    );
  }

  return <Fragment>{content}</Fragment>;
};

export default CompletedTasks;
