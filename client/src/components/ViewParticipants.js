import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const ViewParticipants = () => {
  console.log("viewparticipants component")
  const { eventId } = useParams();
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    const fetchParticipants = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3002/participants/${eventId}`);
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        const data = await response.json();
        setParticipants(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchParticipants();
  }, [eventId]);


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



  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="App">
      <h2>Participants of the Event: {eventDetails ? eventDetails.title : 'Loading...'}</h2>
      <div className="participant-container">
        {participants.map(participant => (
          <div key={participant.id} className="participant-block">
            <h2 className="participant-name">{participant.fullName}</h2>
            <div className="participant-info">{participant.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewParticipants;
