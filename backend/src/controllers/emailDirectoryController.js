const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');
const { EmailDirectoryContact, CONTACT_ROLES } = require('../models/EmailDirectoryContact');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeRole = (value) => String(value || '').toLowerCase().trim();
const normalizeEmail = (value) => String(value || '').toLowerCase().trim();
const normalizeText = (value) => String(value || '').trim();
const normalizeClassCode = (value) => String(value || '').toUpperCase().trim();

const validateContactInput = (payload) => {
  const fullName = normalizeText(payload.fullName);
  const email = normalizeEmail(payload.email);
  const role = normalizeRole(payload.role);
  const classCode = normalizeClassCode(payload.classCode);
  const department = normalizeText(payload.department);
  const notes = normalizeText(payload.notes);

  if (!fullName) {
    throw new AppError('fullName is required.', 400);
  }

  if (!email || !emailRegex.test(email)) {
    throw new AppError('A valid email is required.', 400);
  }

  if (!CONTACT_ROLES.includes(role)) {
    throw new AppError('role must be student or teacher.', 400);
  }

  if (role === 'student' && !classCode) {
    throw new AppError('classCode is required for student contacts.', 400);
  }

  return {
    fullName,
    email,
    role,
    classCode,
    department,
    notes
  };
};

const listContacts = asyncHandler(async (req, res) => {
  const role = normalizeRole(req.query.role);
  const search = normalizeText(req.query.search);

  const query = {};

  if (role) {
    if (!CONTACT_ROLES.includes(role)) {
      throw new AppError('Invalid role filter.', 400);
    }
    query.role = role;
  }

  if (search) {
    query.$or = [
      { fullName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
      { classCode: { $regex: search, $options: 'i' } },
      { department: { $regex: search, $options: 'i' } }
    ];
  }

  const contacts = await EmailDirectoryContact.find(query).sort({ role: 1, fullName: 1, createdAt: -1 });

  res.status(200).json({
    success: true,
    count: contacts.length,
    data: contacts
  });
});

const createContact = asyncHandler(async (req, res) => {
  const data = validateContactInput(req.body);

  const existing = await EmailDirectoryContact.findOne({ email: data.email });
  if (existing) {
    throw new AppError('A contact with this email already exists.', 409);
  }

  const created = await EmailDirectoryContact.create({
    ...data,
    createdBy: req.user._id,
    updatedBy: req.user._id
  });

  res.status(201).json({
    success: true,
    message: 'Contact created successfully.',
    data: created
  });
});

const updateContact = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = validateContactInput(req.body);

  const existing = await EmailDirectoryContact.findById(id);
  if (!existing) {
    throw new AppError('Contact not found.', 404);
  }

  const duplicate = await EmailDirectoryContact.findOne({
    email: data.email,
    _id: { $ne: id }
  });

  if (duplicate) {
    throw new AppError('Another contact already uses this email.', 409);
  }

  existing.fullName = data.fullName;
  existing.email = data.email;
  existing.role = data.role;
  existing.classCode = data.classCode;
  existing.department = data.department;
  existing.notes = data.notes;
  existing.updatedBy = req.user._id;

  await existing.save();

  res.status(200).json({
    success: true,
    message: 'Contact updated successfully.',
    data: existing
  });
});

const deleteContact = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deleted = await EmailDirectoryContact.findByIdAndDelete(id);

  if (!deleted) {
    throw new AppError('Contact not found.', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Contact deleted successfully.'
  });
});

const bulkUpsertContacts = asyncHandler(async (req, res) => {
  const rows = Array.isArray(req.body.rows) ? req.body.rows : [];

  if (rows.length === 0) {
    throw new AppError('rows must be a non-empty array.', 400);
  }

  if (rows.length > 1000) {
    throw new AppError('You can upload up to 1000 rows at once.', 400);
  }

  const result = {
    created: 0,
    updated: 0,
    failed: []
  };

  for (let index = 0; index < rows.length; index += 1) {
    try {
      const data = validateContactInput(rows[index]);
      const existing = await EmailDirectoryContact.findOne({ email: data.email });

      if (!existing) {
        await EmailDirectoryContact.create({
          ...data,
          createdBy: req.user._id,
          updatedBy: req.user._id
        });
        result.created += 1;
      } else {
        existing.fullName = data.fullName;
        existing.role = data.role;
        existing.classCode = data.classCode;
        existing.department = data.department;
        existing.notes = data.notes;
        existing.updatedBy = req.user._id;
        await existing.save();
        result.updated += 1;
      }
    } catch (error) {
      result.failed.push({
        row: index + 1,
        message: error.message
      });
    }
  }

  res.status(200).json({
    success: true,
    message: `Import finished. Created: ${result.created}, updated: ${result.updated}, failed: ${result.failed.length}.`,
    data: result
  });
});

module.exports = {
  listContacts,
  createContact,
  updateContact,
  deleteContact,
  bulkUpsertContacts
};
