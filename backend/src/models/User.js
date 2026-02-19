const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ROLES = ['student', 'teacher', 'promo_admin', 'super_admin'];

const refreshTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true
    },
    expiresAt: {
      type: Date,
      required: true
    }
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false
    },
    role: {
      type: String,
      enum: ROLES,
      default: 'student'
    },
    classCode: {
      type: String,
      trim: true,
      uppercase: true,
      maxlength: 40,
      default: ''
    },
    classId: {
      type: String,
      trim: true,
      uppercase: true,
      maxlength: 40,
      default: ''
    },
    refreshTokens: {
      type: [refreshTokenSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

userSchema.pre('save', async function preSave(next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  return next();
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = { User, ROLES };
