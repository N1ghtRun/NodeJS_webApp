const Event = require('../models/event');


exports.listEvents = async (req, res) => {
    try {
        const events = await Event.find({});
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching events', error: error.message });
    }
};


exports.getEventById = async (req, res) => {
    try {
      const event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).send('Event not found');
      }
      res.json(event);
    } catch (error) {
      res.status(500).send(error.message);
    }
  };


exports.listParticipants = async (req, res) => {
    console.log("Hello World");
};
