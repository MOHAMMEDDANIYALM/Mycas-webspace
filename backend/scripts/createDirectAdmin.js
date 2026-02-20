const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

dotenv.config();

const { User } = require('../src/models/User');

const createDirectAdmin = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('Error: MONGODB_URI not found in .env file');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    console.log('Database:', mongoose.connection.db.databaseName, '\n');

    const email = 'admin@mycas.edu';
    const password = 'SuperAdmin123';

    // Delete if exists
    await User.deleteOne({ email: email.toLowerCase().trim() });

    // Hash password manually
    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = new User({
      fullName: 'System Administrator',
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: 'super_admin',
      classCode: '',
      classId: ''
    });

    // Save without triggering pre-save hook again
    await admin.save({ validateBeforeSave: true });

    console.log('✓ Admin created successfully!');
    console.log(`  Email: ${admin.email}`);
    console.log(`  Password: ${password}`);
    console.log(`  Role: ${admin.role}`);
    console.log(`  ID: ${admin._id}`);

    process.exit(0);
  } catch (error) {
    console.error('\nError:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

createDirectAdmin();
