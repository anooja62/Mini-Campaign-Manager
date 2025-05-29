import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI; 

const categories = ['customer', 'subscriber', 'admin', 'other', 'female', 'male', 'family'];

async function seedUsers() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await User.deleteMany(); 

    const users = Array.from({ length: 30 }).map(() => ({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        category: faker.helpers.arrayElement(categories),
        phoneNumber: faker.phone.number('##########').replace(/^[0-5]/, () =>
          faker.number.int({ min: 6, max: 9 }).toString()
        ),
        status: faker.helpers.arrayElement(['yes', 'no']),
      }));
      

    await User.insertMany(users);
    console.log('✅ Inserted 30 fake users.');
    mongoose.disconnect();
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    mongoose.disconnect();
  }
}

seedUsers();
