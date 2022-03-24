import TaskDetails from "./TaskDetails";

function TasksList({tasks, selection, handleChangeStatus, handleDeleteTask}) {
    return (
        <ul>
            {tasks
                .filter((e) => selection === "all" || selection === e.status)
                .map(({id, name, status}) =>
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
