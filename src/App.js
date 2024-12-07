import React, { useEffect, useState } from 'react';
import axios from 'axios';
import JobForm from './JobForm';
import JobTable from './JobTable';

const API_URL = 'http://localhost:5000';

function App() {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchJobs = async () => {
    const res = await axios.get(`${API_URL}/jobs`);
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const addJob = async (job) => {
    await axios.post(`${API_URL}/jobs`, job);
    fetchJobs();
  };

  const updateJob = async (id, job) => {
    await axios.put(`${API_URL}/jobs/${id}`, job);
    fetchJobs();
  };

  const deleteJob = async (id) => {
    await axios.delete(`${API_URL}/jobs/${id}`);
    fetchJobs();
  };

  return (
    <div className='app__container'>
      <button className='add-btn' onClick={() => { setEditingJob(null); setShowForm(true); }}>Add new</button>

      {showForm && (
        <JobForm
          onSubmit={(data) => {
            editingJob ? updateJob(editingJob._id, data) : addJob(data);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
          initialData={editingJob}
        />
      )}
      
      <JobTable
        jobs={jobs}
        onEdit={(job) => { setEditingJob(job); setShowForm(true); }}
        onDelete={deleteJob}
      />
    </div>
  );
}

export default App;
