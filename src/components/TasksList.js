import TaskDetails from "./TaskDetails";

function TasksList({tasks, handleChangeStatus, handleDeleteTask}) {
    return (
        <ul>
            {tasks.map(({id, name, status}) =>
                <TaskDetails
                    key={id}
                    id={id}
                    name={name}
                    status={status}
                    handleChangeStatus={handleChangeStatus}
                    handleDeleteTask={handleDeleteTask}/>
            )}
        </ul>
    );
}

export default TasksList;
