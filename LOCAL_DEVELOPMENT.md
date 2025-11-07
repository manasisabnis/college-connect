# College Connect - Local Development Guide

## Quick Start

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Set Up MongoDB Locally
Follow the instructions in `SETUP_LOCAL_MONGODB.md`

Verify MongoDB is running:
\`\`\`bash
mongosh
# Should connect successfully
\`\`\`

### 3. Configure Environment Variables
Create `.env.local` with:
\`\`\`
MONGODB_URI=mongodb://localhost:27017/college-connect
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
NEXT_PUBLIC_API_URL=http://localhost:3000/api
\`\`\`

### 4. Seed Database
\`\`\`bash
npm run seed:dev
\`\`\`

### 5. Start Development Server
\`\`\`bash
npm run dev
\`\`\`

Open http://localhost:3000 in your browser.

## Login Credentials

After seeding:
- **User 1:** john@college.com / Password123
- **User 2:** jane@college.com / Password123

## Project Structure

\`\`\`
college-connect/
├── app/
│   ├── api/                 # REST API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── users/          # User management
│   │   ├── events/         # Events CRUD
│   │   ├── clubs/          # Clubs management
│   │   ├── talks/          # Guest talks
│   │   └── news/           # News articles
│   ├── dashboard/          # Main dashboard page
│   ├── clubs/              # Clubs directory page
│   ├── events/             # Events page
│   ├── guest-talks/        # Guest talks page
│   ├── news/               # News page
│   ├── page.tsx            # Login page
│   └── layout.tsx          # Root layout
├── lib/
│   ├── mongodb.ts          # MongoDB connection
│   ├── auth.ts             # NextAuth configuration
│   ├── api-client.ts       # API utility functions
│   ├── models/             # Database schemas
│   └── utils/              # Helper functions
├── components/             # React components
├── scripts/
│   └── seed-database.ts    # Database seeding script
└── .env.local              # Local environment variables
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/[...nextauth]` - NextAuth handlers
- `POST /api/auth/reset-password` - Password reset

### Users
- `GET /api/users/[id]` - Get user profile
- `PUT /api/users/[id]` - Update profile
- `GET /api/users/[id]/clubs` - Get joined clubs
- `GET /api/users/[id]/events` - Get registered events

### Events
- `GET /api/events` - List all events
- `POST /api/events` - Create event
- `GET /api/events/[id]` - Get event details
- `POST /api/events/[id]/register` - Register for event

### Clubs
- `GET /api/clubs` - List all clubs
- `POST /api/clubs` - Create club
- `POST /api/clubs/[id]/join` - Join club
- `DELETE /api/clubs/[id]/join` - Leave club

### Guest Talks
- `GET /api/talks` - List all talks
- `POST /api/talks/[id]/register` - Register for talk

### News
- `GET /api/news` - Get news articles
- `GET /api/news?category=national` - Filter by category

## Testing the APIs

### Using curl
\`\`\`bash
# Login
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"john@college.com","password":"Password123"}'

# Get all events
curl http://localhost:3000/api/events

# Get all clubs
curl http://localhost:3000/api/clubs
\`\`\`

### Using MongoDB Shell
\`\`\`bash
mongosh
use college-connect
show collections
db.users.find()
db.events.find()
db.clubs.find()
\`\`\`

## Common Issues

### MongoDB Connection Error
- Ensure MongoDB is running: `mongosh`
- Check MONGODB_URI in .env.local
- Verify port 27017 is not blocked

### NextAuth Error
- Regenerate NEXTAUTH_SECRET: `openssl rand -base64 32`
- Ensure NEXTAUTH_URL matches your domain

### Port 3000 Already in Use
\`\`\`bash
# Find process using port 3000
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Kill the process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
\`\`\`

## Debugging

### Enable Debug Logs
Set environment variable:
\`\`\`bash
DEBUG=* npm run dev
\`\`\`

### MongoDB Debugging
In MongoDB shell:
\`\`\`bash
use college-connect
db.getCollectionNames()
db.users.find().pretty()
db.events.countDocuments()
\`\`\`

## Next Steps

1. Start development with `npm run dev`
2. Test login with seeded credentials
3. Explore API endpoints
4. Modify seed data in `scripts/seed-database.ts`
5. Build features and test locally

## Production Deployment

When ready to deploy:
1. Set up MongoDB Atlas (free tier available)
2. Update MONGODB_URI to Atlas connection string
3. Generate new NEXTAUTH_SECRET
4. Deploy to Vercel, Railway, or other hosting
