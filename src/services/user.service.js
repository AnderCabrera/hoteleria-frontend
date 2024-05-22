export const getUsers = async () => {
  let response = await fetch('http://localhost:2880/user/getUsers');
  if (!response.ok) throw new Error('Failed to fetch user');
  let data = await response.json();
  return data.users;
};

export const getUser = async (_id) => {
  let response = await fetch(`http://localhost:2880/user/search/${_id}`);
  let data = await response.json();
  if (!response.ok) throw new Error('Failed to fetch user');
  console.log(data);
  return data.foundedUser.foundedUser;
};

export const addUser = async (user) => {
  let response = await fetch('http://localhost:2880/user/newUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: localStorage.getItem('token'),
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error('Failed to add user');
  let data = await response.json();
  return data;
};

export const updateUser = async (_id, user) => {
  let response = await fetch(`http://localhost:2880/user/update/${_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      token: localStorage.getItem('token'),
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) throw new Error('Failed to fetch user');
  let data = await response.json();
  return data;
};

export const deleteUser = async (_id) => {
  let response = await fetch(`http://localhost:2880/user/delete/${_id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: localStorage.getItem('token'),
    },
  });
  if (!response.ok) throw new Error('Failed to delete user');
  let data = await response.json();
  return data;
};
