import { GoogleOAuthProvider } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import TodoForm from "./components/todo/TodoForm";
import PendingTasks from "./components/todo/PendingTasks";
import CompletedTasks from "./components/todo/CompletedTasks";
import GoogleLoginComponent from "./components/login/GoogleLoginComponent";
import { taskActions } from "./store/tasks-slice";

function App() {
  const signedIn = useSelector((state) => state.ui.signedIn);
  const dispatch = useDispatch();

  const deletePendingHandler = (task) => {
    const id = task.id;
    dispatch(taskActions.deletePendingTask(id));
  };

  const deleteCompletedHandler = (task) => {
    const id = task.id;
    dispatch(taskActions.deleteCompletedTask(id));
  };

  const markCompleteHandler = (task) => {
    dispatch(taskActions.markCompleteTask(task));
  };

  const markIncompleteHandler = (task) => {
    dispatch(taskActions.markIncompleteTask(task));
  };

  return (
    <div>
      <GoogleOAuthProvider clientId="917019389198-9ukhh7sfe8m0mes3mu76rijvqe0m3cjo.apps.googleusercontent.com">
        <GoogleLoginComponent />
      </GoogleOAuthProvider>
      {signedIn && <TodoForm />}
      {signedIn && (
        <PendingTasks
          onMarkComplete={markCompleteHandler}
          onDeletePending={deletePendingHandler}
        />
      )}
      {signedIn && (
        <CompletedTasks
          onMarkIncomplete={markIncompleteHandler}
          onDeleteCompleted={deleteCompletedHandler}
        />
      )}
    </div>
  );
}

export default App;
