import React, { useEffect, useState } from "react";

const Task = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("");
  const [resTask, setResTask] = useState();
  const [filterItem, setFilterItem] = useState("");

  const createTask = (e) => {
    e.preventDefault();
    const data = localStorage.getItem("loggedInUser");
    const userData = JSON.parse(data);
    if (userData.isLoggedIn === true) {
      let id = Date.now();
      let user = userData.id;
      let status = "pending";
      let task = { title, description, date, priority, id, user, status };
      localStorage.setItem("task-" + id, JSON.stringify(task));
      const task1 = Object.keys(localStorage)
        .filter((key) => key.startsWith("task-"))
        .map((key) => JSON.parse(localStorage.getItem(key)));
      setResTask(task1);
    }
  };

  useEffect(() => {
    const task2 = Object.keys(localStorage)
      .filter((key) => key.startsWith("task-"))
      .map((key) => JSON.parse(localStorage.getItem(key)));
    setResTask(task2);

    if (filterItem !== "default") {
      const filteredItems = task2.filter((item) =>
        item.status.toLowerCase().includes(filterItem.toLowerCase())
      );
      setResTask(filteredItems);
    }
  }, [filterItem]);

  const handleFilterChange = (e) => {
    setFilterItem(e.target.value);
  };

  const sortItemsByDate = (e) => {
    const sortedItems = [...resTask].sort((a, b) => {
      const dateA = new Date(a.id);
      const dateB = new Date(b.id);
      return dateA - dateB;
    });

    setResTask(sortedItems);
  };

  const sortItemsByPriority = (e) => {
    const sortedItems = [...resTask].sort((a, b) => {
      const p1 = a.priority;
      const p2 = b.priority;
      return p1 - p2;
    });

    setResTask(sortedItems);
  };

  return (
    <>
      <div className="signup-container">
        <h2>Create a Task</h2>
        <form className="signup-form">
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            name="description"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="date"
            name="date"
            placeholder="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="number"
            name="priority"
            placeholder="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          />
          <button type="submit" onClick={createTask}>
            Create Task
          </button>
        </form>
      </div>

      <h1>Task List</h1>

      <div>
        <select
          onChange={handleFilterChange}
          style={{ padding: "15px", margin: "15px" }}
        >
          <option value="default">Filtering by</option>
          <option value="Pending">Pending</option>
          <option value="Progress">Progress</option>
          <option value="Confirm">Confirm</option>
        </select>

        <button
          style={{ padding: "15px", margin: "15px" }}
          onClick={sortItemsByDate}
        >
          Sort by Date
        </button>
        <button
          style={{ padding: "15px", margin: "15px" }}
          onClick={sortItemsByPriority}
        >
          Sort by Priority
        </button>
      </div>

      {resTask &&
        resTask.map((item, index) => {
          return (
            <div key={index}>
              <a href={`/task/${item.id}`}>
                <div className="list-item">
                  <div className="item-details">
                    <h3 className="item-title">
                      {index + 1}
                      {". "}
                      {item.title}
                    </h3>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
    </>
  );
};

export default Task;
