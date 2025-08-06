import React, { useState, useEffect } from 'react';
import API from '../api';
import StudentCard from './StudentCard';
import '../styles/StudentDashboard.css';

export default function StudentDashboard() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');

  useEffect(() => { fetchStudents(); }, []);

  const fetchStudents = async () => {
    const res = await API.get('/students');
    setStudents(res.data);
  };

  const addStudent = async () => {
    if (!name || !gradeLevel) return alert('Fill out all fields');
    await API.post('/students', { name, grade: gradeLevel });
    setName('');
    setGradeLevel('');
    fetchStudents();
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">IntelliCheck Dashboard</h1>
      
      <div className="add-student-form">
        <input 
          className="input-field"
          placeholder="Student Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input 
          className="input-field"
          placeholder="Grade Level"
          value={gradeLevel}
          onChange={e => setGradeLevel(e.target.value)}
        />
        <button onClick={addStudent} className="btn btn-add">Add</button>
      </div>

      <div className="student-list">
        {students.map(s => <StudentCard key={s.id} student={s} />)}
      </div>
    </div>
  );
}
