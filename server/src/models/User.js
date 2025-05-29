import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  category: {
    type: String,
    enum: ['customer', 'subscriber', 'admin', 'other', 'female', 'male', 'family'], 
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  
  },
  status: {
    type: String,
    enum: ['yes', 'no'],
    default: 'yes',
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

export default User;
