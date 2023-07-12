import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Dashboard.css";

const serverURL = process.env.REACT_APP_SERVER_URL;

function Dashboard() {
  const [notCompletedTasks, setNotCompletedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const notCompletedResponse = await axios.get(
        `${serverURL}/api/tasks/notcompleted`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const completedResponse = await axios.get(
        `${serverURL}/api/tasks/completed`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setNotCompletedTasks(notCompletedResponse.data);
      setCompletedTasks(completedResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${serverURL}/api/tasks`,
        {
          title: taskName,
          description: taskDescription,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(response.data);
      setTaskName("");
      setTaskDescription("");
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${serverURL}/api/tasks/${taskId}/complete`, null, {
        headers: {
          Authorization: `${token}`,
        },
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleNotCompleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${serverURL}/api/tasks/${taskId}/notcomplete`, null, {
        headers: {
          Authorization: `${token}`,
        },
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditTask = async (taskId) => {
    // Find the task with the given ID
    const task = [...notCompletedTasks, ...completedTasks].find(
      (task) => task._id === taskId
    );

    // Set the task details
    setTaskName(task.title);
    setTaskDescription(task.description);

    // Set the edit task ID and show the popup
    setEditTaskId(taskId);
    setShowPopup(true);
  };

  const handleUpdateTask = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${serverURL}/api/tasks/${editTaskId}`,
        {
          title: taskName,
          description: taskDescription,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      console.log(response.data);
      fetchTasks();
      closePopup();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${serverURL}/api/tasks/${taskId}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const closePopup = () => {
    // Reset the task details and hide the popup
    setTaskName("");
    setTaskDescription("");
    setEditTaskId(null);
    setShowPopup(false);
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <form className="dashboard__form" onSubmit={handleCreateTask}>
        <input
          type="text"
          className="dashboard__input"
          placeholder="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
        <textarea
          className="dashboard__textarea"
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          required
        ></textarea>
        <button type="submit" className="dashboard__button">
          Create Task
        </button>
      </form>
      {notCompletedTasks.length === 0 ? (
        <p className="dashboard__message">No tasks available</p>
      ) : (
        <>
          <h2 className="dashboard__table-heading">Not Completed Tasks</h2>
          <table className="dashboard__table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notCompletedTasks.map((task) => (
                <tr key={task._id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td className="dashboard__action-cell">
                    <button
                      className="dashboard__task-button"
                      onClick={() => handleCompleteTask(task._id)}
                    >
                      Complete
                    </button>
                    <button
                      className="dashboard__task-button"
                      onClick={() => handleEditTask(task._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="dashboard__task-button"
                      onClick={() => handleDeleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {completedTasks.length === 0 ? (
        <p className="dashboard__message">No completed tasks available</p>
      ) : (
        <>
          <h2 className="dashboard__table-heading">Completed Tasks</h2>
          <table className="dashboard__table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {completedTasks.map((task) => (
                <tr key={task._id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td className="dashboard__action-cell">
                    <button
                      className="dashboard__task-button"
                      onClick={() => handleNotCompleteTask(task._id)}
                    >
                      Not Complete
                    </button>
                    <button
                      className="dashboard__task-button"
                      onClick={() => handleEditTask(task._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="dashboard__task-button"
                      onClick={() => handleDeleteTask(task._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      {showPopup && (
        <div className="dashboard__popup">
          <div className="dashboard__popup-content">
            {/* Content of the popup menu */}
            <input
              type="text"
              className="dashboard__input"
              placeholder="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />
            <textarea
              className="dashboard__textarea"
              placeholder="Task Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              required
            ></textarea>
            <button className="dashboard__button" onClick={closePopup}>
              Cancel
            </button>
            <button
              type="submit"
              className="dashboard__button"
              onClick={handleUpdateTask}
            >
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
