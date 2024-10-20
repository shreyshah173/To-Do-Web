import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('https://to-do-web-by15.onrender.com/api/tasks');
    setTasks(response.data);
  };

  const addTask = async () => {
    if (newTask) {
      const response = await axios.post('https://to-do-web-by15.onrender.com/api/tasks', { text: newTask });
      setTasks([...tasks, response.data]);
      setNewTask('');
    }
  };

  const deleteTask = async (id) => {
    await axios.delete(`https://to-do-web-by15.onrender.com/api/tasks/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
  };

  const toggleCompletion = async (id) => {
    const response = await axios.patch(`https://to-do-web-by15.onrender.com/api/tasks/${id}/completed`);
    setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
  };

  const updateTask = async (id, text) => {
    const response = await axios.put(`https://to-do-web-by15.onrender.com/api/tasks/${id}`, { text });
    setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f4f8', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '500px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '20px', color: '#333' }}>To-Do List</h1>
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task"
            style={{ flexGrow: 1, padding: '10px', border: '1px solid #ccc', borderRadius: '4px 0 0 4px', outline: 'none' }}
          />
          <button
            onClick={addTask}
            style={{
              backgroundColor: '#1e90ff',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '0 4px 4px 0',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#1c86ee')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#1e90ff')}
          >
            Add Task
          </button>
        </div>

        <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
          {tasks.map((task) => (
            <li
              key={task._id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#f9f9f9',
                padding: '10px',
                marginBottom: '10px',
                borderRadius: '6px',
                border: '1px solid #e0e0e0',
              }}
            >
              <input
                type="text"
                value={task.text}
                onChange={(e) => updateTask(task._id, e.target.value)}
                style={{
                  flexGrow: 1,
                  padding: '8px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  textDecoration: task.isCompleted ? 'line-through' : 'none',
                  color: task.isCompleted ? '#999' : '#333',
                  marginRight: '10px',
                }}
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => toggleCompletion(task._id)}
                  style={{
                    backgroundColor: task.isCompleted ? '#f39c12' : '#27ae60',
                    color: 'white',
                    padding: '6px 10px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = task.isCompleted ? '#e67e22' : '#2ecc71')
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = task.isCompleted ? '#f39c12' : '#27ae60')
                  }
                >
                  {task.isCompleted ? 'Unmark' : 'Mark'}
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  style={{
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    padding: '6px 10px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#c0392b')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = '#e74c3c')}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
