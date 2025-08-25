import React, { useEffect, useState } from 'react';
import { getTours } from '../services/tourService';

const TourList = () => {
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const toursData = await getTours();
        setTours(toursData);
      } catch (error) {
        console.error('Error fetching tours:', error);
      }
    };

    fetchTours();
  }, []);

  return (
    <div className="tour-list">
      {tours.map(tour => (
        <div key={tour.id} className="tour-card">
          <h2>{tour.name}</h2>
          <p>{tour.description}</p>
          <button>Book Now</button>
        </div>
      ))}
    </div>
  );
};

export default TourList;
