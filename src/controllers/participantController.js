const Participant = require('../models/participant');


// Controller function to get participants by event ID
exports.getParticipantsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const participants = await Participant.find({ event: eventId }).exec();
    res.json(participants);
  } catch (error) {
    console.error('Failed to fetch participants', error);
    res.status(500).json({ message: 'Failed to fetch participants' });
  }
};



exports.registerParticipant = async (req, res) => {
    try {
      // Create a new participant document using the request body data
      const participant = new Participant({
        fullName: req.body.fullName,
        email: req.body.email,
        dateOfBirth: req.body.dateOfBirth,
        discoverySource: req.body.hearAbout,
        event: req.body.eventId, // Assuming you send the eventId in the request body
      });
  
      // Save the participant document to the database
      const savedParticipant = await participant.save();
  
      // Send a response back to the client
      res.status(201).json(savedParticipant);
    } catch (error) {
      // Handle any errors that occur during the process
      console.error("Error registering participant:", error);
      res.status(500).json({ message: "Error registering participant" });
    }
  };

