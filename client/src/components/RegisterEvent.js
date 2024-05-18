import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RegisterEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [eventDetails, setEventDetails] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State for pop-up message visibility
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    hearAbout: ''
  });


  const handleSubmit = async (e) => {
    console.log("handlesubmit");
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3002/participants/register/${eventId}', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          eventId: eventId, // Include the eventId in the request body
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log('Form submitted:', result);

      // Show the pop-up message
      setShowPopup(true);

      setTimeout(() => {
        navigate('/');
      }, 3000); // 3 seconds delay

      // Redirect or update UI as needed after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };



  useEffect(() => {
    // Function to fetch event details
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3002/events/single_event/${eventId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setEventDetails(data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    fetchEventDetails();
  }, [eventId]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <div className="register-event-container">
      <h2>Register for Event: {eventDetails ? eventDetails.title : 'Loading...'}</h2>
      {showPopup && (
      <div className="popup-message wide">
        <p className="large-text">You successfully registered!</p>
      </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            required
          />
        </div>

        <fieldset className="form-group">
          <legend>Where did you hear about this event?</legend>
          <label>
            <input
              type="radio"
              name="hearAbout"
              value="Social Media"
              onChange={handleInputChange}
              required
            />
            Social Media
          </label>
          <label>
            <input
              type="radio"
              name="hearAbout"
              value="Friend"
              onChange={handleInputChange}
            />
            Friend
          </label>
          <label>
            <input
              type="radio"
              name="hearAbout"
              value="Advertisement"
              onChange={handleInputChange}
            />
            Advertisement
          </label>
          <label>
            <input
              type="radio"
              name="hearAbout"
              value="Other"
              onChange={handleInputChange}
            />
            Other
          </label>
        </fieldset>

        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default RegisterEvent;