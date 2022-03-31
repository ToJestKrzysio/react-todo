import './App.css';
import {useEffect, useState} from "react";

import {collection, getDocs, addDoc} from "firebase/firestore"

import {loadFromLocalStorage, saveToLocalStorage} from "./utils/localstorage";

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

    async function addToFirestore(tasks) {
        const data = {};
        tasks.forEach((id, name, status) => data[id] = {name, status})
        const dataRef = db.collection("todos")
        dataRef.forEach((doc) => doc.set(data[doc.id]))
    }

    useEffect(() => {
        setTasks(loadFromLocalStorage("todos"))
    }, [])

    useEffect(() => {
        saveToLocalStorage("todos", tasks)
    }, [tasks])

    function handleChange(event) {
        setValue(event.target.value)
    }

    async function handleKeyUp(event) {
        if (event.key === "Enter" && value !== "") {
            const newTask = {
                name: value,
                status: false
            }

            const docRef = await addDoc(collection(db, "todos"), newTask);
            setTasks([Object.assign(newTask, {id: docRef.id}), ...tasks])
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
