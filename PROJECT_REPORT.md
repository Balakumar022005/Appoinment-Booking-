# Appointment Booking System - Project Report

## 1. Project Overview
The **Appointment Booking System** is a full-stack web application designed to facilitate the scheduling of appointments. It serves two primary user roles: **Users**, who can register, log in, and book appointments; and **Admins**, who can manage and view all booked appointments. The application is built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js), ensuring a robust and scalable architecture.

## 2. Technical Architecture

### Frontend
- **Framework:** React.js (v19)
- **UI Library:** Material UI (MUI) v7 - providing a modern, responsive, and accessible user interface.
- **Routing:** React Router DOM (v7) - handling client-side navigation and protected routes.
- **HTTP Client:** Axios - for making API requests to the backend.
- **Notifications:** React Toastify - for user feedback (success/error messages).

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js (v5) - handling API routes and middleware.
- **Database:** MongoDB (via Mongoose v9) - storing user and appointment data.
- **Authentication:** JSON Web Tokens (JWT) & Bcryptjs - for secure user authentication and password hashing.
- **Environment Management:** Dotenv - for managing configuration variables.

## 3. Key Features

### User Features
- **Registration & Login:** Secure account creation and login functionality.
- **Appointment Booking:** Users can select dates and times to book appointments.
- **Dashboard:** View booking status and history (implied by structure).

### Admin Features
- **Admin Login:** Dedicated login portal for administrators.
- **Appointment Management:** View a list of all appointments with details.
- **Status Updates:** (Potential feature) Approve or reject appointments.

### Security & UX
- **Protected Routes:** Prevents unauthorized access to user/admin specific pages.
- **Responsive Design:** Works seamlessly on desktop and mobile devices.
- **Default Admin Setup:** Automatically creates an admin account on first run.

## 4. Project Structure

```
Appoint/
├── backend/                # Server-side logic
│   ├── models/             # Database schemas (User, Appointment)
│   ├── routes/             # API endpoints (Auth, Appointments)
│   ├── server.js           # Main application entry point
│   ├── .env                # Environment variables (GitIgnored)
│   └── package.json        # Backend dependencies
│
└── frontend/               # Client-side application
    ├── public/             # Static assets
    ├── src/
    │   ├── components/     # Reusable UI components (Login, Layout, etc.)
    │   ├── pages/          # Main views (BookingForm, AppointmentsList)
    │   ├── App.jsx         # Main routing logic
    │   ├── api.js          # Axios instance configuration
    │   └── theme.js        # MUI theme configuration
    └── package.json        # Frontend dependencies
```

## 5. Installation & Setup Guide

Follow these instructions to set up the project locally from GitHub.

### Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (v14 or higher)
- **MongoDB** (Local instance or MongoDB Atlas connection string)
- **Git**

### Step 1: Clone the Repository
Open your terminal and run:
```bash
git clone <repository-url>
cd Appoint
```

### Step 2: Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory and add your configuration:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   JWT_SECRET=your_super_secret_key
   ```
   *(Replace `your_mongodb_connection_string` with your actual MongoDB URI)*

4. Start the backend server:
   ```bash
   npm start
   ```
   You should see: `Server running on port 5000` and `MongoDB Atlas Connected ✔`.

   > **Note:** On the first run, a default admin account is created:
   > - **Email:** `admin@gmail.com`
   > - **Password:** `admin123`

### Step 3: Frontend Setup
1. Open a **new terminal window** (keep the backend running).
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the React development server:
   ```bash
   npm start
   ```
   The application will automatically open at `http://localhost:3000`.

## 6. Usage Instructions

1. **User Access:**
   - Go to `http://localhost:3000`.
   - Click "Register" to create a new account.
   - Log in to access the Booking form.

2. **Admin Access:**
   - Go to `http://localhost:3000/admin-login`.
   - Log in with the default credentials (`admin@gmail.com` / `admin123`).
   - View and manage appointments from the dashboard.
