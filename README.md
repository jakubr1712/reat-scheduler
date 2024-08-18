
# Scheduler App

This is a Scheduler App built with Vite, TypeScript, React, React Query, and Firebase. The application allows users to create, edit, and delete appointments, with data being persisted in a Firebase database.

## Prerequisites

- Node.js version 14.x or later is required.

## Table of Contents

- [Scheduler App](#scheduler-app)
  - [Prerequisites](#prerequisites)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
  - [Project Structure](#project-structure)
  - [Firebase Configuration](#firebase-configuration)
  - [Features](#features)
  - [Usage](#usage)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/jakubr1712/reat-scheduler.git
   cd reat-scheduler
   ```

2. **Install dependencies:**

   Ensure you have [Node.js](https://nodejs.org/) installed. Then run:

   ```bash
   npm install
   ```

## Running the Application

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Build for production:**

   To create an optimized production build, run:

   ```bash
   npm run build
   ```

3. **Preview the production build:**

   After building the app, you can preview it using:

   ```bash
   npm run preview
   ```

## Project Structure

The project structure is organized as follows:

```
.
├── public/                     # Static assets
├── src/
│   ├── components/             # React components
│   ├── constants/             # constants
│   ├── hooks/             # hooks
│   ├── types/             # types
│   ├── utils/             # utils
│   ├── services/               # Firebase service files
│   ├── main.tsx                # Entry point for React
├── .env                        # Environment variables (Firebase config)
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
└── ...
```

## Firebase Configuration

To use Firebase, you need to set up a Firebase project and add your configuration details.

1. **Create a Firebase project** in the [Firebase Console](https://console.firebase.google.com/).

2. **Add a web app** to your Firebase project and copy the Firebase config object.

3. **Create a `.env` file** in the root of your project and add your Firebase configuration:

   ```makefile
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

4. **Initialize Firebase in your project**:

   In `src/services/firebase.ts`, ensure Firebase is initialized using the configuration from the `.env` file.

## Features

- **Create, edit, and delete appointments**: Manage your appointments with a user-friendly interface.
- **Real-time data persistence with Firebase**: All appointment data is stored in Firebase and updates in real-time.
- **React Query for data management**: Efficient data fetching, caching, and synchronization with React Query.

## Usage

1. **Add an Appointment**:
   - Click the "Add" button to create a new appointment.
   - Fill in the details and save the appointment.

2. **Edit an Appointment**:
   - Click on an appointment to open the edit form.
   - Modify the details and save the changes.

3. **Delete an Appointment**:
   - Open an appointment and click the "Delete" button.

