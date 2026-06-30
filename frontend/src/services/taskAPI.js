const API_URL = "http://localhost:3000/api";

export const getTasks = async () => {
    const res = await fetch(`${API_URL}/tasks`);
    return res.json();
};

export const createTask = async (task) => {
    const res = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
    return res.json();
};

export const updateTask = async (id, task) => {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
    });
    return res.json();
};

export const deleteTask = async (id) => {
    await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
    });
};
