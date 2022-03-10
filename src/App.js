import './App.css';
import {useState} from "react";

function* uuid_generator() {
    let id = 0;
    while (true) {
        yield id
        id++;
    }
}

const uuid = uuid_generator()


function App() {
    const [value, setValue] = useState("");
    const [tasks, setTasks] = useState([]);

    function handleChange(event) {
        setValue(event.target.value)
    }

    function handleKeyUp(event) {
        if (event.key === "Enter" && value !== "") {
            let newTask = {
                name: value,
                id: uuid.next().value,
                status: false
            }
            const newTasks = [...tasks, newTask]
            setTasks(newTasks)
            setValue("")
        }
    }

    function handleChangeStatus(id) {
        const newTasks = tasks.map(task => {
            if (task.id === id) {
                task.status = !task.status
            }
            return task
        })
        setTasks(newTasks)
    }

    function handleDeleteTask(id) {
        const newTasks = tasks.filter(task => task.id !== id)
        setTasks(newTasks)
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
