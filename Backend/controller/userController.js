const UserModel = require('../models/UserModel');
const validator = require('validator');
const bcrypt = require('bcrypt')
const userModel = require('../models/UserModel');
const { use } = require('../routes/foodRoutes');
const { createTokenForUser } = require('../Service/Auth');


//handel signin
const hanldeUserSignup = async (req, res) => {
    try {
      const { name, email, password, cartData } = req.body;
      console.log(name, email, password);
  
      // Check if user already exists
      const exists = await UserModel.findOne({ email });
      if (exists) {
        return res.status(400).json({ success: false, message: 'User already exists' });
      }


  
      // Validate email format
      if (!validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: 'Please enter a valid email address' });
      }
  
      // Simple password validation
      const simplePasswordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
      if (!simplePasswordRegex.test(password)) {
        return res.status(400).json({
          success: false,
          message: 'Password must be at least 6 characters long and include at least one letter and one number.',
        });
      }
      
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create the user
      const createdUser = await UserModel.create({
        name,
        email,
        password: hashedPassword,
        cartData,
      });
  
      res.status(201).json({ success: true, message: 'User created successfully' });
  
    } catch (error) {
      console.error('Signup error:', error);
  
      // Handle duplicate key error (e.g., email already exists, if indexed as unique)
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: `User with this ${Object.keys(error.keyValue)[0]} already exists`,
        });
      }
  
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  

  const handleUserLogin = async (req, res) => {

    const { email, password } = req.body;
  
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }
  
    try {
      // Look for user in the database
      const user = await userModel.findOne({ email });
  
      // If user doesn't exist
      if (!user) {
        return res.status(404).json({ success: false, message: "User doesn't exist" });
      }
  
      // Compare password with stored hash
      const isMatch = await bcrypt.compare(password, user.password);
  
      // If password doesn't match
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
  
      // Generate token
      const token = createTokenForUser(user);
      console.log('Logined')
  
      // Send success response with token
      res.status(200).json({ success: true, token });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  };
  

module.exports = {
    hanldeUserSignup,
    handleUserLogin,
}