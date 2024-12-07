import React, { useState, useEffect } from 'react';

function JobForm({ onSubmit, onCancel, initialData }) {
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [salary, setSalary] = useState('');
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState({
    company: false,
    position: false,
    status: false,
  });


  useEffect(() => {
    if (initialData) {
      setCompany(initialData.company || '');
      setPosition(initialData.position || '');
      setSalary(initialData.salary || '');
      setStatus(initialData.status || '');
      setNote(initialData.note || '');
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {
      company: company.trim().length === 0,
      position: position.trim().length === 0,
      status: status.trim().length === 0,
    };
  
    setErrors(newErrors);
  
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    const isValid = !Object.values(newErrors).some(error => error);
  
    if (isValid) {
      onSubmit({
        company: company.trim(),
        position: position.trim(),
        salary: salary !== '' ? parseFloat(salary) : null,
        status: status.trim(),
        note: note.trim(),
      });
    } else {

      if (newErrors.company) setCompany('');
      if (newErrors.position) setPosition('');
      if (newErrors.status) setStatus('');
    }
  };



  return (
  <div className="add-job-form__wrapper">
    <form onSubmit={handleSubmit} className='add-job-form'>
      <div className="add-job-form__header">
        <h2 className="add-job-form__header-title">Create a new position record</h2>
        <button className='add-job-form__cancel-btn' type="button" title='Close' onClick={onCancel}>&times;</button>
      </div>
      <fieldset>
        <input placeholder="Company Name" className={`${errors.company ? 'error' : ''}`} value={company} onChange={(e)=> setCompany(e.target.value)} required />
        <input placeholder="Position" className={`${errors.position ? 'error' : ''}`} value={position} onChange={(e)=> setPosition(e.target.value)} required />
      </fieldset>

      <fieldset>
        <input type='number' step={0.01} min={0} placeholder="Salary" value={salary} onChange={(e)=>
        setSalary(parseFloat(e.target.value || ''))} />
        <select value={status} className={`${errors.status ? 'error' : ''}`} onChange={(e)=> setStatus(e.target.value)} required>
          <option value="">Select Position Status</option>
          <option value="hot">Hot!</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </fieldset>

      <textarea placeholder="Notes" value={note} onChange={(e)=> setNote(e.target.value)} />

      <fieldset>
      <button className='add-job-form__save-btn' type="submit">Save</button>
      </fieldset>

      </form>
      </div>

    );
}

export default JobForm;