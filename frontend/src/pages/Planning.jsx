import { useState } from "react";
import "../style/Planning.css";
import { getTasks } from "../services/taskAPI";

function Planning() {
  const [planningGenerated, setPlanningGenerated] = useState(false);

  const [sessions, setSessions] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [workDays, setWorkDays] = useState(0);

  const handleGeneratePlanning = async () => {
    const tasks = await getTasks();

    if (!tasks || tasks.length === 0) {
      setSessions(0);
      setTotalHours(0);
      setWorkDays(0);
      setPlanning([]);
      setPlanningGenerated(true);
      return;
    }

  const handleGeneratePlanning = async () => {
    try {

      const tasks = await getTasks();

      if (!tasks || tasks.length === 0) {
        setSessions(0);
        setTotalHours("0m");
        setWorkDays(0);
        setPlanning([]);
        setPlanningGenerated(true);
        return;
      }


      const generated = await generatePlanning();


      setPlanning(generated || []);

      setSessions(generated?.length || 0);


      const totalMinutes = (generated || []).reduce(
        (sum, session) => {
          return sum + Number(session.duration || 0);
        },
        0
      );


      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;

      let time = "";

      if (hours > 0) {
        time += `${hours}h`;
      }

      if (minutes > 0) {
        time += `${minutes}m`;
      }

      if (!time) {
        time = "0m";
      }


      setTotalHours(time);


      const days = [
        ...new Set(
          (generated || []).map(session => session.date)
        )
      ];

      setWorkDays(days.length);


      setPlanningGenerated(true);


    } catch (error) {

      console.error("Erreur génération planning :", error);

    }
  };

    let totalMinutes = 0;
    let generatedPlanning = [];

    const priorityOrder = { "Haute": 1, "Moyenne": 2, "Basse": 3 };

    const sortedTasks = [...tasks].sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );

    sortedTasks.forEach((task) => {
      const duration = task.duration || 60;

      totalMinutes += Number(duration);

      let remaining = duration;

      while (remaining > 0) {
        const sessionTime = Math.min(60, remaining);

        sessionsArray.push({
          title: task.title,
          duration: sessionTime
        });

        remaining -= sessionTime;
      }
    });

    const days = Math.ceil(sessionsArray.length / 3);

    setSessions(generatedPlanning.length);
    setTotalHours((totalMinutes / 60).toFixed(1));
    setWorkDays(Math.ceil(generatedPlanning.length / 3));

    setPlanning(generatedPlanning);
    setPlanningGenerated(true);
  };

  return (
    <div className="planning-page">

      {/* Header */}
      <div className="planning-header">

        <div>
          <h1 className="planning-title">
            Planning automatique
          </h1>
        </div>

        <button
          className="generate-btn"
          onClick={handleGeneratePlanning}
        >
          Générer le planning
        </button>

      </div>

      {/* STATISTIQUES */}
      <div className="planning-stats">

        <div className="stat-card">
          <p>Sessions planifiées</p>
          <h2>{sessions}</h2>
        </div>

        <div className="stat-card">
          <p>Temps total</p>
          <h2>{totalHours} h</h2>
        </div>

        <div className="stat-card">
          <p>Jours de travail</p>
          <h2>{workDays}</h2>
        </div>

      </div>

      {/* CONTENU */}
      {!planningGenerated ? (
        <div className="planning-empty">

          <h3>Aucun planning généré</h3>

          <p>
            Cliquez sur Générer le planning pour organiser vos devoirs automatiquement.
          </p>

        </div>
      ) : (
        <div className="planning-content">

          {planning.map((session, index) => (
            <div className="planning-session" key={index}>
              <h3>{session.title}</h3>
              <p>{session.duration} min</p>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Planning;