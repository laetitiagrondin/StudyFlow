export default function TaskList({ tasks, onDelete }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.title}
          <button onClick={() => onDelete(task.id)}>
            Supprimer
          </button>
        </li>
      ))}
    </ul>
  );
}