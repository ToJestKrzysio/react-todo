import './App.css';
import {useEffect, useState} from "react";

import {loadFromLocalStorage, saveToLocalStorage} from "./utils/localstorage";
import uuidGen from "./utils/uuid";

import Headline from "./components/Headline";
import TaskInput from "./components/TaskInput";
import TasksList from "./components/TasksList";


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
            <Headline/>
            <TaskInput
                value={value}
                handleChange={handleChange}
                handleKeyUp={handleKeyUp}/>
            <TasksList
                tasks={tasks}
                handleChangeStatus={handleChangeStatus}
                handleDeleteTask={handleDeleteTask}/>
        </div>
    );
}

export default App;
