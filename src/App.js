import React, { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import JobForm from './JobForm';
import JobTable from './JobTable';
import './sass/index.scss';
import Preloader from './components/Preloader';

const API_URL = 'https://qrz5ls-25176.csb.app';

function App() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);
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
          axios.get(`${API_URL}/jobs/paginated?page=${page}`),
          delay(4000),
        ]);
        setJobs(res.data.jobs);
        setTotalJobs(res.data.total);
        isFirstLoadRef.current = false;
      } else {
        const [res] = await Promise.all([
          axios.get(`${API_URL}/jobs/paginated?page=${page}`),
          delay(500),
        ]);
        setJobs(res.data.jobs);
        setTotalJobs(res.data.total);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs, page]);

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

  const jobsPerPage = 5;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  return (
    <div className='app__container'>
      <Preloader show={loading} />

      {!loading && !isFirstLoadRef.current && (
        <>
          <JobTable
            jobs={jobs}
            totalJobs={totalJobs}
            currentPage={page}
            totalPages={totalPages}
            onEdit={(job) => { setEditingJob(job); setShowForm(true); }}
            onDelete={deleteJob}
            changePage={setPage}
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
