import React, { useMemo, useState, useEffect } from "react";
import { Accordion } from "react-bootstrap";
import { covertCamlinToNormal, getLocalDate } from "../../../../utils/utils";
import { editTask, deleteTask } from "../../../../services/task-service";
import editIcon from "../../../../assets/edit-icom.svg";
import tickIcon from "../../../../assets/tick-icn.svg";
import { useDispatch } from "react-redux";
import "./task.scss";
import deleteIcon from "../../../../assets/delete-icn.svg";
import ConfirmationBox from "../../../Confirmation Box/confirmation-box";

const Task = ({
  _id,
  name,
  description,
  createdAt,
  deadline,
  isCompleted,
  priority,
  bucketName,
}) => {
  const dispatch = useDispatch();
  const displayProps = useMemo(
    () => ({
      name,
      description,
      createdAt: getLocalDate(createdAt),
      deadline: getLocalDate(deadline),
      isCompleted,
      priority,
    }),
    [name, description, createdAt, deadline, isCompleted, priority]
  );
  const [editMode, setEditMode] = useState(false);
  const [taskDescription, setTaskDescription] = useState(description);
  const [taskDeadLine, settaskDeadLine] = useState();
  const [taskPriority, setTaskPriority] = useState(priority);
  const [isTaskCompleted, setIsTaskCompleted] = useState(isCompleted);

  const [showModal, setShowModal] = useState(false);
  const modalHeading = `Delete ${name}`;
  const modalMessage =
    "Are You sure You want to Delete the task? This Can't be undone";

  const editModeHandler = () => {
    const presentEditMode = editMode;
    const taskData = {
      _id,
      name,
      description: taskDescription,
      bucketName,
      deadline: taskDeadLine,
      isCompleted,
      priority: taskPriority,
    };
    if (editMode) {
      dispatch(editTask(taskData));
    }
    setEditMode(!presentEditMode);
  };

  const editData = () => (
    <span onClick={editModeHandler} className="edit-button">
      {!editMode ? (
        <img src={editIcon} alt="Edit Icon" />
      ) : (
        <img src={tickIcon} alt="Tick Icon" />
      )}
    </span>
  );

  const modalHandler = (boolean) => {
    setShowModal(boolean);
  };

  const showModalHandler = () => {
    modalHandler(true);
  };

  const hideModalHandler = () => {
    modalHandler(false);
  };

  const taskDescriptionChangeHandler = (e) => {
    setTaskDescription(e.target.value);
  };

  const taskDeadlineChangeHandler = (e) => {
    settaskDeadLine(e.target.value);
  };

  const priorityChangeHandler = (e) => {
    setTaskPriority(e.target.value);
  };

  const statusChangeHandler = (e) => {
    setIsTaskCompleted(e.target.checked);
  };

  useEffect(() => {
    if (isTaskCompleted !== isCompleted) {
      const taskData = {
        _id,
        isCompleted: isTaskCompleted,
      };
      dispatch(editTask(taskData));
    }
  }, [isTaskCompleted, _id, dispatch, isCompleted]);

  const editComponent = (prop) => {
    if (prop === "deadline")
      return (
        <div className="col-md-10">
          <input
            type="date"
            name={prop}
            value={taskDeadLine}
            onChange={taskDeadlineChangeHandler}
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
      );
    if (prop === "priority")
      return (
        <div className="col-md-10">
          <select
            name={prop}
            value={taskPriority}
            onChange={priorityChangeHandler}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      );
    if (prop === "createdAt") return displayData(prop);
    return (
      <div className="col-md-10">
        <input
          type="text"
          name={prop}
          value={taskDescription}
          onChange={taskDescriptionChangeHandler}
        />
      </div>
    );
  };

  const displayData = (prop) => {
    return (
      <div
        className={`col-md-10 ${prop === "priority" && "display-priority"}`}
      >{`${displayProps[prop]}`}</div>
    );
  };

  const deleteTaskHandler = () => {
    dispatch(deleteTask(_id));
    hideModalHandler();
  };

  const getPriorityBadgeValue = (priority)=>{
    return `${priority} Priority`;
  };

  const getPriorityBadgeClass = (priority)=>{
    switch (priority) {
      case "high" : return "high-priority-badge";
      case "medium": return "medium-priority-badge";
      default: return "low-priority-badge";
    }
  }

  return (
    <>
      <ConfirmationBox
        showModal={showModal}
        heading={modalHeading}
        message={modalMessage}
        yes={deleteTaskHandler}
        no={hideModalHandler}
      />
      <div className="row">
        <div className="col-md-10">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <span>
                  <h2>{name}</h2>
                </span>
                <span className={`priority-badge ml-3 ${getPriorityBadgeClass(taskPriority)}`}>{getPriorityBadgeValue(taskPriority)}</span>
              </Accordion.Header>
              <Accordion.Body>
                {editData()}
                <div className="mx-5">
                  {Object.keys(displayProps).map((prop,index) => {
                    if (prop !== "name") {
                      if (prop === "isCompleted") {
                        return (
                          <div className="row" key={index}>
                            <div className="col-md-2">
                              <h5>Completed?</h5>
                            </div>
                            <div className="custom-control custom-switch col-md-2 ml-4 pl-4">
                              <input
                                type="checkbox"
                                className="custom-control-input"
                                id={_id}
                                onChange={statusChangeHandler}
                                checked={isTaskCompleted}
                              />
                              <label
                                className="custom-control-label"
                                htmlFor={_id}
                              />
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div className="row" key={index}>
                          <div className="col-md-2">
                            <h5>{`${covertCamlinToNormal(prop)}: `}</h5>
                          </div>
                          {!editMode ? displayData(prop) : editComponent(prop)}
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
        <div className="col-md-2 my-auto delete-icon-container">
          <input
            type="image"
            src={deleteIcon}
            alt="Delete Icon"
            className="delete-image"
            onClick={showModalHandler}
          />
        </div>
      </div>
    </>
  );
};

export default Task;
