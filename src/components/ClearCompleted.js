import React from 'react';

function ClearCompleted({tasks, handleDeleteCompleted}) {
    if (tasks.filter(t => t.status).length === 0) {
        return ""
    }

    return (<button onClick={handleDeleteCompleted}>Clear Completed</button>);
}

export default ClearCompleted;
