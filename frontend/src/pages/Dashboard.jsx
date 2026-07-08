import { useEffect, useState } from "react";
import "../style/Dashboard.css";
import { getTasks } from "../services/taskAPI";

function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const totalMinutes = tasks.reduce((total, task) => {
    return total + (Number(task.duration) || 0);
  }, 0);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  let formattedTime = "";

  if (hours > 0) {
    formattedTime += `${hours}h`;
  }

  if (minutes > 0) {
    formattedTime += `${minutes}m`;
  }

  if (hours === 0 && minutes === 0) {
    formattedTime = "0m";
  }

  const nextTask = tasks
    .filter(task => task.date && task.status !== "Terminés" && Number(task.duration) > 0)
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

    console.log("nextTask :", nextTask);

  return (
    <div className="dashboard-page">

      {/* HEADER */}

      <div className="dashboard-header">

        <h1>Tableau de bord</h1>

        <p>
          Gérez vos devoirs et planifiez votre travail efficacement
        </p>

      </div>

      {/* STATISTIQUES */}

      <div className="stats-container">

        <div className="stat-card">

          <p>Total des devoirs</p>

          <h2>{tasks.length}</h2>

        </div>

        <div className="stat-card">

          <p>En attente</p>

          <h2>
          {
          tasks.filter(task => task.status === "En attente").length
          }
          </h2>

        </div>

        <div className="stat-card">

          <p>Terminés</p>

          <h2>
          {
          tasks.filter(task => task.status === "Terminé").length
          }
          </h2>

        </div>

        <div className="stat-card">

          <p>En retard</p>

          <h2>
          {
          tasks.filter(task => {
            if (!task.date) return false;

            return (
              new Date(task.date) < new Date() &&
              task.status !== "Terminé"
            );
          }).length
          }
          </h2>

        </div>

      </div>

      {/* CHARGE DU JOUR */}

      <div className="today-card">

        <div className="today-header">

          <h2>Charge du jour</h2>

          <span>— mardi 7 juillet</span>

        </div>

        <div className="today-stats">

          <div className="today-item">

            <h3 className="today-green">
              {formattedTime}
            </h3>

            <p>Planifiées aujourd'hui</p>

          </div>

          <div className="today-item">

            <h3 className="today-blue">0</h3>

            <p>Sessions prévues</p>

          </div>

          <div className="today-item">

            <h3 className="today-orange">
            {
            tasks.filter(task => {

            const today = new Date();
            const taskDate = new Date(task.date);

            return (
              taskDate.getDate() === today.getDate() &&
              taskDate.getMonth() === today.getMonth() &&
              taskDate.getFullYear() === today.getFullYear()
            );

            }).length
            }
            </h3>

            <p>Devoirs dus aujourd'hui</p>

          </div>

        </div>

      </div>

      <div className="dashboard-bottom">

        {/* DEVOIRS À VENIR */}

        <div className="dashboard-card">

          <h2>Devoirs à venir</h2>

          <div className="upcoming-task">

            <div className="task-header">

              <span className="task-title">
              {nextTask ? nextTask.title : "Aucun devoir"}
              </span>

              <span className="task-duration">
              {nextTask && nextTask.duration ? `${nextTask.duration} min`: "—"}
              </span>

            </div>

            <div className="task-footer">

              <span
              className={`priority-badge ${
              nextTask?.priority?.toLowerCase() || "low"
              }`}
              >
              {
              tasks.length > 0
              ? nextTask.priority
              : "Basse"
              }
              </span>

              <span className="task-date">

              {
              tasks.length > 0
              ? nextTask.date
              : "—"
              }

              </span>

            </div>

          </div>

        </div>

        {/* PLANNING */}

        <div className="dashboard-card">

          <h2>Planning d'aujourd'hui</h2>

          <div className="planning-empty">

            Aucune session planifiée aujourd'hui

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;