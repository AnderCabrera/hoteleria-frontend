export const getTasks = async () => {
    let response = await fetch('http://localhost:2880/tasks/getTask');
    let data = await response.json();
  
    return data;
  };
  
  export const getTask = async (_id) => {
    let response = await fetch(
      `http://localhost:2880/tasks/getSingleTask/${_id}`,
    );
    let data = await response.json();
  
    return data;
  };
  
  export const addTask = async (task) => {
    let response = await fetch('http://localhost:2880/tasks/addTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token'),
      },
      body: JSON.stringify(task),
    });
  
    let data = await response.json();
  
    return data;
  };
  
  export const updateTask = async (_id, task) => {
    let response = await fetch(`http://localhost:2880/tasks/updateTask/${_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token'),
      },
      body: JSON.stringify(task),
    });
  
    let data = await response.json();
  
    return data;
  };
  
  export const deleteTask = async (_id) => {
    let response = await fetch(`http://localhost:2880/tasks/deleteTask/${_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token: localStorage.getItem('token'),
      },
    });
  
    let data = await response.json();
  
    return data;
  };