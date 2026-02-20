const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const { User } = require('../src/models/User');

const resetPassword = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      console.error('Error: MONGODB_URI not found in .env file');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    const email = 'mohammeddaniyal848@gmail.com';
    const newPassword = 'Admin@123456';

    const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');
    
    if (!user) {
      console.log('✗ User not found!');
      console.log('Creating new super admin...\n');
      
      const superAdmin = await User.create({
        fullName: 'Mohammed Daniyal',
        email: email.toLowerCase().trim(),
        password: newPassword,
        role: 'super_admin',
        classCode: '',
        classId: ''
      });
      
      console.log('✓ Super admin created successfully!');
      console.log(`  Email: ${superAdmin.email}`);
      console.log(`  Password: ${newPassword}`);
      console.log(`  Role: ${superAdmin.role}`);
      console.log(`  ID: ${superAdmin._id}`);
    } else {
      console.log(`Found user: ${user.email}`);
      console.log(`Current role: ${user.role}\n`);
      
      // Update password (will trigger hashing via pre-save hook)
      user.password = newPassword;
      user.role = 'super_admin';
      await user.save();
      
      console.log('✓ Password updated successfully!');
      console.log(`  Email: ${user.email}`);
      console.log(`  Password: ${newPassword}`);
      console.log(`  Role: ${user.role}`);
    }
    
    console.log('\n⚠️  IMPORTANT: Change the password after first login!');
    
    process.exit(0);
  } catch (error) {
    console.error('\nError:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
  }
};

resetPassword();
