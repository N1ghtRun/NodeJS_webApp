const mongoose = require('mongoose');
const participantSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  dateOfBirth: Date,
  discoverySource: String, // "where did you hear about this event?"
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event'
  }
});
const Participant = mongoose.model('Participant', participantSchema);
module.exports = Participant;
