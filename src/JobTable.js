import React from 'react';

function JobTable({ jobs, onEdit, onDelete }) {
  return (
    <table border="1" cellPadding="5" className='jobs-table'>
      <thead>
        <tr>
          <th>Company Name</th>
          <th>Position</th>
          <th>Salary</th>
          <th>Position Status</th>
          <th>Note</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map(job => (
          <tr key={job._id}>
            <td>{job.company}</td>
            <td>{job.position}</td>
            <td>{job.salary}</td>
            <td>{job.status}</td>
            <td>{job.note}</td>
            <td>
              <button className='jobs-table__edit-btn' onClick={() => onEdit(job)}>Edit</button>
              <button className='jobs-table__delete-btn' onClick={() => onDelete(job._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default JobTable;
