import { useState, useEffect } from 'react';
import './styles.css';

export default function App() {
  const [tasks, setTasks] = useState(() =>
    JSON.parse(localStorage.getItem('tasks')) || []
  );
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleMinimize = () => {
  window.api?.windowControl('minimize');
};

const handleClose = () => {
  window.api?.windowControl('close');
};


  const addTask = () => {
    if (!input.trim()) return;
    const newTasks = [...tasks, input];
    setTasks(newTasks);
    setInput('');
    window.api?.notify?.('To-Do Added!', input);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };



  return (
    <div className="todo-card">
      <div className="window-controls">
        <button onClick={handleMinimize} className="btn minimize">_</button>
        <button onClick={handleClose} className="btn close">×</button>
      </div>

      <h2>📝TO-DO List</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && addTask()}
        placeholder="Add a task"
      />
      <ul>
        {tasks.map((task, i) => (
          <li key={i}>
            {task}
            <button onClick={() => deleteTask(i)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

