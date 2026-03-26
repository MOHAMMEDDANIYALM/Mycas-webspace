const mongoose = require('mongoose');

const CONTACT_ROLES = ['student', 'teacher'];

const emailDirectoryContactSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    role: {
      type: String,
      enum: CONTACT_ROLES,
      required: true
    },
    classCode: {
      type: String,
      trim: true,
      uppercase: true,
      default: ''
    },
    department: {
      type: String,
      trim: true,
      default: ''
    },
    notes: {
      type: String,
      trim: true,
      default: ''
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

emailDirectoryContactSchema.index({ role: 1 });
emailDirectoryContactSchema.index({ classCode: 1 });
emailDirectoryContactSchema.index({ department: 1 });

module.exports = {
  EmailDirectoryContact: mongoose.model('EmailDirectoryContact', emailDirectoryContactSchema),
  CONTACT_ROLES
};
