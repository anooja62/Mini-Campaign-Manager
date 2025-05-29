import mongoose from 'mongoose';
import dotenv from 'dotenv';
import EmailTemplate from '../models/EmailTemplate.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const templates = [
  {
    name: "Summer Sale",
    subject: "🔥 Big Discounts This Summer!",
    body: "<p>Enjoy up to 50% off on your favorite items this summer. Shop now!</p>",
    category: "offer"
  },
  {
    name: "New Arrivals",
    subject: "🆕 Check Out Our Latest Collection",
    body: "<p>Be the first to grab our newest products. They're selling fast!</p>",
    category: "announcement"
  },
  {
    name: "Loyalty Rewards",
    subject: "🎁 You’ve Earned a Reward!",
    body: "<p>Thanks for being with us! Here's a special reward just for you.</p>",
    category: "promotion"
  },
  {
    name: "Weekly Newsletter",
    subject: "📰 Your Weekly Updates Are Here",
    body: "<p>Stay updated with the latest trends, tips, and stories.</p>",
    category: "newsletter"
  },
  {
    name: "Flash Sale",
    subject: "⚡ Limited-Time Offer!",
    body: "<p>Only for 24 hours! Grab your favorites at jaw-dropping prices.</p>",
    category: "offer"
  },
  {
    name: "Referral Program",
    subject: "👫 Invite & Earn",
    body: "<p>Refer your friends and earn exciting rewards for each signup.</p>",
    category: "promotion"
  },
  {
    name: "Customer Appreciation",
    subject: "💖 Thank You!",
    body: "<p>We appreciate your support. Here's a small token of gratitude.</p>",
    category: "promotion"
  },
  {
    name: "Webinar Invite",
    subject: "🎓 Join Our Free Webinar!",
    body: "<p>Gain valuable insights from experts. Reserve your spot today.</p>",
    category: "event"
  },
  {
    name: "Cart Reminder",
    subject: "🛒 You Left Something Behind!",
    body: "<p>Your cart misses you. Complete your purchase now and save more.</p>",
    category: "promotion"
  },
  {
    name: "Festive Greetings",
    subject: "🎉 Happy Holidays from All of Us!",
    body: "<p>Wishing you a joyful season and a prosperous new year!</p>",
    category: "announcement"
  },
];

async function seedEmailTemplates() {
  try {
    await mongoose.connect(MONGO_URI);

    await EmailTemplate.deleteMany(); // Clear old templates
    await EmailTemplate.insertMany(templates);

    console.log("✅ Inserted 10 marketing email templates.");
    mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error seeding email templates:", error);
    mongoose.disconnect();
  }
}

seedEmailTemplates();
