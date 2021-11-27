import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTasks, addTask } from "../../../services/task-service";
import Task from "./Task/task";
import "./tasks.scss";
import { useState } from "react";
import addIcon from "../../../assets/add-icn.svg";
const Tasks = () => {
  const dispatch = useDispatch();
  const allTasks = useSelector((state) => state.task.taskList);
  const infoMessage = useSelector((state) => state.task.infoMessage);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("");
  const [errMessage, setErrMessage] = useState("");
  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  const addTaskHandler = (e) => {
    e.preventDefault();
    const taskData = {
      name,
      description,
      deadline,
      isCompleted: false,
      priority,
    };
    if (
      description.length &&
      name.length &&
      deadline.length &&
      priority.length
    ) {
      dispatch(addTask(taskData));
      setName("");
      setDescription("");
      setDeadline("");
      setPriority("");
      setErrMessage("");
    } else {
      setErrMessage("Please enter data in all the fields");
    }
  };

  const setNameHandler = (e) => {
    setName(e.target.value);
  };
  const setDescriptionHandler = (e) => {
    setDescription(e.target.value);
  };
  const setDeadlineHandler = (e) => {
    setDeadline(e.target.value);
  };
  const setPriorityHandler = (e) => {
    setPriority(e.target.value);
  };
  return (
    <>
      <form className="todo-form row" onSubmit={addTaskHandler}>
        <div className="row col-md-6">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Task Name"
              value={name}
              onChange={setNameHandler}
            />
          </div>
          <div className=" col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Task Description"
              value={description}
              onChange={setDescriptionHandler}
            />
          </div>
        </div>
        <div className="row col-md-5">
          <div className="col-md-6">
            <input
              placeholder="Deadline"
              className="form-control"
              type="text"
              onFocus={(e) => (e.target.type = "date")}
              id="date"
              onBlur={(e) => (e.target.type = "text")}
              value={deadline}
              onChange={setDeadlineHandler}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="col-md-6">
            <select onChange={setPriorityHandler} className="form-control">
              <option disabled selected>
                {" "}
                -- Select Priority --{" "}
              </option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div className="col-md-1 add-task">
          <input type="image" src={addIcon} alt="Add Task" />
        </div>
        {errMessage && <label className="error-message">{errMessage}</label>}
      </form>
      <div className="containern ml-5">
        {allTasks.length ? (
          <div className="container my-5">
            {allTasks.map((task) => {
              return <Task key={task._id} {...task} />;
            })}
          </div>
        ) : (
          <h1 className="text-center my-5 no-todo">{infoMessage}</h1>
        )}
      </div>
    </>
  );
};

export default Tasks;
