const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Define routes
router.get('/', eventController.listEvents);
router.get('/single_event/:id', eventController.getEventById);
router.get('/:id/participants', eventController.listParticipants);

module.exports = router;
