import './App.css';
import { useState, useEffect, useContext } from 'react';
import axios from "axios";
import Task from './components/Task';
import { ThemeContext } from './components/theme-context';

function App() {

  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);
  const [isShowCompleted, setShowCompleted] = useState(false);
  const [isUpdating, setUpdating] = useState("");
  const [date, setDate] = useState("");
  const [isDone, setDone] = useState(false);

  useEffect(() => {
    if(isShowCompleted) {
      axios.get("http://localhost:3000/get-todo")
      .then((res) => setTodo(res.data))
      .catch((err) => console.log(err));
    } else {
      axios.get("http://localhost:3000/get-todo-not-done")
      .then((res) => setTodo(res.data))
      .catch((err) => console.log(err));
    }
  })

  useEffect(() => {
    const isShowCompleted = localStorage.getItem('isShowCompleted') === 'true'
    setShowCompleted(isShowCompleted);
  }, [isShowCompleted])

  const addUpdateTodo = () => {

    if (isUpdating === "") {
      axios.post("http://localhost:3000/save-todo", { text, date })
        .then((res) => {
          console.log(res.data);
          setText("");
          setDate(new Date());
        })
        .catch((err) => console.log(err));
    }else{
      axios.post("http://localhost:3000/update-todo", { _id: isUpdating, text, date, isDone })
        .then((res) => {
          console.log(res.data);
          setText("");
          setUpdating("");
          setDate(new Date());
          setDone(false)
        })
        .catch((err) => console.log(err));
    }
  }

  const deleteTodo = (_id) => {
    axios.post("http://localhost:3000/delete-todo", { _id })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  const updateTodoStatus = (_id, isDone) => {
    axios.post("http://localhost:3000/update-todo-status", { _id, isDone})
        .then((res) => {
          console.log(res.data);
          setText("");
          setUpdating("");
          setDate(new Date());
          setDone(false);
        })
        .catch((err) => console.log(err));
  }

  const updateTodo = (_id, text, date) => {
    setUpdating(_id);
    setText(text);
    setDate(date);
  }

  const selectTodoFilter = () => {
    const showCompleted = !isShowCompleted;
    localStorage.setItem('isShowCompleted', JSON.stringify(showCompleted))
    setShowCompleted(showCompleted);
  }

  const { theme, dark ,toggle } = useContext(ThemeContext)

  return (
    <div className="App" style={{ backgroundColor: theme.backgroundColor, color: theme.color }}>
      <div className="container">
        <h1>TODO App</h1>
        <div className="top">
          <input
            type="text"
            className="textInput"
            maxLength="20"
            placeholder='Fill what u gonna do...'
            value={text}
            onChange={(e) => setText(e.target.value)} />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)} />
          <div className="add"
            onClick={addUpdateTodo}>{isUpdating ? "Update" : "Add"}
          </div>
        </div>
        
        <div className="switchTheme">
          <label>Show Completed</label>
          <label className="switch">
            <input type="checkbox" checked = {isShowCompleted} onChange={selectTodoFilter}></input>
            <span className="slider round"></span>
          </label>
          <label>Change Apperance</label>
          <label className="switch">
            <input type="checkbox"  checked = {dark} onChange={toggle}/>
            <span className="slider round"></span>
          </label>
        </div>

        <div className="list">
          <div className='title'>
            <div className = "text">Todo</div>
            <div className = "date">Due Date</div>
          </div>
          {todo.map(task => 
          <Task
            key={task._id}
            text={task.text}
            date={task.date}
            isDone={task.isDone}
            done={()=> updateTodoStatus(task._id, true)}
            remove={() => deleteTodo(task._id)}
            update={() => updateTodo(task._id, task.text, task.date, task.done)} />)}
        </div>

      </div>
    </div>
  );
}

export default App;