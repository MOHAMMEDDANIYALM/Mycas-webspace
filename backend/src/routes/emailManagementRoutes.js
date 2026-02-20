const express = require('express');
const {
  addStudentEmail,
  bulkAddStudentEmails,
  getApprovedEmails,
  deleteApprovedEmail,
  getEmailStatus
} = require('../controllers/emailManagementController');
const { protect } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

const router = express.Router();

// Only teachers and admins can manage student emails
router.use(protect);
router.use(authorizeRoles('teacher', 'promo_admin', 'super_admin'));

// Add single student email
router.post('/add', addStudentEmail);

// Bulk add student emails
router.post('/bulk-add', bulkAddStudentEmails);

// Get all approved emails for a class (owned by teacher)
router.get('/list', getApprovedEmails);

// Delete an approved email
router.delete('/:id', deleteApprovedEmail);

// Check email approval status (public - can be called before registration)
router.get('/check-status', getEmailStatus);

module.exports = router;
