import React, { useState, useEffect } from 'react';

const mockData = {
  "mentors": [
    {
      "id": 1,
      "name": "John Doe",
      "areas": ["FMCG Sales", "E-Commerce"],
      "availability": [
        {"day": "Monday", "slots": ["7:00 PM - 7:30 PM", "7:30 PM - 8:00 PM"]},
        {"day": "Tuesday", "slots": ["7:00 PM - 7:30 PM", "7:30 PM - 8:00 PM"]}
      ],
      "rating": 4.5
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "areas": ["Equity Research", "Digital Marketing"],
      "availability": [
        {"day": "Monday", "slots": ["7:00 PM - 7:30 PM", "7:30 PM - 8:00 PM"]},
        {"day": "Wednesday", "slots": ["7:00 PM - 7:30 PM", "7:30 PM - 8:00 PM"]}
      ],
      "rating": 4.8
    }
  ],
  "students": [
    {
      "id": 1,
      "name": "Alice Johnson",
      "preferredMentorId": 2,
      "areaOfInterest": "Digital Marketing"
    },
    {
      "id": 2,
      "name": "Bob Brown",
      "areaOfInterest": "FMCG Sales"
    }
  ]
};

const Scheduler = () => {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [selectedArea, setSelectedArea] = useState('');
  const [duration, setDuration] = useState(30);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [premiumService, setPremiumService] = useState(false);

  useEffect(() => {
    // Load mentors data
    setMentors(mockData.mentors);
  }, []);

  const handleAreaChange = (e) => {
    const area = e.target.value;
    setSelectedArea(area);

    // Filter mentors based on the selected area
    const filteredMentors = mentors.filter(mentor => mentor.areas.includes(area));
    if (filteredMentors.length > 0) {
      setSelectedMentor(filteredMentors[0]);
      setAvailableSlots(filteredMentors[0].availability);
    }
  };

  const handleMentorChange = (e) => {
    const mentorId = e.target.value;
    const mentor = mentors.find(m => m.id === parseInt(mentorId));
    setSelectedMentor(mentor);
    setAvailableSlots(mentor.availability);
  };

  const handleDurationChange = (e) => {
    setDuration(parseInt(e.target.value));
  };

  const handleSlotChange = (slot) => {
    setSelectedSlot(slot);
  };

  const handleBooking = () => {
    // Logic to handle booking and payment
    alert(`Booking confirmed with ${selectedMentor.name} for ${selectedSlot} at Rs. ${duration * 100}`);
  };

  return (
    <div className="scheduler p-8 bg-gray-300 min-h-screen">
      <h1 className='text-3xl font-bold mb-6'>Book a 1x1 Session</h1>

      <div className='mb-4'>
        <label className='block text-lg mb-2'>Select Area of Interest:</label>
        <select           className="w-full p-2 border border-gray-300 rounded"
 value={selectedArea} onChange={handleAreaChange}>
          <option value="">-- Select Area --</option>
          <option value="FMCG Sales">FMCG Sales</option>
          <option value="E-Commerce">E-Commerce</option>
          <option value="Equity Research">Equity Research</option>
          <option value="Digital Marketing">Digital Marketing</option>
        </select>
      </div>

      {selectedArea && (
        <div>
          <label>Select Mentor:</label>
          <select value={selectedMentor?.id} onChange={handleMentorChange}>
            {mentors
              .filter(mentor => mentor.areas.includes(selectedArea))
              .map(mentor => (
                <option key={mentor.id} value={mentor.id}>
                  {mentor.name} ({mentor.rating}⭐)
                </option>
              ))}
          </select>
          <input
            type="checkbox"
            checked={premiumService}
            onChange={() => setPremiumService(!premiumService)}
          />
          <label>Premium Service</label>
        </div>
      )}

      {selectedMentor && (
        <div>
          <label>Select Duration:</label>
          <select value={duration} onChange={handleDurationChange}>
            <option value={30}>30 minutes</option>
            <option value={45}>45 minutes</option>
            <option value={60}>60 minutes</option>
          </select>

          <h3>Available Slots:</h3>
          <div>
            {availableSlots.map(slot => (
              <div key={slot.day}>
                <strong>{slot.day}:</strong>
                {slot.slots.map((time, index) => (
                  <button
                    key={index}
                    className={selectedSlot === time ? 'selected' : ''}
                    onClick={() => handleSlotChange(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedSlot && (
        <div>
          <h3>Payment Summary:</h3>
          <p>
            Mentor: {selectedMentor.name} <br />
            Duration: {duration} minutes <br />
            Slot: {selectedSlot} <br />
            Total: Rs. {duration * 100} <br />
          </p>
          <button onClick={handleBooking}>Confirm Booking</button>
        </div>
      )}
    </div>
  );
};

export default Scheduler;
