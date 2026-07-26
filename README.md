# CareerCraft AI

CareerCraft AI is a modern web application designed to help users build their careers with AI-powered tools. The platform provides a suite of features including an AI Assistant, Resume Builder, Cover Letter Builder, ATS Checker, and various Resume Templates.

## 🚀 Features

- **Authentication & Authorization**: Secure sign-up, login, and protected routes.
- **AI Assistant**: Get intelligent career advice and guidance.
- **Resume Builder**: Easily craft professional resumes.
- **Cover Letter Builder**: Generate compelling cover letters tailored to job descriptions.
- **ATS Checker**: Evaluate resumes against Applicant Tracking Systems to optimize chances of getting hired.
- **Resume Templates**: Choose from a variety of professional templates.
- **Dark Mode & Theming**: Integrated theming support, including a dark mode that respects user preferences or system settings.
- **Multi-language Support**: Designed with internationalization in mind.
- **User Dashboard & Profile**: Manage your documents, settings, and personal information efficiently.

## 💻 Tech Stack

- **Frontend Framework**: [React 18](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Context API (`AuthContext`, `LanguageContext`)

## 📂 Project Structure

```text
src/
├── components/      # Reusable UI components and Auth wrappers (e.g., ProtectedRoute)
├── context/         # React Context providers (AuthContext, LanguageContext)
├── pages/           # Application pages (Landing, Dashboard, ResumeBuilder, etc.)
├── App.jsx          # Main application component and routing configuration
└── main.jsx         # Application entry point
```

## 🛠️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm or yarn

### Installation

1. **Clone the repository** (if applicable) or download the source code:
   ```bash
   git clone <repository-url>
   cd stitch_careercraft_ai_landing_page
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:5173/` to view the application.

## 📜 Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the app for production.
- `npm run preview`: Bootstraps a local web server to preview the production build.

## 🎨 Theming

The application supports dynamic theming. User preferences are saved to local storage (`careercraft_settings`). The app automatically adjusts to the user's saved preference or falls back to the system's color scheme (dark/light mode).
