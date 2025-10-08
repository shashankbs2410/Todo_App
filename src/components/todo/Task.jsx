import { useState } from "react";
import { useDispatch } from "react-redux";
import { taskActions } from "../../store/tasks-slice";
import classes from "./Task.module.css";

const Task = (props) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const task = props.task;

  const toggleEditClickHandler = async () => {
    if (!isEditing) {
      setIsEditing(true);
      setInput(task.text);
    } else {
      setIsEditing(false);
      dispatch(taskActions.editTask({ id: task.id, input: input }));
    }
  };

  const editChangeHandler = (event) => {
    setInput(event.target.value);
  };

  return (
    <div id={task.id} className={classes.task}>
      {!isEditing && <span>{task.text}</span>}
      {isEditing && (
        <span>
          <textarea
            onChange={editChangeHandler}
            defaultValue={task.text}
            className={classes.input}
            type="text"
          />
        </span>
      )}
      <button
        title="Mark Completed"
        onClick={() =>
          props.markCompleteHandler({ id: task.id, text: task.text })
        }
        className={classes.mark_complete}
      >
        ✔
      </button>
      <button
        className={classes.delete_pending}
        title="Delete Task"
        onClick={() => props.deleteHandler({ id: task.id, text: task.text })}
      >
        🗑
      </button>
      <button
        className={isEditing ? classes.editing_pending : classes.edit_pending}
        title="Edit Task"
        onClick={toggleEditClickHandler}
      >
        ✎
      </button>
    </div>
  );
};

export default Task;
