# BuddyScript - Social Feed Frontend

A modern, responsive React frontend for a social media feed application built with TypeScript and Vite. This frontend provides a beautiful user interface for creating posts, interacting with content through likes and comments, and sharing posts with others.

## 🚀 Features

### User Interface
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode Support**: Toggle between light and dark themes
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Real-time Updates**: Live comment and like counts without page refresh

### Core Functionality
- **User Authentication**: Login and registration forms
- **Feed View**: Infinite scroll through posts with pagination
- **Post Creation**: Rich composer with text and image upload
- **Interactive Posts**: Like, comment, and share functionality
- **Nested Comments**: Threaded comment system with replies
- **Single Post View**: Dedicated pages for individual posts
- **Profile Management**: User profile and settings pages

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Fast Development**: Vite for lightning-fast hot module replacement
- **API Integration**: Axios for seamless backend communication
- **Form Validation**: Client-side validation with user feedback
- **Error Handling**: Comprehensive error states and user notifications

## 🛠️ Tech Stack

- **React 19**: Latest React with modern hooks and features
- **TypeScript**: Type-safe JavaScript for better development experience
- **Vite**: Next-generation frontend tooling for fast development
- **React Router**: Client-side routing for single-page application
- **Axios**: HTTP client for API communication
- **SweetAlert2**: Beautiful modal dialogs and notifications
- **FontAwesome**: Icon library for consistent UI elements
- **TanStack Query**: Powerful data fetching and caching (optional)

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js 18+**: JavaScript runtime
- **npm**: Node package manager (comes with Node.js)
- **Backend API**: Laravel backend running (see server README)

## 🚀 Installation

### 1. Clone and Navigate
```bash
git clone <your-repository-url>
cd <project-directory>/frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Copy the example environment file:
```bash
cp .env.example .env
```

Update the `.env` file with your configuration:
```env
# API Configuration
VITE_API_BASE_URL=http://127.0.0.1:8000/api
LARAVEL_APP_BASE_URL=http://127.0.0.1:8000

# Environment Configuration
REACT_APP_ENVIRONMENT=development

# App Configuration
REACT_APP_APP_NAME=BuddyScript
REACT_APP_APP_VERSION=1.0.0
```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```
This starts the Vite development server on `http://localhost:5173`

### Build for Production
```bash
npm run build
```
Creates optimized production build in the `dist` folder

### Preview Production Build
```bash
npm run preview
```
Serves the production build locally for testing

### Code Linting
```bash
npm run lint
```
Runs ESLint to check code quality and style

## 📖 Usage

### Application Flow

1. **Authentication**
   - Visit `/login` or `/register` to authenticate
   - Protected routes redirect to login if not authenticated

2. **Main Feed**
   - Visit `/feed` to see all posts
   - Infinite scroll loads more posts automatically
   - Filter shows public posts and user's private posts

3. **Creating Posts**
   - Use the composer at the top of the feed
   - Add text content and optionally upload images
   - Choose public or private visibility

4. **Interacting with Posts**
   - **Like**: Click the heart icon on posts
   - **Comment**: Click comment button or type in the text area
   - **Reply**: Click "Reply" on any comment
   - **Share**: Click share button to use native device sharing

5. **Single Post View**
   - Click on shared links or visit `/feed/{postId}`
   - View individual posts with full comment threads

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
│   ├── assets/
│   │   ├── css/           # Stylesheets
│   │   ├── fonts/         # Font files
│   │   └── images/        # Image assets
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── feed/         # Feed-related components
│   │   │   ├── subcomponents/  # Smaller components
│   │   │   └── index.ts
│   │   └── ProtectedRoute.tsx
│   ├── contexts/          # React contexts
│   │   └── AuthContext.tsx
│   ├── pages/            # Page components
│   │   ├── Feed.tsx
│   │   ├── PostDetail.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── MyProfile.tsx
│   │   └── Settings.tsx
│   ├── services/         # API service functions
│   │   ├── authService.ts
│   │   ├── postService.ts
│   │   ├── commentService.ts
│   │   └── likeService.ts
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Application entry point
├── .env.example          # Environment variables template
├── package.json          # Dependencies and scripts
├── vite.config.ts        # Vite configuration
├── tsconfig.json         # TypeScript configuration
└── README.md
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://127.0.0.1:8000/api` |
| `LARAVEL_APP_BASE_URL` | Laravel app base URL | `http://127.0.0.1:8000` |
| `REACT_APP_ENVIRONMENT` | Environment mode | `development` |
| `REACT_APP_APP_NAME` | Application name | `BuddyScript` |
| `REACT_APP_APP_VERSION` | Application version | `1.0.0` |

### Vite Configuration

The `vite.config.ts` includes:
- React plugin for fast refresh
- Path aliases for cleaner imports
- Build optimizations for production

## 🔌 API Integration

The frontend communicates with the Laravel backend through RESTful APIs:

### Authentication
- Login/Register forms use `authService`
- JWT tokens stored in localStorage
- Automatic token refresh and logout on expiration

### Data Services
- **postService**: Post CRUD operations
- **commentService**: Comment and reply management
- **likeService**: Like/unlike functionality
- **authService**: Authentication operations

## 🎨 Styling

- **Bootstrap**: Utility classes for responsive design
- **Custom CSS**: Component-specific styles in `public/assets/css/`
- **Inline Styles**: Component-level styling with React
- **CSS Modules**: Scoped styling for complex components

## 🧪 Testing

### Running Tests
```bash
npm test
```

### Code Quality
```bash
# Lint code
npm run lint

# Type checking
npx tsc --noEmit
```

## 🚀 Deployment

### Build Process
```bash
# Build for production
npm run build

# The dist/ folder contains the production build
```

### Environment Setup
- Set `REACT_APP_ENVIRONMENT=production` in production
- Configure `VITE_API_BASE_URL` to point to your production API
- Ensure CORS is properly configured on the backend

### Web Server Configuration
Serve the `dist` folder with any static web server (nginx, Apache, etc.)

## 🐛 Troubleshooting

### Common Issues

**API Connection Errors:**
- Verify `VITE_API_BASE_URL` matches your backend URL
- Check that the Laravel backend is running
- Ensure CORS is configured properly

**Authentication Issues:**
- Clear localStorage and try logging in again
- Check that JWT tokens aren't expired
- Verify backend Sanctum configuration

**Build Errors:**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npx tsc --noEmit`
- Verify all dependencies are installed

**Styling Issues:**
- Check that CSS files are being imported correctly
- Verify Bootstrap classes are available
- Check for CSS conflicts

## 🤝 Contributing

1. Follow the existing code style and TypeScript conventions
2. Use meaningful commit messages
3. Test your changes thoroughly
4. Update documentation as needed

## 📄 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 📞 Support

For issues and questions:
1. Check this README and troubleshooting section
2. Review the backend README for API documentation
3. Open an issue on the project repository

---

Built with ❤️ using React, TypeScript, and Vite
