# 📢 Mini Campaign Manager

A minimal campaign management system for creating, scheduling, sending, and tracking basic marketing campaigns via Email, SMS, or Social channels.

## 🚀 Features

- ✅ Campaign Creation (Name, Type, Audience, Schedule)
- 📅 Validated Scheduling (no past dates)
- 📊 Dashboard View (list campaigns, emails sent)
- 🔍 Search & Filter (by campaign name, type, and email status)
- 📈 Campaign Summary (days remaining, type, status, reach)
- 📬 Webhook Integration to track email events (sent, delivered, opened, etc.)

## 🛠️ Tech Stack

**Frontend**:
- React (with Vite)
- Tailwind CSS
- Montserrat Font (Google Fonts)

**Backend**:
- Node.js + Express
- MongoDB with Mongoose



## ⚙️ Installation & Setup

1. **Clone the repo**:
   ```bash
   git clone https://github.com/your-username/Mini-Campaign-Manager.git
   cd Mini-Campaign-Manager
   npm install

## Create a .env file in the root with:
MONGO_URI=your_mongodb_connection_string
PORT=8000

