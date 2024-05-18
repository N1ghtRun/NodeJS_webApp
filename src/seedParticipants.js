const mongoose = require('mongoose');
const connectDB = require('./utils/database'); // Assuming this is the correct path to your database connection utility
const Event = require('./models/event');
const Participant = require('./models/participant');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function seedParticipants() {
  try {
    // Optional: Clear the participants collection
    await Participant.deleteMany({}); 

    const events = await Event.find(); // Retrieve all events

    for (const event of events) {
      const participantsCount = getRandomInt(20, 100); // Generate a random number of participants for each event

      let participantSeed = [];
      for (let i = 0; i < participantsCount; i++) {
        participantSeed.push({
          fullName: `Participant ${i}`, // You should generate or fetch real names
          email: `participant${i}@example.com`, // You should generate or fetch real emails
          dateOfBirth: new Date(1990, 0, 1), // You should generate or fetch real dates of birth
          discoverySource: 'Social Media', // You should define how to set this field
          event: event._id,
        });
      }

      // Insert all generated participants for the current event
      await Participant.insertMany(participantSeed);
    }

    console.log('Participants seeded successfully.');
  } catch (error) {
    console.error('Error seeding participants:', error);
  } finally {
    mongoose.connection.close(); // Close the connection to the database
  }
}

// Connect to the database then run the seed function
connectDB().then(() => {
  seedParticipants();
});
