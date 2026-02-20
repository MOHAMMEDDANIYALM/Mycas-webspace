const ApprovedEmail = require('../models/ApprovedEmail');
const { User } = require('../models/User');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail = (email) => {
  return emailRegex.test(email);
};

// Add single student email
const addStudentEmail = asyncHandler(async (req, res) => {
  const { email, classCode, fullName, rollNumber } = req.body;

  if (!email || !classCode) {
    throw new AppError('Email and classCode are required.', 400);
  }

  const normalizedEmail = email.toLowerCase().trim();
  const normalizedClassCode = classCode.toUpperCase().trim();

  if (!validateEmail(normalizedEmail)) {
    throw new AppError('Invalid email format.', 400);
  }

  if (!normalizedClassCode) {
    throw new AppError('classCode is required.', 400);
  }

  // Check if already registered
  const existingApprovedEmail = await ApprovedEmail.findOne({ email: normalizedEmail });
  if (existingApprovedEmail) {
    if (existingApprovedEmail.status === 'registered') {
      throw new AppError('This email has already been registered.', 409);
    }
    // If pending/approved, it's a duplicate approval
    throw new AppError('This email is already in the approval list.', 409);
  }

  // Check if email already has a user account
  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) {
    throw new AppError('This email is already registered as a user.', 409);
  }

  const approvedEmail = await ApprovedEmail.create({
    email: normalizedEmail,
    classCode: normalizedClassCode,
    fullName: fullName?.trim() || '',
    rollNumber: rollNumber?.trim() || '',
    approvedBy: req.user._id,
    status: 'approved'
  });

  res.status(201).json({
    success: true,
    message: 'Student email added successfully.',
    data: approvedEmail
  });
});

// Bulk upload student emails (CSV format)
const bulkAddStudentEmails = asyncHandler(async (req, res) => {
  const { emails } = req.body;

  if (!Array.isArray(emails) || emails.length === 0) {
    throw new AppError('emails array is required and cannot be empty.', 400);
  }

  if (emails.length > 100) {
    throw new AppError('Cannot add more than 100 emails at once.', 400);
  }

  const results = {
    successful: [],
    failed: [],
    duplicates: []
  };

  for (const emailEntry of emails) {
    try {
      if (typeof emailEntry === 'string') {
        // Simple email string
        const normalizedEmail = emailEntry.toLowerCase().trim();
        if (!validateEmail(normalizedEmail)) {
          results.failed.push({ email: emailEntry, reason: 'Invalid email format' });
          continue;
        }

        const existing = await ApprovedEmail.findOne({ email: normalizedEmail });
        if (existing) {
          results.duplicates.push(normalizedEmail);
          continue;
        }

        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
          results.failed.push({ email: emailEntry, reason: 'Email already registered' });
          continue;
        }

        const emailData = req.body.classCode
          ? {
              email: normalizedEmail,
              classCode: req.body.classCode.toUpperCase().trim(),
              approvedBy: req.user._id,
              status: 'approved'
            }
          : null;

        if (!emailData) {
          results.failed.push({ email: emailEntry, reason: 'classCode is required' });
          continue;
        }

        const approvedEmail = await ApprovedEmail.create(emailData);
        results.successful.push(approvedEmail);
      } else if (typeof emailEntry === 'object') {
        // Object with email, classCode, fullName, etc.
        const { email, classCode, fullName, rollNumber } = emailEntry;

        if (!email || !classCode) {
          results.failed.push({ email: email || 'unknown', reason: 'Email and classCode required' });
          continue;
        }

        const normalizedEmail = email.toLowerCase().trim();
        const normalizedClassCode = classCode.toUpperCase().trim();

        if (!validateEmail(normalizedEmail)) {
          results.failed.push({ email, reason: 'Invalid email format' });
          continue;
        }

        const existing = await ApprovedEmail.findOne({ email: normalizedEmail });
        if (existing) {
          results.duplicates.push(normalizedEmail);
          continue;
        }

        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
          results.failed.push({ email, reason: 'Email already registered' });
          continue;
        }

        const approvedEmail = await ApprovedEmail.create({
          email: normalizedEmail,
          classCode: normalizedClassCode,
          fullName: fullName?.trim() || '',
          rollNumber: rollNumber?.trim() || '',
          approvedBy: req.user._id,
          status: 'approved'
        });

        results.successful.push(approvedEmail);
      }
    } catch (error) {
      results.failed.push({ email: emailEntry?.email || emailEntry, reason: error.message });
    }
  }

  res.status(200).json({
    success: true,
    message: `Bulk upload completed. ${results.successful.length} successful, ${results.failed.length} failed.`,
    data: results
  });
});

// Get all approved emails for a teacher's class
const getApprovedEmails = asyncHandler(async (req, res) => {
  const { classCode } = req.query;

  if (!classCode) {
    throw new AppError('classCode query parameter is required.', 400);
  }

  const normalizedClassCode = classCode.toUpperCase().trim();

  const approvedEmails = await ApprovedEmail.find({
    classCode: normalizedClassCode,
    approvedBy: req.user._id
  })
    .sort({ createdAt: -1 })
    .select('-approvedBy');

  res.status(200).json({
    success: true,
    count: approvedEmails.length,
    data: approvedEmails
  });
});

// Delete an approved email
const deleteApprovedEmail = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const approvedEmail = await ApprovedEmail.findById(id);

  if (!approvedEmail) {
    throw new AppError('Approved email not found.', 404);
  }

  // Check if the requesting user is the one who approved it
  if (approvedEmail.approvedBy.toString() !== req.user._id.toString()) {
    throw new AppError('You do not have permission to delete this email.', 403);
  }

  // Cannot delete if already registered
  if (approvedEmail.status === 'registered') {
    throw new AppError('Cannot delete an email that has already been used for registration.', 400);
  }

  await ApprovedEmail.findByIdAndDelete(id);

  res.status(200).json({
    success: true,
    message: 'Approved email deleted successfully.'
  });
});

// Get registration status of an approved email
const getEmailStatus = asyncHandler(async (req, res) => {
  const { email } = req.query;

  if (!email) {
    throw new AppError('email query parameter is required.', 400);
  }

  const normalizedEmail = email.toLowerCase().trim();

  const approvedEmail = await ApprovedEmail.findOne({ email: normalizedEmail });

  if (!approvedEmail) {
    return res.status(200).json({
      success: true,
      status: 'not_approved',
      message: 'This email has not been approved.'
    });
  }

  res.status(200).json({
    success: true,
    status: approvedEmail.status,
    data: {
      email: approvedEmail.email,
      classCode: approvedEmail.classCode,
      status: approvedEmail.status,
      registeredAt: approvedEmail.registeredAt
    }
  });
});

module.exports = {
  addStudentEmail,
  bulkAddStudentEmails,
  getApprovedEmails,
  deleteApprovedEmail,
  getEmailStatus
};
