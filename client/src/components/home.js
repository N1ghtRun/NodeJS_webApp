import React, { useState } from 'react';

const Home = ({ events }) => {

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30; // Set the number of items per page

  // Calculate total number of pages
  const pageCount = Math.ceil(events.length / itemsPerPage);

  // Calculate the index of the first and last items on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Current items to display
  const currentEvents = events.slice(indexOfFirstItem, indexOfLastItem);

  // Function to change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  return (
    <div className="App">
      <h2>Events</h2>
      <div className="events-container">
        {currentEvents.map(event => (
          <div key={event._id} className="event-block">
            <h3 className="event-title">{event.title}</h3>
            <p className="event-date">{new Date(event.eventDate).toLocaleDateString('en-GB')}</p>
            <p className="event-organizer">Organized by: {event.organizer}</p> 
            <p className="event-description">{event.description}</p>
            <div className="event-actions">
                <a href={`/register/${event._id}`} className="event-link">Register</a>
                <a href={`/participants/${event._id}`} className="event-link">View Participants</a>
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: pageCount }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            disabled={currentPage === index + 1}
            className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <br/>
    </div>
  );
};

export default Home;
