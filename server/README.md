# Social Feed Application

A modern social media feed application built with Laravel (backend) and React (frontend) that allows users to create posts, interact with content through likes and comments, and share posts with others.

## Features

### Core Functionality
- **User Authentication**: Secure login and registration system
- **Post Creation**: Create text posts with optional images
- **Privacy Controls**: Public and private post visibility
- **Interactive Feed**: Scroll through posts with infinite pagination
- **Real-time Interactions**: Like posts and comments instantly
- **Nested Comments**: Reply to comments with threaded discussions
- **Post Sharing**: Share posts via native device sharing or clipboard
- **Single Post View**: Dedicated pages for individual posts

### User Experience
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Dark Mode**: Toggle between light and dark themes
- **Real-time Updates**: Live comment and like counts
- **Intuitive UI**: Clean, modern interface with smooth interactions

## Tech Stack

### Backend
- **Laravel 12**: PHP web framework
- **Laravel Sanctum**: API authentication
- **SQLite**: Database (configurable)
- **RESTful API**: Well-structured API endpoints

### Frontend
- **React 19**: Modern JavaScript library
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool and dev server
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **SweetAlert2**: Beautiful modal dialogs

## Prerequisites

Before you begin, ensure you have the following installed:

- **PHP 8.2 or higher**
- **Composer** (PHP dependency manager)
- **Node.js 18+ and npm**
- **SQLite** (or your preferred database)

## Installation

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd <project-directory>
```

### 2. Backend Setup (Laravel)

Navigate to the server directory:
```bash
cd server
```

Install PHP dependencies:
```bash
composer install
```

Copy environment file:
```bash
cp .env.example .env
```

Generate application key:
```bash
php artisan key:generate
```

Set up the database:
```bash
# For SQLite (default)
touch database/database.sqlite

# Or configure your preferred database in .env
```

Run database migrations:
```bash
php artisan migrate
```

### 3. Frontend Setup (React)

Navigate to the frontend directory:
```bash
cd ../frontend
```

Install Node.js dependencies:
```bash
npm install
```

### 4. Environment Configuration

Update your `.env` file in the server directory:

```env
APP_NAME="Social Feed"
APP_ENV=local
APP_KEY=base64:your-generated-key
APP_DEBUG=true
APP_URL=http://localhost:8000

# Database (SQLite is default)
DB_CONNECTION=sqlite
DB_DATABASE=database/database.sqlite

# Or for MySQL/PostgreSQL
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

Update frontend environment (if needed):
```bash
# Create .env file in frontend directory
VITE_API_BASE_URL=http://localhost:8000/api
```

## 🏃‍♂️ Running the Application

### Development Mode (Recommended)

Use the built-in development script that runs both backend and frontend:

```bash
cd server
composer run dev
```

This will start:
- Laravel server on `http://localhost:8000`
- Vite dev server on `http://localhost:5173`
- Queue worker for background jobs
- Log monitoring

### Manual Setup

If you prefer to run services separately:

**Backend:**
```bash
cd server
php artisan serve
```

**Frontend:**
```bash
cd frontend
npm run dev
```

**Queue Worker (for background jobs):**
```bash
cd server
php artisan queue:work
```

## Usage

### User Registration & Login
1. Visit the application in your browser
2. Click "Register" to create a new account
3. Or "Login" if you already have an account

### Creating Posts
1. Go to the Feed page
2. Use the composer at the top to create a new post
3. Add text content and optionally upload an image
4. Choose visibility (Public/Private)
5. Click "Post" to share

### Interacting with Content
- **Like**: Click the heart icon on posts or comments
- **Comment**: Click the comment button or type in the comment field
- **Reply**: Click "Reply" on any comment to respond
- **Share**: Click the share button to share posts via native sharing

### Viewing Individual Posts
- Click on shared post links or navigate to `/feed/{postId}`
- View the full post with all comments and interactions

## 🔌 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/logout` - User logout

### Posts
- `GET /api/posts` - Get paginated posts feed
- `POST /api/posts` - Create new post
- `GET /api/posts/{id}` - Get single post
- `PUT /api/posts/{id}` - Update post
- `DELETE /api/posts/{id}` - Delete post
- `GET /api/posts/user/{userId}` - Get user's posts

### Comments
- `GET /api/posts/{postId}/comments` - Get post comments
- `POST /api/posts/{postId}/comments` - Create comment
- `PUT /api/comments/{id}` - Update comment
- `DELETE /api/comments/{id}` - Delete comment

### Likes
- `POST /api/likes` - Toggle like on post/comment
- `GET /api/likes/{type}/{id}` - Get likes for post/comment

## Testing

Run the test suite:
```bash
cd server
composer run test
```

## Project Structure

```
├── server/                 # Laravel backend
│   ├── app/
│   │   ├── Http/Controllers/Api/
│   │   ├── Models/
│   │   ├── Services/
│   │   └── Policies/
│   ├── database/migrations/
│   ├── routes/api.php
│   └── composer.json

```

## Development

### Code Style
- **Backend**: Follow Laravel conventions and PSR standards
- **Frontend**: Use ESLint and TypeScript for code quality

### Database
The application uses the following main tables:
- `users` - User accounts
- `posts` - User posts with content and images
- `comments` - Comments and replies on posts
- `likes` - User likes on posts and comments

### Adding New Features
1. Backend changes: Add routes, controllers, and services
2. Frontend changes: Create components and update services
3. Database changes: Create migrations for schema updates

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues:
1. Check the troubleshooting section below
2. Open an issue on GitHub
3. Check the Laravel and React documentation

## Troubleshooting

### Common Issues

**Database connection errors:**
- Ensure your `.env` file has correct database credentials
- Run `php artisan migrate` to set up tables

**Frontend not loading:**
- Check that the Vite dev server is running
- Verify `VITE_API_BASE_URL` in frontend `.env`

**API authentication issues:**
- Ensure Laravel Sanctum is properly configured
- Check that cookies are enabled in your browser

**Image upload not working:**
- Verify file permissions on the `storage` directory
- Check that the `public/storage` symlink exists

---

Built with ❤️ using Laravel and React
