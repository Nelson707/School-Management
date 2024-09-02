const user = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator')

const registerUser = async (req,res) =>{
    try {
        const {name,email,password,role} = req.body;

        // Check if user already exists
        const existingUser = await user.findOne({ email });
        if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            res.status(500).json({ message: 'Please enter a valid email', error: error.message });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new user({
            name,
            email,
            password: hashedPassword,
            role
        });
        const savedUser = await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h', // Token expires in 1 hour
        });

        res.status(201).json({ token, user: savedUser });

    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
}