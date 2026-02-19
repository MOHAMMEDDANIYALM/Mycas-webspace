const mongoose = require('mongoose');

const timetableEventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120
    },
    classCode: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
      maxlength: 40
    },
    room: {
      type: String,
      trim: true,
      maxlength: 40,
      default: ''
    },
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
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

timetableEventSchema.index({ classCode: 1, start: 1, end: 1 });

module.exports = mongoose.model('TimetableEvent', timetableEventSchema);
