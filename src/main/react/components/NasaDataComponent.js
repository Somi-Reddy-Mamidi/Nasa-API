import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import useNASAStore from './NASAStore';

const NasaDataComponent = () => {
  const [date, setDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [count, setCount] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { nasaData, fetchNASAData } = useNASAStore();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetchNASAData(date, startDate, endDate, count); // Pass parameters to fetchNASAData
    setFormSubmitted(true);
  };

  const clearFilters = () => {
    setDate('');
    setStartDate('');
    setEndDate('');
    setCount('');
    setFormSubmitted(false);
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">NASA Data</h1>
      <form className="mb-4" onSubmit={handleFormSubmit}>
        <div className="row">
          <div className="col">
            <label>Date:</label>
            <input className="form-control" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="col">
            <label>Start Date:</label>
            <input className="form-control" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>
          <div className="col">
            <label>End Date:</label>
            <input className="form-control" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
          <div className="col">
            <label>Count:</label>
            <input className="form-control" type="number" value={count} onChange={(e) => setCount(e.target.value)} />
          </div>
          <div className="col-auto align-self-end">
            <button type="submit" className="btn btn-primary mr-2">Submit</button>
            <button type="button" className="btn btn-secondary" onClick={clearFilters}>Clear</button>
          </div>
        </div>
      </form>
      <div className="row">
        {nasaData.map((item, index) => (
          <div key={index} className="col-md-4 mb-4">
            <div className="card">
              <img src={item.url} className="card-img-top" alt={item.title} />
              <div className="card-body">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text">Date: {item.date}</p>
                <p className="card-text">Explanation: {item.explanation}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NasaDataComponent;
