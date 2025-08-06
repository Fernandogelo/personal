import React, { useState } from "react";
import axios from "axios";
import "../styles/StudentCard.css";
import API from '../api';


export default function StudentCard({ student }) {
  const [file, setFile] = useState(null);
  const [insights, setInsights] = useState("Click analyze to get insights...");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("text", `Analyze this student's performance: ${student.name}`);
      if (file) formData.append("file", file);

      const res = await API.post('/students/analyze', formData, {
      headers: { "Content-Type": "multipart/form-data" },
      });

      setInsights(res.data.insights);
    } catch (error) {
      console.error(error);
      setInsights("AI analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-card">
      <h3>{student.name}</h3>
      <p>Grade: {student.grade}</p>

      <input type="file" accept="image/png,image/jpeg" onChange={handleFileChange} />
      
      <button onClick={handleAnalyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze with AI"}
      </button>

      <div className="insights">
        <strong>Insights:</strong>
        <p>{insights}</p>
      </div>
    </div>
  );
}
