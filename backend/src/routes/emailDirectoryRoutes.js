const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');
const {
  listContacts,
  createContact,
  updateContact,
  deleteContact,
  bulkUpsertContacts
} = require('../controllers/emailDirectoryController');

const router = express.Router();

router.use(protect);
router.use(authorizeRoles('teacher', 'promo_admin', 'super_admin'));

router.get('/', listContacts);
router.post('/', createContact);
router.post('/bulk-upsert', bulkUpsertContacts);
router.patch('/:id', updateContact);
router.delete('/:id', deleteContact);

module.exports = router;
