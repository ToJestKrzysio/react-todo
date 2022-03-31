import TaskItem from "./TaskItem";

function TasksList({tasks, selection}) {
    return (
        <ul>
            {tasks
                .filter((e) => selection === "all" || selection === e.status)
                .map(({id, name, status}) =>
                <TaskItem
                    key={id}
                    id={id}
                    name={name}
                    status={status}/>
            )}
        </ul>
    );
}

export default TasksList;
