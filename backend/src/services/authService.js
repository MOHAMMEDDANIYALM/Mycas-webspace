const ApprovedEmail = require('../../models/ApprovedEmail');
const { User } = require('../../models/User');
const AppError = require('../../utils/AppError');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateEmail = (email) => {
  return emailRegex.test(email);
};

const checkEmailApproval = async (email) => {
  const normalizedEmail = email.toLowerCase().trim();

  if (!validateEmail(normalizedEmail)) {
    throw new AppError('Invalid email format.', 400);
  }

  const approvedEmail = await ApprovedEmail.findOne({ email: normalizedEmail });

  if (!approvedEmail) {
    return {
      isApproved: false,
      status: 'not_approved',
      message: 'Email has not been approved for registration.'
    };
  }

  if (approvedEmail.status === 'registered') {
    return {
      isApproved: false,
      status: 'registered',
      message: 'This email has already been registered.',
      registeredAt: approvedEmail.registeredAt
    };
  }

  return {
    isApproved: true,
    status: 'approved',
    classCode: approvedEmail.classCode,
    approvedData: approvedEmail
  };
};

const registerStudentWithApprovedEmail = async (userData, approvedEmail) => {
  const user = await User.create({
    fullName: userData.fullName,
    email: userData.email,
    password: userData.password,
    role: 'student',
    classCode: approvedEmail.classCode,
    classId: approvedEmail.classCode
  });

  // Mark email as registered
  approvedEmail.status = 'registered';
  approvedEmail.registeredAt = new Date();
  await approvedEmail.save();

  return user;
};

module.exports = {
  validateEmail,
  checkEmailApproval,
  registerStudentWithApprovedEmail
};
