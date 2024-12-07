import React, { useState, useEffect } from 'react';

function JobForm({ onSubmit, onCancel, initialData }) {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (initialData) {
      setCompany(initialData.company || '');
      setPosition(initialData.position || '');
      setSalary(initialData.salary || '');
      setStatus(initialData.status || '');
      setNote(initialData.note || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ company, position, salary, status, note });
  };

  return (
    <form onSubmit={handleSubmit} className='add-job-form'>
      <input placeholder="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} />
      <input placeholder="Position" value={position} onChange={(e) => setPosition(e.target.value)} />
      <input placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
      <input placeholder="Position Status" value={status} onChange={(e) => setStatus(e.target.value)} />
      <input placeholder="Note" value={note} onChange={(e) => setNote(e.target.value)} />
      <button className='add-job-form__save-btn' type="submit">Save</button>
      <button className='add-job-form__cancel-btn' type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
}

export default JobForm;
