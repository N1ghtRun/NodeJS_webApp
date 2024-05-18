const express = require('express');
const router = express.Router();
const participantController = require('../controllers/participantController');


router.post('/register/:id', participantController.registerParticipant);
router.get('/:eventId', participantController.getParticipantsByEvent);


module.exports = router;
