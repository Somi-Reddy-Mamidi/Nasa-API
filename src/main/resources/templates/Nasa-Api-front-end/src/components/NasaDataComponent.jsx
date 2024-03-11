import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const NasaDataComponent = () => {
  const [date, setDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [count, setCount] = useState('');
  const [nasaData, setNasaData] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (formSubmitted) {
      fetchData();
      setFormSubmitted(false); // Reset form submission flag after data fetch
    }
  }, [formSubmitted]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:9090/apod', {
        params: {
          date: date || '',
          startdate: startDate || '',
          enddate: endDate || '',
          count: count || '',
          thumbs: true,
        },
      });
      setNasaData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true); // Set formSubmitted flag to true on form submission
  };

  const clearFilters = () => {
    setDate('');
    setStartDate('');
    setEndDate('');
    setCount('');
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
