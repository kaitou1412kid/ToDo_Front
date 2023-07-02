import { useState } from "react";
import { Itask } from "./TaskBody";
interface Iedit {
  task: Itask;
  editItem: Function;
}

export const EditTaskForm = ({ task, editItem }: Iedit) => {
  const [newTask, setNewTask] = useState<string>(task.title);

  const handleInput = (e: React.MouseEvent<HTMLElement>) => {
    editItem(task._id, newTask);
    //console.log(task);
    setNewTask("");
  };
  return (
    <div className="form">
      <input
        type="text"
        className="input"
        placeholder="Update task"
        value={newTask}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewTask(e.target.value)
        }
      />
      <button type="submit" className="add" onClick={handleInput}>
        Update Task
      </button>
    </div>
  );
};
