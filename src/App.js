import './App.css';
import {useEffect, useState} from "react";

function loadFromLocalStorage(key) {
    const data = localStorage.getItem(key)
    if (data !== null) {
        return JSON.parse(data);
    }
    return []
}

function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

const uuidGen = () => Math.max(...(loadFromLocalStorage("todos").map(e => e.id)), 0) + 1;


function App() {
    const [value, setValue] = useState("");
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        setTasks(loadFromLocalStorage("todos"))
    }, [])

    useEffect(() => {
        saveToLocalStorage("todos", tasks)
    }, [tasks])

    function handleChange(event) {
        setValue(event.target.value)
    }

    function handleKeyUp(event) {
        if (event.key === "Enter" && value !== "") {
            let newTask = {
                name: value,
                id: uuidGen(),
                status: false
            }
            setTasks([...tasks, newTask])
            setValue("")
        }
    }

    function handleChangeStatus(id) {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                task.status = !task.status
            }
            return task
        }))
    }

    function handleDeleteTask(id) {
        setTasks(tasks.filter(task => task.id !== id))
    }

    return (
        <div className="App">
            <h1>To Do</h1>
            <input type="text"
                   value={value}
                   onChange={handleChange}
                   onKeyUp={handleKeyUp}/>
            <ul>
                {tasks.map(({id, name, status}) => (
                    <li key={id} className="todo-item">
                        <span className={status ? "status done" : "status active"}
                              onClick={() => handleChangeStatus(id)}/>
                        {name}
                        <button className="button-delete"
                                onClick={() => handleDeleteTask(id)}>
                            X
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
