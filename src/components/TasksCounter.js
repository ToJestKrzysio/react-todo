import React from 'react';

function TasksCounter({tasks}) {
    const taskNumber = tasks.filter(t => !t.status).length
    return (
        <p>{taskNumber} {taskNumber === 1 ? "item" : "items"} left</p>
    );
}

export default TasksCounter;
