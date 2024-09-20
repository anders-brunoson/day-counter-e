import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const Counter = () => {
  const [days, setDays] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [additionalDay, setAdditionalDay] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [customDays, setCustomDays] = useState('');
  const [customDate, setCustomDate] = useState('');
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

  const getMilestoneDate = (days) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + days -1);
    return formatDate(date);
  };

  const milestones = [
    { days: 10, date: getMilestoneDate(10) },
    { days: 50, date: getMilestoneDate(50) },
    { days: 100, date: getMilestoneDate(100) },
  ];  

  const handleCustomDaysChange = (e) => {
    setCustomDays(e.target.value);
    setCustomDate(''); // Clear the previous result when user starts typing
  };

  const calculateCustomDate = () => {
    const daysNumber = parseInt(customDays, 10);
    if (!isNaN(daysNumber) && daysNumber > 0) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + daysNumber -1);
      setCustomDate(formatDate(date));
    } else {
      setCustomDate('Please enter a valid number of days');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center relative">
      <h1 className="text-3xl font-bold">Runstreak</h1>
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
        <p className="text-2xl font-semibold mb-4">days</p>
        <button
          onClick={handleAddDay}
          className={`bg-pink-500 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out ${
            buttonDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-pink-600'
          }`}
          disabled={buttonDisabled}
        >
          {buttonDisabled ? 'Today\'s run done' : '+1 if today\s run was done'}
        </button>
      </div>
      <p className="text-xl mt-4">Streak start: {formatDate(startDate)}</p>
      <p className="text-xl mt-2">Today: {formatDate(currentDate)}</p>

      <div className="mt-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Milestones</h2>
        <table className="w-full border-collapse mb-6">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100">Date</th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100">Milestone</th>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100">Achieved</th>
            </tr>
          </thead>
          <tbody>
            {milestones.map((milestone) => (
              <tr key={milestone.days}>
                <td className="border border-gray-300 px-4 py-2">{milestone.date}</td>
                <td className="border border-gray-300 px-4 py-2">{milestone.days} days</td>
                <td className="border border-gray-300 px-4 py-2 text-center">
                  {days + additionalDay >= milestone.days && (
                    <CheckCircle2 className="text-green-500 inline" size={24} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-6 mb-6">
          <h3 className="text-xl font-bold mb-2">Calculate Custom Milestone</h3>
          <div className="flex items-center">
            <input
              type="number"
              value={customDays}
              onChange={handleCustomDaysChange}
              placeholder="Enter number of days"
              className="border border-gray-300 rounded px-3 py-2 mr-2 flex-grow"
            />
            <button
              onClick={calculateCustomDate}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
            >
              Calculate
            </button>
          </div>
          {customDate && (
            <p className="mt-2 text-lg">
              Date for {customDays} days: <strong>{customDate}</strong>
            </p>
          )}
        </div>
      </div>      

    </div>
  );
};

export default Counter;