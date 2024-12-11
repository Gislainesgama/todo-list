import React, { useState, useEffect } from 'react';
import './index.css'; 
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';



const App = () => {

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const addTask = () => {
    if (newTask.trim()) {
      const updatedTasks = [...tasks, { text: newTask, completed: false }];
      setTasks(updatedTasks);
      setNewTask('');
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
  };

  const toggleCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div className="image-container">
      <div className="yellow-rectangle">
        <h1 className="text">Lista de Tarefas</h1>

        <div className="input-container">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Digite uma tarefa"
            className="pink-shape"
          />
          <button onClick={addTask} className="button-primary">
            Adicionar
          </button>
        </div>

        <ul className="task-list">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`todo-item ${task.completed ? 'completed' : ''}`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompletion(index)}
              />
              <span>{task.text}</span>
              <button className="delete" onClick={() => deleteTask(index)}> <DeleteOutlineIcon /></button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
