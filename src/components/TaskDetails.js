function TaskDetails({id, name, status, handleChangeStatus, handleDeleteTask}) {
    return (
        <li className="todo-item">
            <span
                className={status ? "status done" : "status active"}
                onClick={() => handleChangeStatus(id)}/>
            {name}
            <button className="button-delete" onClick={() => handleDeleteTask(id)}>X</button>
        </li>
    );
}

export default TaskDetails;
