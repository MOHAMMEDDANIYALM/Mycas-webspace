const express = require('express');
const {
  listEvents,
  createEvent,
  updateEvent,
  deleteEvent
} = require('../controllers/timetableController');
const { protect } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.use(protect);

router.get('/', listEvents);

router.post('/', authorizeRoles('teacher', 'promo_admin', 'super_admin'), createEvent);
router.patch('/:id', authorizeRoles('teacher', 'promo_admin', 'super_admin'), updateEvent);
router.delete('/:id', authorizeRoles('teacher', 'promo_admin', 'super_admin'), deleteEvent);

module.exports = router;
