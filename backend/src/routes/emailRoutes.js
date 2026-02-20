const express = require('express');
const { sendBulkEmail } = require('../controllers/emailController');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(protect);
router.post('/send-bulk', authorizeRoles('teacher', 'promo_admin', 'super_admin'), sendBulkEmail);

module.exports = router;
