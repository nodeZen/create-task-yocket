import axios from "axios";
import {
  setNewtaskList,
  setInfoMessage,
} from "../store/task-slice";


const getPriorityFlag = (task)=>{
  switch(task.toLowerCase()){
    case "high":return 1;
    case "medium":return 2;
    default : return 3;
  }
}
export const getAllTasks = () => (dispatch) => {
  dispatch(setInfoMessage("Loading..!!"));
  return axios
    .get("/tasks/get-all", {
      headers: {
        token: localStorage.token,
      },
    })
    .then((response) => {
      if(response && Array.isArray(response.data.completeTasks)) {
        const tasks = response.data.completeTasks.map(task=>({
          ...task,priorityFlag: getPriorityFlag(task.priority)
        }));
        tasks.sort((a,b)=>a.priorityFlag-b.priorityFlag);
        console.log(tasks);
        if(!response.data.completeTasks.length) {
          dispatch(setInfoMessage("No Tasks Created..!!!"));
        }else{
          dispatch(setInfoMessage(""));
        }
        dispatch(setNewtaskList(tasks));
      } 
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editTask = (taskData) => (dispatch) => {
  const {_id} = taskData;
  if(!_id){
    return null;
  }
  return axios
    .patch(`/tasks/update-task/${_id}`,taskData, {
      headers: {
        token: localStorage.token,
      },
    })
    .then((response) => {
      dispatch(getAllTasks());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addTask = (taskData) => (dispatch) => {
  return axios
    .post(`tasks/add-task/`,taskData, {
      headers: {
        token: localStorage.token,
      },
    })
    .then((response) => {
      dispatch(getAllTasks());
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteTask = (id) => (dispatch) => {
  return axios
    .delete(`tasks/delete-task/${id}`, {
      headers: {
        token: localStorage.token,
      },
    })
    .then((response) => {
      dispatch(getAllTasks());
    })
    .catch((err) => {
      console.log(err);
    });
};

