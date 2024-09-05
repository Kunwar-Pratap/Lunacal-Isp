# Lunacal ISP Project

This is the official Lunacal ISP project, a modern and responsive web application developed using **Next.js 14.2.7 (App Router)**, **Tailwind CSS**, **NextUI**, **TypeScript**, **Firebase**, **React Dropzone**, and **Framer Motion**. The project is hosted on [Vercel](https://vercel.com) and can be accessed live at:  
**[Lunacal ISP - Live Site](https://lunacal-isp-git-master-kunwar-prataps-projects.vercel.app/)**

## Features

- **Next.js 14.2.7 (App Router)** for dynamic and server-side rendering
- **Tailwind CSS** for efficient and responsive styling
- **NextUI** with individual installation for minimized CSS load
- **TypeScript** for type safety and improved developer experience
- **Firebase** for backend services like storage and Firestore
- **React Dropzone** for drag-and-drop file uploads
- **Framer Motion** for seamless animations and micro-interactions

## Tech Stack

- **Framework**: Next.js 14.2.7
- **Styling**: Tailwind CSS, NextUI
- **Language**: TypeScript
- **Storage & Database**: Firebase (Firestore and Storage)
- **File Uploads**: React Dropzone
- **Animations**: Framer Motion
- **Deployment**: Vercel

## Getting Started

To get started with this project locally, follow these steps:

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [Yarn](https://yarnpkg.com/getting-started/install) (optional but recommended over npm)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Kunwar-Pratap/Lunacal-Isp
    cd Lunacal-Isp
    ```

2. Install dependencies:

    ```bash
    yarn install
    # or use npm
    npm install
    ```

3. Set up environment variables. Create a `.env` file in the root directory and add your environment variables for Firebase configuration, Next.js, and other APIs as needed:

    ```bash
    NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
    NEXT_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
    ```

4. Run the development server:

    ```bash
    yarn dev
    # or use npm
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Deployment

This project is hosted on Vercel. For your own deployment:

1. Push your repository to a platform like GitHub.
2. [Connect Vercel](https://vercel.com/docs/concepts/deployments/overview) to your GitHub repository.
3. Vercel will automatically deploy your project.

For the current deployment, you can access it at:  
**[Lunacal ISP Live on Vercel](https://lunacal-isp-git-master-kunwar-prataps-projects.vercel.app/)**


## Core Libraries Used

- **[Next.js](https://nextjs.org/)**: React framework for server-rendered applications.
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for fast UI development.
- **[NextUI](https://nextui.org/)**: Beautifully designed UI components for Next.js.
- **[Firebase](https://firebase.google.com/)**: Backend services including Firestore for database and Storage for image hosting.
- **[React Dropzone](https://react-dropzone.js.org/)**: Easy-to-use component for handling file uploads.
- **[Framer Motion](https://www.framer.com/motion/)**: Animation library for React.

## Usage Instructions

### Adding New Images

1. To add images to the gallery, click the **"Add image"** button in the Gallery section.
2. Images are stored and fetched from Firebase Storage and displayed in a carousel format with navigation buttons.

### Features

1. **Features Section**: Display the core features of the application, allowing users to understand the primary offerings.
2. **Gallery Section**: A carousel-based image gallery to display uploaded images, fetched dynamically from Firebase.


#### Built with ❤️ by [Kunwar Pratap](https://kunwarpratap.dev/)
