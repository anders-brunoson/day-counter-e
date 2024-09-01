import React, { useState, useEffect } from 'react';

const Counter = () => {
  const [days, setDays] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const startDate = new Date('2024-08-25');

  useEffect(() => {
    const updateDays = () => {
      const now = new Date();
      setCurrentDate(now);
      const timeDifference = now - startDate;
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      setDays(Math.max(0, daysDifference)); // Removed the +1 to exclude today
    };

    updateDays(); // Initial update
    const timer = setInterval(updateDays, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Europe/Stockholm'
    }).format(date);
  };

  const largeText = {
    fontSize: '16rem',
    fontWeight: 'bold',
    marginTop: '-5rem',
    marginBottom: '-3rem',
    color: '#ec4899', // Tailwind's pink-500 color
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Elina's runstreak</h1>
      <div className="text-center">
        <p style={largeText}>{days}</p>
        <p className="text-2xl font-semibold mb-4">dagar</p>
        <p className="text-1xl font-semibold mb-4">(+1 om dagens runda är klar)</p>
      </div>
      <p className="text-xl mt-4">Start: {formatDate(startDate)}</p>
      <p className="text-xl mt-2">Idag: {formatDate(currentDate)}</p>
    </div>
  );
};

export default Counter;