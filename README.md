# BuddyScript - Social Feed Application

A full-stack social media feed application built with Laravel (backend) and React (frontend) that allows users to create posts, interact with content through likes and comments, and share posts with others.

## Architecture Overview

This application consists of two main components:

### Backend (Laravel API)
- **Location**: `server/` directory
- **Technology**: Laravel 12 with PHP 8.2+
- **Database**: SQLite (configurable to MySQL/PostgreSQL)
- **Authentication**: Laravel Sanctum (API tokens)
- **Features**: RESTful API, user management, posts, comments, likes

### Frontend (React SPA)
- **Location**: `frontend/` directory
- **Technology**: React 19 with TypeScript
- **Build Tool**: Vite for fast development
- **Styling**: Bootstrap + Custom CSS
- **Features**: Responsive UI, real-time interactions, modern UX

## Quick Start

### Prerequisites
- **PHP 8.2+** with Composer
- **Node.js 18+** with npm
- **SQLite** (or your preferred database)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd <project-directory>
   ```

2. **Backend Setup**
   ```bash
   cd server
   composer install
   cp .env.example .env
   php artisan key:generate
   php artisan migrate
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   cp .env.example .env
   ```

4. **Run Both Applications**
   ```bash
   # Terminal 1 - Backend
   cd server
   php artisan serve

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

5. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:8000`

## Features

### Core Functionality
- **User Authentication**: Secure login/registration
- **Post Creation**: Text posts with image uploads
- **Privacy Controls**: Public and private post visibility
- **Interactive Feed**: Infinite scroll with pagination
- **Real-time Likes**: Instant like/unlike with optimistic UI
- **Nested Comments**: Threaded comment system with replies
- **Post Sharing**: Native device sharing with clipboard fallback
- **Single Post View**: Dedicated pages for individual posts
- **Responsive Design**: Works on all device sizes
- **Dark Mode**: Theme switching capability

### Technical Features
- **Secure API**: JWT authentication with Laravel Sanctum
- **Progressive Web App**: Modern SPA architecture
- **Modern UI**: Clean, intuitive interface
- **Fast Development**: Hot reload and optimized builds
- **Type Safety**: Full TypeScript coverage
- **Real-time Updates**: Live comment and like counts
- **SEO Friendly**: Server-side rendering ready

## Project Structure

```
├── server/                 # Laravel Backend
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   ├── Models/
│   │   ├── Services/
│   │   └── Policies/
│   ├── database/migrations/
│   ├── routes/api.php
│   └── README.md          # Backend documentation
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── contexts/
│   ├── public/
│   └── README.md          # Frontend documentation
├── .gitignore
└── README.md              # This file
```

## Technology Stack

### Backend
- **Framework**: Laravel 12
- **Language**: PHP 8.2+
- **Database**: SQLite/MySQL/PostgreSQL
- **Authentication**: Laravel Sanctum
- **API**: RESTful with JSON responses
- **Validation**: Laravel Request classes
- **File Storage**: Local filesystem

### Frontend
- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: Bootstrap + Custom CSS
- **State Management**: React Context + Hooks
- **Icons**: FontAwesome

## API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User authentication
- `POST /api/logout` - User logout

### Posts
- `GET /api/posts` - Get feed posts (paginated)
- `POST /api/posts` - Create new post
- `GET /api/posts/{id}` - Get single post
- `PUT /api/posts/{id}` - Update post
- `DELETE /api/posts/{id}` - Delete post
- `GET /api/posts/user/{userId}` - Get user's posts

### Comments
- `GET /api/posts/{postId}/comments` - Get post comments
- `POST /api/posts/{postId}/comments` - Create comment
- `PUT /api/comments/{id}` - Update comment
- `DELETE /api/comments/{id}` - Delete comment thread

### Likes
- `POST /api/likes` - Toggle like on post/comment
- `GET /api/likes/{type}/{id}` - Get likes

## Development

### Running in Development
```bash
# Both frontend and backend with hot reload
cd server && composer run dev
```

### Building for Production
```bash
# Backend
cd server && php artisan config:cache

# Frontend
cd frontend && npm run build
```

### Testing
```bash
# Backend tests
cd server && composer run test

# Frontend linting
cd frontend && npm run lint
```

## Database Schema

### Core Tables
- **users**: User accounts and authentication
- **posts**: User posts with content and metadata
- **comments**: Comments and replies (nested structure)
- **likes**: User likes on posts and comments

### Relationships
- User ↔ Posts (One-to-Many)
- Post ↔ Comments (One-to-Many, nested)
- User ↔ Comments (One-to-Many)
- User ↔ Likes (One-to-Many)
- Post/Comment ↔ Likes (One-to-Many)

## Security Features

- **CSRF Protection**: Laravel's built-in CSRF protection
- **SQL Injection Prevention**: Eloquent ORM with prepared statements
- **XSS Protection**: React's automatic escaping + input sanitization
- **Authentication**: Secure JWT tokens with expiration
- **Authorization**: Policy-based access control
- **File Upload Security**: Type validation and size limits

## Responsive Design

The application is fully responsive and works on:
- **Mobile phones** (320px+)
- **Tablets** (768px+)
- **Desktops** (1024px+)
- **Large screens** (1440px+)

## Key Highlights

### Performance
- **Fast Loading**: Optimized bundles and lazy loading
- **Real-time Updates**: Instant UI feedback
- **Efficient Bundling**: Tree-shaking and code splitting

### User Experience
- **Modern Design**: Clean, intuitive interface
- **Accessibility**: ARIA labels and keyboard navigation
- **Dark Mode**: Eye-friendly theme switching
- **Notifications**: User feedback for all actions

### Developer Experience
-  **Hot Reload**: Instant development feedback
-  **Type Safety**: Full TypeScript coverage
-  **Testing Ready**: Test frameworks configured
- **Well Documented**: Comprehensive documentation

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Documentation

- **[Backend README](server/README.md)**: Detailed Laravel API documentation
- **[Frontend README](frontend/README.md)**: React application guide
- **API Documentation**: Inline code documentation

## Troubleshooting

### Common Issues

**"API not found" errors:**
- Ensure backend is running on port 8000
- Check `VITE_API_BASE_URL` in frontend `.env`

**Database connection issues:**
- Verify `.env` database configuration
- Run `php artisan migrate` to set up tables

**Build failures:**
- Clear caches: `composer clear-cache && npm cache clean`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## Support

For issues and questions:
1. Check the relevant README files
2. Review troubleshooting sections
3. Open an issue on the project repository

## Requirements Summary

| Component | Version | Purpose |
|-----------|---------|---------|
| PHP | 8.2+ | Backend runtime |
| Laravel | 12.x | Backend framework |
| Node.js | 18+ | Frontend runtime |
| React | 19.x | Frontend framework |
| TypeScript | 5.x | Type safety |
| Vite | 7.x | Build tool |
| SQLite | 3.x | Database (default) |

## Roadmap

- [ ] Push notifications
- [ ] Advanced search and filtering
- [ ] User profiles and following system
- [ ] Media gallery and advanced uploads
- [ ] Real-time chat system
- [ ] Admin dashboard
- [ ] Analytics and insights

---

## Getting Started Checklist

- [ ] Clone repository
- [ ] Install backend dependencies (`composer install`)
- [ ] Install frontend dependencies (`npm install`)
- [ ] Configure environment files (`.env`)
- [ ] Set up database (`php artisan migrate`)
- [ ] Generate app key (`php artisan key:generate`)
- [ ] Start backend server (`php artisan serve`)
- [ ] Start frontend dev server (`npm run dev`)
- [ ] Visit `http://localhost:5173` and create account

---

**Built with ❤️ using Laravel & React**

*Empowering social connections through modern web technology*