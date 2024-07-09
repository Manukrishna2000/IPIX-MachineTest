const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Adjust the path if necessary

const createDefaultAdmin = async () => {
  try {
    const admin = await User.findOne({ username: 'admin' });
    if (!admin) {
      const hashedPassword = await bcrypt.hash('adminPassword', 10);
      const newAdmin = new User({
        username: 'admin',
        password: hashedPassword,
        role: 'admin',
      });
      await newAdmin.save();
      console.log('Default admin created');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error creating default admin:', error);
  }
};

module.exports = createDefaultAdmin;
