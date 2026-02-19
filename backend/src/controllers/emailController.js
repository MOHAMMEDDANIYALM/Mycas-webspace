const { User } = require('../models/User');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');
const { sendBulkEmailInBatches } = require('../utils/emailService');

const sendBulkEmail = asyncHandler(async (req, res) => {
  const { classId, subject, message } = req.body;

  req.setTimeout(0);
  res.setTimeout(0);
  if (req.socket) {
    req.socket.setTimeout(0);
  }

  if (!classId) {
    throw new AppError('classId is required.', 400);
  }

  if (!subject || !subject.trim() || !message || !message.trim()) {
    throw new AppError('subject and message are required.', 400);
  }

  const normalizedClassId = classId.trim().toUpperCase();

  const students = await User.find({
    role: 'student',
    $or: [{ classId: normalizedClassId }, { classCode: normalizedClassId }]
  }).select('email');

  const recipients = students.map((student) => student.email).filter(Boolean);

  if (recipients.length === 0) {
    throw new AppError('No student emails found for this classId.', 404);
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
    successCount: result.successCount,
    failureCount: result.failureCount,
    message: 'Bulk email completed'
  });
});

module.exports = {
  sendBulkEmail
};
