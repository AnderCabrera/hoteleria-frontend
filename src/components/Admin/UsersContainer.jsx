import { useState } from 'react';
import { User } from './components/User';
import { UpdateModal } from './components/UpdateModal';

const UsersContainer = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    // Fetch users from the server
    getUsers().then(setUsers).catch(console.error);
  }, []);

  const updateHandler = (user) => {
    setSelectedUser(user);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setSelectedUser(null);
  };

  const handleUserUpdate = () => {
    // Re-fetch users or update the users state with the modified user
    getUsers().then(setUsers).catch(console.error);
    closeUpdateModal();
  };

  return (
    <>
      <User
        users={users}
        updateHandler={updateHandler}
        deleteHandler={deleteHandler}
      />
      {isUpdateModalOpen && (
        <UpdateModal
          user={selectedUser}
          onClose={closeUpdateModal}
          onUpdate={handleUserUpdate}
        />
      )}
    </>
  );
};

export default UsersContainer;
