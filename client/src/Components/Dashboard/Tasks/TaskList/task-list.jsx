import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllTasks,
  fetchGroupedTasks
} from "../../../../services/task-service";
import Task from "../Task/task";
import "./task-list.scss";
import { Accordion } from "react-bootstrap";
import { covertCamlinToNormal } from "../../../../utils/utils";

const TaskList = () => {
  const dispatch = useDispatch();
  const groupedTasks = useSelector(state => fetchGroupedTasks(state));
  console.log(groupedTasks, "Grouped Tasks");
  const infoMessage = useSelector(state => state.task.infoMessage);
  useEffect(() => {
    dispatch(getAllTasks());
  }, [dispatch]);

  const Tasks = tasks =>
    tasks.length ? (
      <div className="container">
        {tasks.map(task => {
          return <Task key={task._id} {...task} />;
        })}
      </div>
    ) : infoMessage.length ? (
      <h1 className="text-center my-5 no-todo">{infoMessage}</h1>
    ) : (
      <h1 className="text-center my-5 no-todo">No Tasks!!!</h1>
    );

  const getHeaderClass = (key)=>{
    if(key==="todayTasks")
      return "today-task";
    if(key==="overDueTasks")
      return "overdue-task";
    return "upcoming-task";
  }
  return (
    <div className="my-5 px-5">
      {Object.keys(groupedTasks).map(key => {
        return (
          <Accordion defaultActiveKey="0">
            <Accordion.Item>
              <Accordion.Header>
                <h2 className={getHeaderClass(key)}>{covertCamlinToNormal(key)}</h2>
              </Accordion.Header>
              <Accordion.Body>{Tasks(groupedTasks[key])}</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      })}
      {/* </div> */}
    </div>
  );
};

export default TaskList;
