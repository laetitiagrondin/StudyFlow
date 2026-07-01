export default function TaskItem({ task, onDelete }) {
    return (
        <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.priority}</p>

            <button onClick={() => onDelete(task.id)}>Delete</button>
        </div>
    );
}
