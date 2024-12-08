import React from 'react';

function JobTable({ jobs, totalJobs, currentPage, totalPages, onEdit, onDelete, changePage }) {
  const jobsPerPage = 5;

  const currentJobs = jobs;

  const onPageIncrement = () => {
    const newPage = Math.min(currentPage + 1, totalPages);
    changePage(newPage);
  };

  const onPageDecrement = () => {
    const newPage = Math.max(currentPage - 1, 1);
    changePage(newPage);
  };

  if (jobs.length === 0) {
    return (
      <div>
        <p>No jobs found</p>
      </div>
    );
  }

  return (
    <>
      <table className='jobs-table'>
        <thead>
          <tr>
            <th>Company<br/>Name</th>
            <th>Position</th>
            <th>Salary,<br/>$ per month</th>
            <th>Position<br/>Status</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentJobs.map(job => (
            <tr key={job._id}>
              <td>{job.company}</td>
              <td>{job.position}</td>
              <td>{job.salary}</td>
              <td className={job.status==='hot' ? 'hot': ''}>{job.status.toUpperCase()}</td>
              <td>{job.note}</td>
              <td>
                <button className='jobs-table__edit-btn' title='Edit' onClick={() => onEdit(job)}>✏️</button>
                <button className='jobs-table__delete-btn' title='Delete' onClick={() => onDelete(job._id)}>✂️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className='pagination'>
          <button
            className='pagination__btn prev'
            onClick={onPageDecrement}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span style={{ margin: '0 10px' }}>{currentPage} / {totalPages}</span>
          <button
            className='pagination__btn next'
            onClick={onPageIncrement}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default JobTable;
