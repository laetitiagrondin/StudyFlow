import { Routes, Route, Link } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import TasksPage from "./pages/TasksPage";
import Planning from "./pages/Planning";
import Calendar from "./pages/Calendar";

function App() {
  return (
    <div
      style={{
        padding: "20px 40px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>StudyFlow</h1>

      <nav className="navbar">
        <Link to="/" className="nav-item">Tableau de bord</Link>
        <Link to="/devoirs" className="nav-item">Mes devoirs</Link>
        <Link to="/planning" className="nav-item">Planning</Link>
        <Link to="/calendrier" className="nav-item">Calendrier</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/devoirs" element={<TasksPage />} />
        <Route path="/planning" element={<Planning />} />
        <Route path="/calendrier" element={<Calendar />} />
      </Routes>
    </div>
  );
}

export default App;
