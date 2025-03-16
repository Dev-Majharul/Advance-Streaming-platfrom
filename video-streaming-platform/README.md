# VideoStream Platform

A modern, high-performance video streaming platform built with React, TypeScript, Tailwind CSS, and Firebase.

## Features

- ✅ Responsive, modern UI with Tailwind CSS
- ✅ Real-time database and storage with Firebase
- ✅ Video uploading with drag-and-drop functionality
- ✅ Embed videos from platforms like YouTube, Vimeo, etc.
- ✅ Admin dashboard for content management
- ✅ Authentication system with admin privileges
- ✅ Fast search functionality
- ✅ Mobile-friendly design

## Tech Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS, HeadlessUI
- **State Management**: React Context API
- **Backend/Database**: Firebase (Firestore)
- **Storage**: Firebase Storage
- **Authentication**: Firebase Auth
- **Routing**: React Router
- **Form Handling**: React Hooks
- **File Upload**: React Dropzone

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- Firebase account and project

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/video-streaming-platform.git
   cd video-streaming-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure Firebase:
   - Create a Firebase project at [firebase.google.com](https://firebase.google.com)
   - Enable Firestore, Storage, and Authentication services
   - Add your Firebase configuration to `src/firebase.ts`

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Deployment

This project can be easily deployed to various platforms:

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init
npm run build
firebase deploy
```

### Vercel or Netlify

Simply connect your repository to Vercel or Netlify for automatic deployments.

## Admin Access

To set up admin access:

1. Register a user through the app
2. In Firebase Console, go to Firestore
3. Create a 'users' collection
4. Add a document with the user's UID
5. Add a field `isAdmin: true` to grant admin privileges

## Folder Structure

```
src/
├── components/        # Reusable UI components
├── contexts/          # React Context providers
├── hooks/             # Custom React hooks
├── pages/             # Page components
├── types/             # TypeScript interfaces/types
├── firebase.ts        # Firebase configuration
├── App.tsx            # Main App component
└── index.tsx          # Entry point
```

## License

This project is licensed under the MIT License.

## Acknowledgments

- Icons by Heroicons
- UI components inspired by Tailwind UI

---

Developed with ❤️ by [Your Name] 