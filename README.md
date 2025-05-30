
# 📢 Mini Campaign Manager

A minimal campaign management system that allows marketers to create, schedule, send, and track campaigns across Email, SMS, and Social channels. Ideal for testing campaign logistics and webhook-based event tracking.

---

## 🚀 Features

- ✅ **Campaign Creation**: Name, type (Email/SMS/Social), audience, and schedule.
- 🕒 **Validated Scheduling**: Prevents scheduling campaigns in the past.
- 🧭 **Campaign Dashboard**: View all created campaigns in a searchable and paginated table.
- 🔍 **Advanced Filtering**: Filter by campaign name, type, event type, and date.
- 📈 **Campaign Summary Cards**: View performance summary with:
  - Days remaining
  - Campaign type
  - Current status (Upcoming, Ongoing, Ended)
  - Randomized reach (mock metric)
- 📬 **Webhook Integration**: Tracks email-related events like Sent, Delivered, and Opened via webhook data.
- 🖼️ **Responsive UI**: Styled with Tailwind CSS for clean, mobile-friendly views.
- ✨ Bonus: Reusable components, modal-based campaign creation, and Axios instance for API calls.

---

## 🛠️ Tech Stack

### Frontend
- ⚛️ React (with Vite)
- 🎨 Tailwind CSS
- 🖋️ Montserrat Font (Google Fonts)
- 🔗 Axios (with shared instance for cleaner API requests)
- 🎯 Lucide Icons

### Backend
- 🧠 Node.js + Express
- 🗂️ MongoDB with Mongoose
- 🌐 REST API for campaign CRUD & webhook logging

---

## ⚙️ Installation & Setup

### 1. Clone the Repo

```bash
git clone https://github.com/anooja62/Mini-Campaign-Manager.git
cd Mini-Campaign-Manager
````

---

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `/server` folder:

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
```

Start backend server:

```bash
npm run dev
```

---

### 3. Setup Frontend

```bash
```cd client
```npm install


Start frontend:


```npm run dev


---

## 🔍 API Endpoints Overview

| Method | Endpoint                | Description                |
| ------ | ----------------------- | -------------------------- |
| POST   | `/api/campaigns/create` | Create new campaign        |
| GET    | `/api/campaigns/`       | Get all campaigns          |
| GET    | `/api/webhooks`         | Fetch webhook event logs   |
| POST   | `/api/webhooks`         | Add webhook event (mocked) |

---

## 📦 Folder Structure

```
📁 client
  └── components/
  └── pages/
  └── utils/axiosInstance.js

📁 server
  └── models/
  └── routes/
  └── controllers/


---

## 🔮 Future Enhancements

* 📆 **Calendar View for Scheduling**
* 📉 **Real Analytics Integration (e.g., Mailgun, SendGrid)**
* 🧑‍💼 **User Authentication & Admin Access**
* 🧪 **Unit & Integration Tests**
* 📤 **Bulk Import of Audiences (CSV Upload)**
* 📎 **File Attachments to Campaigns**


## 📸 Screenshot

Here's a preview of the dashboard UI:

![Dashboard Screenshot](./assets/images/dashboard-ui.png)
