import axios from "axios";
import { setNewtaskList, setInfoMessage } from "../store/task-slice";
import { createSelector } from "@reduxjs/toolkit";
import { getTense } from "../utils/utils";

const getPriorityFlag = task => {
  switch (task.toLowerCase()) {
    case "high":
      return 1;
    case "medium":
      return 2;
    default:
      return 3;
  }
};
export const getAllTasks = () => dispatch => {
  dispatch(setInfoMessage("Loading..!!"));
  return axios
    .get("/tasks/get-all", {
      headers: {
        token: localStorage.token
      }
    })
    .then(response => {
      if (response && Array.isArray(response.data.completeTasks)) {
        console.log(response.data.completeTasks, "Response");
        if (!response.data.completeTasks.length) {
          dispatch(setInfoMessage("No Tasks Created..!!!"));
        } 
        dispatch(setInfoMessage(""));
        dispatch(setNewtaskList(response.data.completeTasks));
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const editTask = taskData => dispatch => {
  const { _id } = taskData;
  if (!_id) {
    return null;
  }
  return axios
    .patch(`/tasks/update-task/${_id}`, taskData, {
      headers: {
        token: localStorage.token
      }
    })
    .then(response => {
      dispatch(getAllTasks());
    })
    .catch(err => {
      console.log(err);
    });
};

export const addTask = taskData => dispatch => {
  return axios
    .post(`tasks/add-task/`, taskData, {
      headers: {
        token: localStorage.token
      }
    })
    .then(response => {
      dispatch(getAllTasks());
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteTask = id => dispatch => {
  return axios
    .delete(`tasks/delete-task/${id}`, {
      headers: {
        token: localStorage.token
      }
    })
    .then(response => {
      dispatch(getAllTasks());
    })
    .catch(err => {
      console.log(err);
    });
};

export const fetchGroupedTasks = createSelector(
  (state) => state.task.taskList,
  (taskList) => {
    const groupedTasks = {
      overDueTasks:[],
      todayTasks:[],
      upcomingTasks:[]
    };
    if(Array.isArray(taskList) && taskList.length){
      taskList.forEach(task=>{
        const diff = getTense(task.deadline);
        console.log(diff);
        switch(diff){
          case 1: groupedTasks["upcomingTasks"].push(task);
                  break;
          case -1:groupedTasks["overDueTasks"].push(task);
                  break;
          case 0:groupedTasks["todayTasks"].push(task);
                  break;
          default:break;
        }
      });
      Object.keys(groupedTasks).forEach(key=>{
        const dayTasks = groupedTasks[key].map(task => ({
          ...task,
          priorityFlag: getPriorityFlag(task.priority)
        }));
        dayTasks.sort((a, b) => a.priorityFlag - b.priorityFlag);
        groupedTasks[key] = dayTasks;
      });      
    }
    return groupedTasks;
  }
);

