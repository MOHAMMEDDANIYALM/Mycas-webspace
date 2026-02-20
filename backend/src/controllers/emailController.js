const { User } = require('../models/User');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');
const { sendBulkEmailInBatches } = require('../utils/emailService');

const sendBulkEmail = asyncHandler(async (req, res) => {
  const { classCode, subject, message } = req.body;

  req.setTimeout(0);
  res.setTimeout(0);
  if (req.socket) {
    req.socket.setTimeout(0);
  }

  if (!classCode || typeof classCode !== 'string') {
    throw new AppError('classCode is required.', 400);
  }

  if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
    throw new AppError('subject is required and cannot be empty.', 400);
  }

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    throw new AppError('message is required and cannot be empty.', 400);
  }

  if (subject.trim().length > 200) {
    throw new AppError('subject cannot exceed 200 characters.', 400);
  }

  if (message.trim().length > 10000) {
    throw new AppError('message cannot exceed 10000 characters.', 400);
  }

  const normalizedClassCode = classCode.trim().toUpperCase();

  const students = await User.find({
    role: 'student',
    $or: [{ classId: normalizedClassCode }, { classCode: normalizedClassCode }]
  }).select('email');

  const recipients = students.map((student) => student.email).filter(Boolean);

  if (recipients.length === 0) {
    throw new AppError('No student emails found for this class.', 404);
  }

  let result;

  try {
    result = await sendBulkEmailInBatches({
      recipients,
      subject: subject.trim(),
      message: message.trim(),
      batchSize: 50
    });
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    console.error('Unexpected bulk email error:', error);
    throw new AppError('Bulk email failed unexpectedly.', 500);
  }

  res.status(200).json({
    success: true,
    successCount: result.successCount,
    failureCount: result.failureCount,
    totalRecipients: recipients.length,
    message: `Bulk email completed: ${result.successCount} sent, ${result.failureCount} failed`
  });
});

module.exports = {
  sendBulkEmail
};
