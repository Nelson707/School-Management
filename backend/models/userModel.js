const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Teacher', 'Student', 'Parent'], required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' }, // Only for Students
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }], // Only for Teachers
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Only for Students
  resetToken: { type: String }, // For password reset functionality
  resetTokenExpiration: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('user', userSchema);
