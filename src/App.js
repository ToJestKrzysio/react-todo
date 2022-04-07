import './App.scss';
import {useEffect, useState} from "react";

import {collection, onSnapshot} from "firebase/firestore"

import Headline from "./components/Headline";
import TaskInput from "./components/TaskInput";
import TasksGroup from "./components/TasksGroup";
import {db} from "./firebase";


function App() {
    const [tasks, setTasks] = useState([]);
    const [selection, setSelection] = useState("all")

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'todos'), (snapshot) => {
            setTasks(snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })))
        });

        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <div className="App">
            <Headline/>
            <TaskInput/>
            <TasksGroup
                tasks={tasks}
                selection={selection}
                setSelection={setSelection}/>
        </div>
    );
}

export default App;
