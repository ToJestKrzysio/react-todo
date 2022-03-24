import React from 'react';
import TasksList from "./TasksList";
import TasksCounter from "./TasksCounter";
import StatusFiltering from "./StatusFiltering";
import ClearCompleted from "./ClearCompleted";

function TasksGroup({tasks, selection, setSelection, handleChangeStatus, handleDeleteTask, handleDeleteCompleted}) {
    if (tasks.length === 0) {
        return ""
    }

    return (
        <div>
            <TasksList
                tasks={tasks}
                handleChangeStatus={handleChangeStatus}
                handleDeleteTask={handleDeleteTask}
                selection={selection}/>
            <TasksCounter tasks={tasks}/>
            <StatusFiltering setSelection={setSelection}/>
            <ClearCompleted tasks={tasks} handleDeleteCompleted={handleDeleteCompleted}/>
        </div>
    )
}

export default TasksGroup;
