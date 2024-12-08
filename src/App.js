import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import JobForm from './JobForm';
import JobTable from './JobTable';
import './sass/index.scss';
import Preloader from './components/Preloader';

const API_URL = 'http://localhost:5000';


function App() {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const isFirstLoadRef = useRef(true);

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);
      if (isFirstLoadRef.current) {
        const [res] = await Promise.all([
          axios.get(`${API_URL}/jobs`),
          delay(4000),
        ]);
        setJobs(res.data);
        isFirstLoadRef.current = false;
      } else {
        const [res] = await Promise.all([
          axios.get(`${API_URL}/jobs`),
          delay(500),
        ]);
        setJobs(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const addJob = async (job) => {
    setLoading(true);
    await axios.post(`${API_URL}/jobs`, job);
    await fetchJobs();
    setLoading(false);
  };

  const updateJob = async (id, job) => {
    setLoading(true);
    await axios.put(`${API_URL}/jobs/${id}`, job);
    await fetchJobs();
    setLoading(false);
  };

  const deleteJob = async (id) => {
    setLoading(true);
    await axios.delete(`${API_URL}/jobs/${id}`);
    await fetchJobs();
    setLoading(false);
  };

  return (
    <div className='app__container'>
      <Preloader show={loading} />

      {!loading && !isFirstLoadRef.current && (
        <>
          <JobTable
            jobs={jobs}
            onEdit={(job) => { setEditingJob(job); setShowForm(true); }}
            onDelete={deleteJob}
          />

          <button
            className='add-btn'
            onClick={() => { setEditingJob(null); setShowForm(true); }}
            title='Add new job'
          >
            +
          </button>
        </>
      )}

      {showForm && !loading && (
        <JobForm
          onSubmit={(data) => {
            editingJob ? updateJob(editingJob._id, data) : addJob(data);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
          initialData={editingJob}
        />
      )}
    </div>
  );
}

export default App;
