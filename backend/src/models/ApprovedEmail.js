const mongoose = require('mongoose');

const approvedEmailSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    classCode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true
    },
    fullName: {
      type: String,
      trim: true,
      default: ''
    },
    rollNumber: {
      type: String,
      trim: true,
      default: ''
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'registered'],
      default: 'pending'
    },
    registeredAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

approvedEmailSchema.index({ email: 1 });
approvedEmailSchema.index({ classCode: 1 });
approvedEmailSchema.index({ approvedBy: 1, classCode: 1 });

module.exports = mongoose.model('ApprovedEmail', approvedEmailSchema);
