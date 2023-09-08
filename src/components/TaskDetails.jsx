import React, { useState } from "react";
import { useParams } from "react-router-dom";

const TaskDetails = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const params = useParams();

  const task = localStorage.getItem(`task-${params.id}`);
  const taskDet = JSON.parse(task);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    taskDet.status = e.target.value;
    localStorage.setItem(`task-${params.id}`, JSON.stringify(taskDet));
  };

  return (
    <>
      <div className="signup-container">
        <div className="signup-form">
          <div style={{ border: "2px solid black" }}>
            <h2>Task Details</h2>
          </div>
          <h2>{taskDet.title}</h2>
          <h4>Description: {taskDet.description}</h4>
          <h4>Date: {taskDet.date}</h4>
          <h5>Priority: {taskDet.priority}</h5>
          <h5>Status: {taskDet.status}</h5>

          <div>
            <h2>Change Status :</h2>
            <div>
              <label>Confirm</label>
              <input
                type="radio"
                value="Confirm"
                checked={selectedOption === "Confirm"}
                onChange={handleOptionChange}
              />
            </div>
            <div>
              <label>Progress</label>
              <input
                type="radio"
                value="Progress"
                checked={selectedOption === "Progress"}
                onChange={handleOptionChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDetails;
