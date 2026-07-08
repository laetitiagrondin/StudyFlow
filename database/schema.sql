CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    priority VARCHAR(20),
    estimatedTime INT,
    deadline DATE,
    status VARCHAR(20)
);
