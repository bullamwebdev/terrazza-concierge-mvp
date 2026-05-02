# Terrazza di Sole - Luxury Concierge MVP

A stunning cinematic landing page and full-stack MVP for a luxury property concierge service on the Amalfi Coast. Features project timeline visualization, stakeholder management, booking system, and admin dashboard.

## Features

- **Cinematic Landing Page** - Full-bleed hero video with Mediterranean aesthetics
- **Project Timeline** - Visual progress tracking for agentic workflow pipeline
- **Intervenants/Stakeholders** - Complete ecosystem visualization for concierge operations
- **Property Listings** - Cliffside suites and luxury villas
- **User Authentication** - Registration, login, profile management
- **Booking System** - Reservation requests with admin approval workflow
- **Admin Dashboard** - Full property, booking, and user management
- **Contact System** - Message handling with email notification placeholders

## Tech Stack

- **Backend**: Node.js + Express
- **Database**: SQLite (easy setup, portable)
- **Auth**: JWT tokens with bcrypt hashing
- **Frontend**: Vanilla JS with CSS custom properties
- **Typography**: Playfair Display + Source Sans 3
- **Color Palette**: Mediterranean-inspired (deep blue, lemon gold, terracotta)

## Quick Start

### 1. Install Dependencies

```bash
cd concierge-mvp
npm install
```

### 2. Initialize Database

```bash
npm run init-db
```

This creates the SQLite database with demo data:
- Admin user: `admin@terrazza.com` / `admin123`
- 3 luxury properties
- 16 stakeholder/intervenant profiles
- 8 project timeline phases

### 3. Configure Environment

```bash
cp .env.example .env
# Edit .env with your settings
```

### 4. Start Server

```bash
npm start
# or for development:
npm run dev
```

Visit `http://localhost:3000`

## Project Structure

```
concierge-mvp/
├── server/
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth middleware
│   └── database/        # SQLite database
├── public/
│   ├── css/            # Main stylesheet
│   ├── js/             # Frontend JavaScript
│   ├── images/         # Static images
│   ├── index.html      # Main landing page
│   ├── login.html      # Login page
│   ├── register.html   # Registration page
│   └── admin.html      # Admin dashboard
├── scripts/
│   └── init-db.js      # Database initialization
├── server.js           # Express server
├── package.json
└── README.md
```

## API Endpoints

### Public
- `GET /api/properties` - List all properties
- `GET /api/properties/:slug` - Get property by slug
- `POST /api/contact` - Submit contact form

### Auth
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### User (requires auth)
- `GET /api/users/profile` - Get profile
- `PATCH /api/users/profile` - Update profile
- `GET /api/users/favorites` - Get favorites
- `POST /api/users/favorites/:id` - Add favorite
- `DELETE /api/users/favorites/:id` - Remove favorite

### Bookings (requires auth)
- `POST /api/bookings` - Create booking
- `GET /api/bookings/my-bookings` - Get user's bookings
- `PATCH /api/bookings/:id/cancel` - Cancel booking

### Admin (requires admin role)
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/bookings` - All bookings
- `GET /api/admin/users` - All users
- `GET /api/admin/contacts` - All messages
- `PATCH /api/admin/bookings/:id/status` - Update booking status

## Deployment

### Option 1: GitHub Pages (Static Demo)

The `public/` folder can be deployed to GitHub Pages for a static demo. API calls will fail but the UI will be visible.

### Option 2: Full Stack (Recommended)

Deploy to any Node.js hosting:
- **Railway** - `railway up`
- **Render** - Connect GitHub repo
- **Fly.io** - `fly launch`
- **Heroku** - `heroku create && git push heroku main`

### Environment Variables

```env
PORT=3000
JWT_SECRET=your-super-secret-key-change-this
NODE_ENV=production
```

## Customization

### Brand Colors

Edit `public/css/main.css`:

```css
:root {
  --blue-deep: #1A4B7A;      /* Mediterranean deep blue */
  --gold-lemon: #E8A435;     /* Lemon gold */
  --terracotta: #C75B39;     /* Terracotta orange */
  --linen: #FAF3E0;          /* Sun-bleached linen */
  --green-leaf: #5A8F6E;     /* Lemon leaf green */
}
```

### Stakeholders

Edit `scripts/init-db.js` to customize the intervenants for your client's specific ecosystem.

### Timeline

Update the project phases in `scripts/init-db.js` to match your actual project plan.

## Demo Credentials

- **Admin**: admin@terrazza.com / admin123
- Register new users via `/register`

## License

MIT

---

Built with ❤️ for exceptional luxury experiences.