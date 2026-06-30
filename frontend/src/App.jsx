import { useEffect, useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/tasks")
      .then((res) => res.text())
      .then((data) => setTasks(data));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>StudyFlow Dashboard</h1>

      <h2>Tasks</h2>

      <ul>
        <li>{tasks}</li>
      </ul>
    </div>
  );
}
