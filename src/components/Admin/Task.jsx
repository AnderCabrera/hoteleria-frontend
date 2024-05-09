/* eslint-disable react/prop-types */
import '../output.css';

export const Task = ({ tasks, updateHandler, deleteHandler }) => {
  return (
    <>
      <table className="table-auto w-[75%] justify-center border mb-10">
        <thead className="">
          <tr className="bg-slate-900">
            <th className="text-white">Task Name</th>
            <th className="text-white">Task Description</th>
            <th className="text-white">Date Start</th>
            <th className="text-white">Date End</th>
            <th className="text-white">Task Status</th>
            <th className="text-white">User</th>
            <th className="text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <tr
                key={index}
                className="even:bg-[#222] odd:bg-[#333] text-center text-white"
                id={task._id}
              >
                <td>{task.task_name}</td>
                <td>{task.task_description}</td>
                <td>{new Date(task.date_start).toDateString()}</td>
                <td>{new Date(task.date_end).toDateString()}</td>
                <td>
                  {task.task_status ? (
                    <span className="text-green-600">Completed</span>
                  ) : (
                    <span className="text-red-600">Incomplete</span>
                  )}
                </td>
                <td>
                  {task.user.name} {task.user.lastname}
                </td>
                <td>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded m-1"
                    onClick={updateHandler}
                  >
                    <i className="fa-solid fa-pencil"></i>
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 px-3 rounded m-1"
                    onClick={deleteHandler}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center h-[20vh] text-white">
                No tasks available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};  