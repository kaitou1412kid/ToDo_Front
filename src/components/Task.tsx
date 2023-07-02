import { Itask } from "./TaskBody";

interface Itodo {
  task: Itask;
  completeTask: Function;
  deleteTask: Function;
  editTask: Function;
}

export const Task = ({ task, completeTask, deleteTask, editTask }: Itodo) => {
  return (
    <div className="task">
      <input
        className="form-check-input"
        type="checkbox"
        id="inlineCheckbox1"
        value="option1"
        onChange={() => completeTask(task._id)}
      />
      {task.completed ? (
        <label>
          <s>{task.title}</s>
        </label>
      ) : (
        <label>{task.title}</label>
      )}
      {/* <button onClick={()=>editTask(task.id)} className="delete">Edit</button> */}
      <span>
        <i className="fas fa-edit" onClick={() => editTask(task._id)}></i>
        <i
          className="fa fa-trash"
          onClick={() => deleteTask(task._id)}
          aria-hidden="true"
        ></i>
      </span>
      {/* <button onClick={()=>deleteTask(task.id)} className="delete">X</button> */}
    </div>
  );
};
