const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    eventDate: Date,
    organizer: String,
});
const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
