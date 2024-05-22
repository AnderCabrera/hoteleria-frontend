import { useEffect, useState } from 'react';
import { User } from './User.jsx';
import { UserForm } from './UserForm.jsx';
import {
  getUsers,
  deleteUser,
  getUser,
  addUser,
} from '../../services/user.service.js';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import withReactContent from 'sweetalert2-react-content';
import '../../output.css';
import { UpdateModal } from './UpdateModal.jsx';
import MyNavbar from '../Navbar.jsx';

export const UserAdmin = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({});
  const ReactSwal = withReactContent(Swal);

  useEffect(() => {
    getUsers()
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        ReactSwal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          showConfirmButton: true,
        });
      });
  }, []);

  const handleUserAdded = () => {
    getUsers()
      .then((data) => {
        setUsers(data);
        ReactSwal.fire({
          title: 'Success',
          text: 'User added successfully',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        ReactSwal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          showConfirmButton: true,
        });
      });
  };

  const handleUserUpdated = (e) => {
    const userId = e.target.closest('tr').id;
    getUser(userId)
      .then((data) => {
        setUser(data);
        setShowModal(true);
      })
      .catch((error) => {
        ReactSwal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          showConfirmButton: true,
        });
      })
      .catch((error) => {
        ReactSwal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          showConfirmButton: true,
        });
      });
  };

  const handleUserDeleted = (e) => {
    const userId = e.target.closest('tr').id;
    deleteUser(userId)
      .then((data) => {
        getUsers()
          .then((data) => {
            setUsers(data);
            ReactSwal.fire({
              title: 'Success',
              text: 'User deleted successfully',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            ReactSwal.fire({
              title: 'Error',
              text: error.message,
              icon: 'error',
              showConfirmButton: true,
            });
          });
      })
      .catch((error) => {
        ReactSwal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          showConfirmButton: true,
        });
      });
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalUpdate = () => {
    getUsers()
      .then((data) => {
        setUsers(data);
        ReactSwal.fire({
          title: 'Success',
          text: 'User updated successfully',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        ReactSwal.fire({
          title: 'Error',
          text: error.message,
          icon: 'error',
          showConfirmButton: true,
        });
      });
  };

  return (
    <div className="bg-[#111]">
      <MyNavbar></MyNavbar>
      <div className="task-form-container w-full flex flex-col items-center">
        <UserForm onUserAdded={handleUserAdded} />
      </div>
      <div className="tasks-container w-full flex flex-col items-center">
        <User
          users={users}
          updateHandler={handleUserUpdated}
          deleteHandler={handleUserDeleted}
        />
      </div>
      {showModal && (
        <UpdateModal
          user={user}
          onClose={handleModalClose}
          onUpdate={handleModalUpdate}
        />
      )}
    </div>
  );
};
