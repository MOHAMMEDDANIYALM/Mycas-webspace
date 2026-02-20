const dotenv = require('dotenv');
const mongoose = require('mongoose');
const readline = require('readline');

dotenv.config();

const { User } = require('../src/models/User');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

const createSuperAdmin = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('Error: MONGODB_URI not found in .env file');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    const fullName = Mohammed Daniyal M
    const email = mohammeddaniyal@gmail.com
    const password = DONOFDONs&9591

    if (!fullName || !email || !password) {
      console.error('\nError: All fields are required.');
      process.exit(1);
    }

    if (password.length < 8) {
      console.error('\nError: Password must be at least 8 characters.');
      process.exit(1);
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      console.error(`\nError: User with email ${normalizedEmail} already exists.`);
      process.exit(1);
    }

    const superAdmin = await User.create({
      fullName: fullName.trim(),
      email: normalizedEmail,
      password,
      role: 'super_admin',
      classCode: '',
      classId: ''
    });

    console.log('\n✓ Super admin created successfully!');
    console.log(`  Email: ${superAdmin.email}`);
    console.log(`  Role: ${superAdmin.role}`);
    console.log(`  ID: ${superAdmin._id}`);

    process.exit(0);
  } catch (error) {
    console.error('\nError creating super admin:', error.message);
    process.exit(1);
  } finally {
    rl.close();
    await mongoose.connection.close();
  }
};

createSuperAdmin();
