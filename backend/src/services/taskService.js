import { pool } from "../config/db.js";

export const createTask = async (task) => {
    const result = await pool.query(
        `INSERT INTO tasks (title, description, priority, estimatedTime, deadline, status)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [
            task.title,
            task.description,
            task.priority,
            task.estimatedTime,
            task.deadline,
            "todo"
        ]
    );
    return result.rows[0];
};

export const getTasks = async () => {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id DESC");
    return result.rows;
};

export const updateTask = async (id, task) => {
    const rsult = await pool.query(
        `UPDATE tasks SET title=$1, description=$2, priority=$3, estimatedTime=$4, deadline=$5, status=$6
        WHERE id=$7 RETURNING *`,
        [
            task.title,
            task.description,
            task.priority,
            task.estimatedTime,
            task.deadline,
            task.status,
            id,
        ]);
    return result.rows[0];
}

export const deleteTask = async (id) => {
    await pool.query("DELETE FROM tasks WHERE id=$1", [id]);
};
