import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

async function updatePhoneNumbers() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const users = await User.find();

    for (const user of users) {
      const newPhoneNumber = faker.phone
        .number('##########')
        .replace(/^[0-5]/, () => String(faker.number.int({ min: 6, max: 9 })));

      user.phoneNumber = newPhoneNumber;
      await user.save();
    }

    console.log('✅ Updated phone numbers for all users.');
    await mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error updating phone numbers:', error);
    await mongoose.disconnect();
  }
}

updatePhoneNumbers();
