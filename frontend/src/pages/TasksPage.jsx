import { useEffect, useState } from "react";
import "../style/TasksPage.css";

import {
  getTasks,
  createTask,
  deleteTask
} from "../services/taskAPI";

function TasksPage() {
  const [view, setView] = useState("Tous");
  const [priority, setPriority] = useState("Toutes");
  const [sort, setSort] = useState("Priorité");
  const [search, setSearch] = useState("");

  const [tasks, setTasks] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState("");
  const [newDuration, setNewDuration] = useState("");
  const [newDate, setNewDate] = useState("");
  const [error, setError] = useState("");

  // 🔄 CHARGER LES TÂCHES (API)
  const loadTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      console.error("Erreur chargement tasks:", err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  // ➕ AJOUT TASK (API)
  const addTask = async () => {
    if (!newTitle || !newPriority || !newDuration || !newDate) {
      setError("Tous les champs obligatoires doivent être remplis.");
      return;
    }

    const newTask = {
      id: Date.now(),
      title: newTitle,
      priority: newPriority,
      status: "En attente",
      duration: newDuration,
      date: newDate
    };

    const createdTask = await createTask(newTask);

    setTasks((prev) => [createdTask, ...prev]);

    // reset
    setNewTitle("");
    setNewPriority("");
    setNewDuration("");
    setNewDate("");
    setError("");
    setShowModal(false);
  };

  // ❌ DELETE TASK (API)
  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // 🔎 FILTER
  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((task) => {
      if (view === "Tous") return true;
      return task.status === view;
    })
    .filter((task) => {
      if (priority === "Toutes") return true;
      return task.priority === priority;
    });

  // ↕ SORT
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === "Priorité") {
      const order = { "Haute": 1, "Moyenne": 2, "Basse": 3 };
      return order[a.priority] - order[b.priority];
    }

    if (sort === "Date de création") {
      return new Date(b.date) - new Date(a.date);
    }

    if (sort === "Échéance") {
      return new Date(a.date) - new Date(b.date);
    }

    return 0;
  });

  return (
    <div className="tasks-page">

      {/* HEADER */}
      <div className="tasks-header">
        {/* GAUCHE */}
        <div className="header-left">
          <h1>Mes devoirs</h1>

          <p className="task-count">
            {tasks.length} {tasks.length <= 1 ? "devoir au total" : "devoirs au total"}
          </p>
        </div>
        <button
          className="add-task-btn"
          onClick={() => setShowModal(true)}
        >
          + Ajouter un devoir
        </button>
      </div>

      {/* SEARCH */}
      <div className="search-container">
        <input
          className="search-input"
          placeholder="Rechercher un devoir par titre ou description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* VUE */}
      <div className="filter-card">
        <div className="filter-row">
          <p className="filter-title-inline">Vue :</p>

          <div className="filter-buttons">
            {["Tous", "Aujourd'hui", "En cours", "Terminés"].map((item) => (
              <button
                key={item}
                className={view === item ? "active" : ""}
                onClick={() => setView(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PRIORITE + TRI */}
      <div className="filter-card">

        <div className="filter-row">
          <p className="filter-title-inline">Priorité :</p>

          <div className="filter-buttons">
            {["Toutes", "Haute", "Moyenne", "Basse"].map((item) => (
              <button
                key={item}
                className={priority === item ? "active" : ""}
                onClick={() => setPriority(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-row">
          <p className="filter-title-inline">Trier :</p>

          <select
            className="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option>Priorité</option>
            <option>Échéance</option>
            <option>Date de création</option>
          </select>
        </div>

      </div>

      {/* TASKS */}
      {sortedTasks.length > 0 ? (
        <div className="tasks-list">

          {sortedTasks.map((task) => (
            <div key={task.id} className="task-card">

              <div className="task-left">

                <h3>{task.title}</h3>

                <div className="task-meta">
                  <span className={`priority ${task.priority?.toLowerCase()}`}> {task.priority} </span>
                  <span>{task.status}</span>
                  <span>{task.date}</span>
                  <span>{task.duration}min</span>
                </div>
              </div>

              <div className="task-actions">

                <button className="icon-btn edit-btn">
                  ✏️
                </button>

                <button
                  className="icon-btn delete-btn"
                  onClick={() => handleDelete(task.id)}>
                  🗑️
                </button>

              </div>

            </div>
          ))}

        </div>
      ) : (
        <div className="empty-card">
          <p className="empty-text">Aucun devoir pour le moment.</p>

          <button className="create-first-task">
            Créer votre premier devoir
          </button>
          
        </div>
      )}

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">

            {/* HEADER */}
            <div className="modal-header">
              <h2>Nouveau devoir</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                ✕
              </button>
            </div>

            <div className="divider" />

            {/* TITRE */}
            <label>Titre du devoir <span className="required">*</span></label>
            <input
              className="input"
              placeholder="Ex: Essai de philosophie"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />

            {/* DESCRIPTION */}
            <label>Description</label>
            <textarea
              className="textarea"
              placeholder="Détails du devoir…"
            />

            {/* PRIORITE + STATUT */}
            <div className="row">

              <div className="col">
                <label>Priorité <span className="required">*</span></label>
                <select
                  className="input"
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                >
                  <option>--- Aucun ---</option>
                  <option>Haute</option>
                  <option>Moyenne</option>
                  <option>Basse</option>
                </select>
              </div>

              <div className="col">
                <label>Statut</label>
                <select className="input">
                  <option>En attente</option>
                  <option>En cours</option>
                  <option>Terminés</option>
                </select>
              </div>

            </div>

            {/* TEMPS + DATE */}
            <div className="row">

              <div className="col">
                <label>Temps estimé (min) <span className="required">*</span></label>
                <input
                  className="input"
                  type="number"
                  value={newDuration}
                  onChange={(e) => setNewDuration(e.target.value)}
                />
              </div>

              <div className="col">
                <label>Date limite <span className="required">*</span></label>
                <input
                  className="input"
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                />
              </div>

            </div>

            {error && (
              <p style={{ color: "#ef4444", fontSize: "13px" }}>
                {error}
              </p>
            )}

            {/* FOOTER */}
            <div className="modal-footer">
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Annuler
              </button>

              <button className="create-btn" onClick={addTask}>
                Créer
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default TasksPage;