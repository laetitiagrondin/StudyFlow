import { useEffect, useState } from "react";
import {
    getTasks,
    createTask,
    deleteTask,
} from "../services/taskAPI";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export default function TasksPage() {
    const [tasks, setTasks] = useState([]);

    const loadTasks = async () => {
        setTasks(data);
    };

    useEffect(() => {
        loadTasks();
    }, []);

    const handleCreate = async (task) => {
        await createTask(task);
        loadTasks();
    };

    const handleDelete = async (id) => {
        await deleteTask(id);
        loadTasks;
    };

    return (
        <div>
            <h1>Mes devoirs</h1>

            <TaskForm onCreate={handleCreate} />

            <TaskList tasks={tasks} onDelete={handleDelete} />
        </div>
    );
}
