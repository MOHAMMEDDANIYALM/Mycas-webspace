const express = require('express');
const { sendBulkEmail } = require('../controllers/emailController');
const { protect } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

const router = express.Router();

router.use(protect);
router.post('/send-bulk', authorizeRoles('teacher'), sendBulkEmail);

module.exports = router;
