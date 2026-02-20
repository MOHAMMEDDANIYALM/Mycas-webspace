const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const { User } = require('../src/models/User');

const addSuperAdmin = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('Error: MONGODB_URI not found in .env file');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    const email = 'mohammeddaniyal848@gmail.com';
    const fullName = 'Mohammed Daniyal';
    const password = 'Admin@123456'; // Change this password after first login!

    const normalizedEmail = email.toLowerCase().trim();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      console.log(`User with email ${normalizedEmail} already exists.`);
      console.log(`Current role: ${existingUser.role}`);
      
      if (existingUser.role !== 'super_admin') {
        existingUser.role = 'super_admin';
        await existingUser.save();
        console.log('✓ User role updated to super_admin');
      } else {
        console.log('✓ User is already a super admin');
      }
      
      process.exit(0);
    }

    const superAdmin = await User.create({
      fullName,
      email: normalizedEmail,
      password,
      role: 'super_admin',
      classCode: '',
      classId: ''
    });

    console.log('✓ Super admin created successfully!');
    console.log(`  Email: ${superAdmin.email}`);
    console.log(`  Password: ${password}`);
    console.log(`  Role: ${superAdmin.role}`);
    console.log(`  ID: ${superAdmin._id}`);
    console.log('\n⚠️  IMPORTANT: Change the password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('\nError:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

addSuperAdmin();
