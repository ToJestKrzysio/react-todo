import React from 'react';
import TasksList from "./TasksList";
import TasksCounter from "./TasksCounter";
import StatusFiltering from "./StatusFiltering";
import ClearCompleted from "./ClearCompleted";
import {doc, writeBatch} from "firebase/firestore";
import {db} from "../firebase";

function TasksGroup({tasks, selection, setSelection}) {
    if (tasks.length === 0) {
        return ""
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
    }

    return (
        <div>
            <TasksList
                tasks={tasks}
                selection={selection}/>
            <TasksCounter tasks={tasks}/>
            <StatusFiltering setSelection={setSelection}/>
            <ClearCompleted tasks={tasks} handleDeleteCompleted={handleDeleteCompleted}/>
        </div>
    )
}

export default TasksGroup;
