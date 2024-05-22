import '../../output.css';

export const User = ({ users, updateHandler, deleteHandler }) => {
  return (
    <>
      <table className="table-auto w-[75%] justify-center border mb-10">
        <thead className="">
          <tr className="bg-slate-900">
            <th className="text-white">Username</th>
            <th className="text-white">Email</th>
            <th className="text-white">Name</th>
            <th className="text-white">Role</th>
            <th className="text-white">Tp Status</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr
                key={index}
                className="even:bg-[#222] odd:bg-[#333] text-center text-white"
                id={user._id}
              >
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  {user.name} {user.lastname}
                </td>
                <td>{user.role}</td>
                <td>{user.tp_status}</td>
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
                No users available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};
