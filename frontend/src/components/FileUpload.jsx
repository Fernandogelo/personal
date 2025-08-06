import React, { useState } from 'react';
import API from '../api';
import '../styles/FileUpload.css';

export default function FileUpload({ studentId }) {
  const [file, setFile] = useState(null);

  const upload = async () => {
    if (!file) return alert('Select a file');
    const formData = new FormData();
    formData.append('document', file);
    await API.post(`/documents/${studentId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    setFile(null);
    alert('File uploaded');
  };

  return (
    <div className="file-upload">
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={upload} className="btn btn-upload">Upload</button>
    </div>
  );
}
