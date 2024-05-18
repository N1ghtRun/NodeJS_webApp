const mongoose = require('mongoose');
const connectDB = require('./utils/database');
const Event = require('./models/event');
const Participant = require('./models/participant');


function generateEvents(numEvents) {
  const eventSeed = [];
  for (let i = 1; i <= numEvents; i++) {
    eventSeed.push({
      title: `Event Title ${i}`,
      description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam venenatis dui iaculis.`,
      eventDate: new Date(`2023-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`),
      organizer: `Organizer ${i}`,
    });
  }
  return eventSeed;
}

const eventSeed = generateEvents(100);


// Connect to the database then run the seed function
connectDB().then(() => {
    Event.insertMany(eventSeed)
      .then(() => {
        console.log('Events have been successfully seeded');
        mongoose.connection.close(); // Close the connection when done
      })
      .catch((error) => {
        console.error('Error seeding events:', error);
        mongoose.connection.close(); // Close the connection on error
      });
  });
