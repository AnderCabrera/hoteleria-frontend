/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

export const TaskForm = ({ onTaskAdded }) => {
  const [formData, setFormData] = useState({
    taskName: '',
    taskDescription: '',
    dateStart: '',
    dateEnd: '',
    taskStatus: false,
  });

  const { taskName, taskDescription, dateStart, dateEnd, taskStatus } =
    formData;
  const token = localStorage.getItem('token');
  const decoded = jose.decodeJwt(token);

  useEffect(() => {
    const select = document.getElementById('taskStatus');
    const greenBg = 'bg-green-500';
    const redBg = 'bg-red-500';

    if (taskStatus) {
      select.classList.remove(redBg);
      select.classList.add(greenBg);
    } else {
      select.classList.remove(greenBg);
      select.classList.add(redBg);
    }
  }, [taskStatus]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({
      task_name: taskName,
      task_description: taskDescription,
      date_start: new Date(dateStart),
      date_end: new Date(dateEnd),
      task_status: taskStatus,
      user: decoded.id,
    }).then(() => {
      onTaskAdded();
      setFormData({
        taskName: '',
        taskDescription: '',
        dateStart: '',
        dateEnd: '',
        taskStatus: false,
      });
    });
  };

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

    if (e.target.id === 'taskStatus') {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value === 'true',
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#333] shadow-lg rounded p-4 mb-6 w-[50%]"
    >
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="taskName"
        >
          Task Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          id="taskName"
          type="text"
          placeholder="Task Name"
          onChange={changeHandler}
          value={taskName}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="taskDescription"
        >
          Task Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          id="taskDescription"
          placeholder="Task Description"
          onChange={changeHandler}
          value={taskDescription}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="dateStart"
        >
          Date Start
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          id="dateStart"
          type="date"
          placeholder="Date Start"
          onChange={changeHandler}
          value={dateStart}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="dateEnd"
        >
          Date End
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
          id="dateEnd"
          type="date"
          placeholder="Date End"
          onChange={changeHandler}
          value={dateEnd}
        />
      </div>
      <div className="mb-6 flex flex-col">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="taskStatus"
        >
          Task Status
        </label>
        <select
          id="taskStatus"
          onChange={changeHandler}
          className={
            'border rounded py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
          }
          value={taskStatus}
        >
          <option value="false" className="bg-red-400">
            Not Done
          </option>
          <option value="true" className="bg-green-400">
            Done
          </option>
        </select>
      </div>
      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add Task
        </button>
      </div>
    </form>
  );
};