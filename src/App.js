import './App.css';
import {useEffect, useState} from "react";

import {collection, doc, getDocs, addDoc, updateDoc, deleteDoc, writeBatch} from "firebase/firestore"

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

    async function handleChangeStatus(id) {
        const updatedTask = tasks.filter(task => task.id === id)[0];
        updatedTask.status = !updatedTask.status
        setTasks([...tasks])

        await updateDoc(doc(db, "todos", id), {status: updatedTask.status})
    }

    async function handleDeleteTask(id) {
        await deleteDoc(doc(db, "todos", id));
        setTasks(tasks.filter(task => task.id !== id))

    }

    async function handleDeleteCompleted() {
        const batch = writeBatch(db);
        tasks.forEach(({id, status}) => {
            if(status){
                const ref = doc(db, "todos", id);
                batch.delete(ref)
            }
        })
        await batch.commit()

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
