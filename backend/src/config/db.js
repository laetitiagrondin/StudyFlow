import pkg from "pg";

const { Pool } = pkg;

export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "studyflow",
    password: "password",
    port: 5432,
});
