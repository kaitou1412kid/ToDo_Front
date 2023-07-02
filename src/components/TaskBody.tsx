import { useState, useEffect } from "react";
import { TaskForm } from "./TaskForm";
import { Task } from "./Task";
import { EditTaskForm } from "./EditTaskform";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//interface for task
export interface Itask {
  _id?: number;
  title: string;
  completed?: boolean;
  edit?: boolean;
}

export const TaskBody = () => {
  const [taskList, setTaskList] = useState<Itask[]>([]);

  const todo = async (newTask: string) => {
    axios
      .post("http://localhost:3080/todo/add", {
        title: newTask,
      })
      .then((res: any) => {
        setTaskList([...taskList, res.data.data]);
        toast.success("Task Added Successfully", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3080/todo/all")
      .then((res) => setTaskList(res.data.data));
  }, []);

  const completeTask = (id: number) => {
    setTaskList(
      taskList.map((task: Itask) => {
        if (task._id === id) {
          if (task.completed === false) {
            toast.success("Task Completed", {
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            return { ...task, completed: true };
          } else {
            toast.error("Task Incomplete", {
              position: "bottom-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            return { ...task, completed: false };
          }
        } else {
          return task;
        }
      })
    );
  };

  const deleteTask = (id: number) => {
    axios.delete(`http://localhost:3080/todo/${id}/delete`);
    setTaskList(taskList.filter((task: Itask) => task._id !== id));
    toast.success("Task Deleted Successfully", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const editTask = (id: number) => {
    setTaskList(
      taskList.map((task: Itask) =>
        task._id === id ? { ...task, edit: !task.edit } : task
      )
    );
  };

  const editItem = (id: number, title: string) => {
    axios.put(`http://localhost:3080/todo/${id}/update`, {
      title: title,
    });
    setTaskList(
      taskList.map((task: Itask) =>
        task._id === id ? { ...task, title, edit: !task.edit } : task
      )
    );
    toast.success("Task Edited Successfully", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="container">
      <h1 className="heading">TODO LIST</h1>
      <TaskForm todo={todo} />
      <div className="tasks">
        {taskList.map((task: Itask, idx: number) =>
          task.edit ? (
            <EditTaskForm editItem={editItem} task={task} key={task._id} />
          ) : (
            <Task
              task={task}
              key={idx}
              completeTask={completeTask}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          )
        )}
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
};
