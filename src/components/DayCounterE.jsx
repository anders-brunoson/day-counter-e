import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Fireworks.module.css';

const Firework = ({ style }) => {
  return (
    <div className={styles.firework} style={style}>
      <div className={styles.explosion}></div>
      <div className={styles.explosion}></div>
      <div className={styles.explosion}></div>
      <div className={styles.explosion}></div>
      <div className={styles.explosion}></div>
      <div className={styles.explosion}></div>
      <div className={styles.explosion}></div>
      <div className={styles.explosion}></div>
    </div>
  );
};

const Counter = () => {
  const [days, setDays] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [additionalDay, setAdditionalDay] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const startDate = new Date('2024-08-24');

  useEffect(() => {
    const updateDays = () => {
      const now = new Date();
      setCurrentDate(now);
      const timeDifference = now - startDate;
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      setDays(Math.max(0, daysDifference));
    };

    updateDays();
    const timer = setInterval(updateDays, 1000 * 60 * 60);

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

  const handleAddDay = () => {
    setAdditionalDay(1);
    setButtonDisabled(true);
    setShowFireworks(true);
    setTimeout(() => setShowFireworks(false), 3000);
  };

  const largeText = {
    fontSize: '16rem',
    fontWeight: 'bold',
    marginTop: '-3rem',
    marginBottom: '-3rem',
    color: '#ec4899',
  };

  return (
    <div className="flex flex-col items-center justify-center relative">
      <h1 className="text-3xl font-bold">Anders runstreak</h1>
      <div className="text-center">
        <motion.p
          style={largeText}
          key={days + additionalDay}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {days + additionalDay}
        </motion.p>
        <p className="text-2xl font-semibold mb-4">dagar</p>
        <button
          onClick={handleAddDay}
          className={`bg-pink-500 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out ${
            buttonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-600'
          }`}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? 'Dagens runda räknad' : '+1 om dagens runda är klar'}
        </button>
      </div>
      <p className="text-xl mt-4">Start: {formatDate(startDate)}</p>
      <p className="text-xl mt-2">Idag: {formatDate(currentDate)}</p>
      {showFireworks && (
        <>
          <Firework style={{ top: '20%', left: '20%' }} />
          <Firework style={{ top: '20%', right: '20%' }} />
          <Firework style={{ bottom: '20%', left: '20%' }} />
          <Firework style={{ bottom: '20%', right: '20%' }} />
        </>
      )}
    </div>
  );
};

export default Counter;