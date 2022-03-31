import './App.css';
import {useEffect, useState} from "react";

import {collection, getDocs} from "firebase/firestore"

import {loadFromLocalStorage, saveToLocalStorage} from "./utils/localstorage";
import uuidGen from "./utils/uuid";

import Headline from "./components/Headline";
import TaskInput from "./components/TaskInput";
import TasksGroup from "./components/TasksGroup";
import {db} from "./firebase";


function App() {
    const [value, setValue] = useState("");
    const [tasks, setTasks] = useState([]);
    const [selection, setSelection] = useState("all")

    const getData = async () => {
        const querySnapshot = await getDocs(collection(db, "todos"));
        setTasks(querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        })));
    }

    useEffect(getData, [])

    async function saveToFirestore(tasks) {
        const data = tasks.map((id, name, status) => ({id, data: {name, status}}))
        const dataRef = db.collection("todos")
        dataRef.get().forEach((doc) => doc.set())
    }

    useEffect(() => {
        setTasks(loadFromLocalStorage("todos"))
    }, [])

    useEffect(() => {
        saveToLocalStorage("todos", tasks)
        saveToFirestore(tasks)
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

    function handleDeleteCompleted() {
        setTasks(tasks.filter(task => !task.status))
    }

    return (
        <div className="App">
            <Headline/>
            <TaskInput
                value={value}
                handleChange={handleChange}
                handleKeyUp={handleKeyUp}/>
            <TasksGroup
                tasks={tasks}
                selection={selection}
                setSelection={setSelection}
                handleChangeStatus={handleChangeStatus}
                handleDeleteTask={handleDeleteTask}
                handleDeleteCompleted={handleDeleteCompleted}/>
        </div>
    );
}

export default App;
