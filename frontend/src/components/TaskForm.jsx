import { useState } from "react";

export default function TaskForm({ onCreate }) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        priority: "",
        estimatedTime: 1,
        deadline: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(form);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="Title"
                onChange={(e) => setForm({ ...form, title: e.target.value })}
            />

            <input
                placeholder="Description"
                onChange={(e) => setForm({ ...form, Description: e.target.value })}
            />

            <button type="submit">Add Task</button>
        </form>
    );
}
