const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const { User } = require('../src/models/User');

const createTestAdmin = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('Error: MONGODB_URI not found in .env file');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    const email = 'admin@mycas.com';
    const password = 'Admin123456';

    // Delete if exists
    await User.deleteOne({ email: email.toLowerCase().trim() });

    const admin = await User.create({
      fullName: 'Test Admin',
      email: email.toLowerCase().trim(),
      password: password,
      role: 'super_admin',
      classCode: '',
      classId: ''
    });

    console.log('✓ Test admin created successfully!');
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

createTestAdmin();
