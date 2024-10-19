import React, { useState, useEffect } from 'react';
import { format, eachDayOfInterval } from 'date-fns';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';

const SlotScheduler = () => {
  const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' });
  const [timeSlots, setTimeSlots] = useState({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  });
  const [generatedSlots, setGeneratedSlots] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    axios.get('/api/activities')
      .then(response => {
        setActivities(response.data);
      })
      .catch(error => {
        console.error('Error fetching the activities!', error);
      });
  }, []);

  useEffect(() => {
    if (selectedActivity) {
      axios.get(`/api/activities/${selectedActivity}/slots`)
        .then(response => {
          setAvailableSlots(response.data);
        })
        .catch(error => {
          console.error('Error fetching available slots!', error);
        });
    } else {
      setAvailableSlots([]); 
    }
  }, [selectedActivity]);

  const handleDateChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const handleTimeSlotChange = (day, startTime, endTime) => {
    setTimeSlots({
      ...timeSlots,
      [day]: [{ start: startTime, end: endTime }] 
    });
  };

  const generateSlots = () => {
    if (!dateRange.startDate || !dateRange.endDate || !selectedActivity) return;

    const allDates = eachDayOfInterval({
      start: new Date(dateRange.startDate),
      end: new Date(dateRange.endDate),
    });

    const slots = [];

    allDates.forEach(date => {
      const dayOfWeek = format(date, 'EEEE'); 

      if (timeSlots[dayOfWeek] && timeSlots[dayOfWeek].length > 0) {
        timeSlots[dayOfWeek].forEach(slot => {
          slots.push({
            date: format(date, 'yyyy-MM-dd'),
            time: `${slot.start}-${slot.end}`,
            activity_id: selectedActivity 
          });
        });
      }
    });

    setGeneratedSlots(slots);
  };

  const handleSubmit = () => {
    Inertia.post('/slots/store', { slots: generatedSlots });
  };

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) { 
        const value = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        times.push(value);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Slot Selector</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Start Date:</label>
        <input
          type="date"
          name="startDate"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          value={dateRange.startDate}
          onChange={handleDateChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">End Date:</label>
        <input
          type="date"
          name="endDate"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          value={dateRange.endDate}
          onChange={handleDateChange}
        />
      </div>

     <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select Activity:</label>
        <select
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          value={selectedActivity}
          onChange={(e) => setSelectedActivity(e.target.value)}
        >
          <option value="">Select an activity</option>
          {activities.map(activity => (
            <option key={activity.id} value={activity.id}>
              {activity.name}
            </option>
          ))}
        </select>
      </div>

      {weekdays.map(day => (
        <div key={day} className="mb-4">
          <label className="block text-sm font-medium text-gray-700">{day} Time Slots:</label>
          <div className="flex space-x-2">
            <select
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              onChange={(e) => handleTimeSlotChange(day, e.target.value, timeSlots[day]?.[0]?.end || '')}
            >
              <option value="">Start Time</option>
              {timeOptions.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
            <select
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              onChange={(e) => handleTimeSlotChange(day, timeSlots[day]?.[0]?.start || '', e.target.value)}
            >
              <option value="">End Time</option>
              {timeOptions.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>
      ))}

      <button className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={generateSlots}>
        Generate Slots
      </button>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Generated Slots:</h3>
        <ul className="list-disc pl-5">
          {generatedSlots.map((slot, index) => (
            <li key={index}>{`${slot.date} - ${slot.time} for Activity ID: ${slot.activity_id}`}</li>
          ))}
        </ul>
      </div>

      {availableSlots.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Available Slots for Selected Activity:</h3>
          <ul className="list-disc pl-5">
            {availableSlots.map((slot, index) => (
              <li key={index}>{`${slot.date} - ${slot.time}`}</li>
            ))}
          </ul>
        </div>
      )}

      <button className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded" onClick={handleSubmit}>
        Save Slots
      </button>
    </div>
  );
};

export default SlotScheduler;
