# Local MongoDB Setup for College Connect

This guide will help you set up MongoDB locally for development.

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

## Option 1: MongoDB Community Edition (Recommended)

### Windows
1. Download MongoDB Community Server from [mongodb.com/try/download/community](https://mongodb.com/try/download/community)
2. Run the installer and follow the setup wizard
3. MongoDB will start as a Windows Service automatically
4. MongoDB runs on `mongodb://localhost:27017` by default

### macOS
\`\`\`bash
# Using Homebrew (recommended)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
\`\`\`

### Linux (Ubuntu/Debian)
\`\`\`bash
# Import GPG key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
\`\`\`

## Option 2: Docker (Easiest)

If you have Docker installed:

\`\`\`bash
# Pull and run MongoDB in a container
docker run -d -p 27017:27017 --name college-connect-mongo mongo:latest

# To stop: docker stop college-connect-mongo
# To start: docker start college-connect-mongo
\`\`\`

## Verify MongoDB is Running

\`\`\`bash
# Connect to MongoDB shell
mongosh

# Check connection
show databases
\`\`\`

You should see output confirming the connection.

## Setup College Connect Database

1. Copy `.env.local.example` to `.env.local` (already configured for local MongoDB)

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Seed the database with sample data:
\`\`\`bash
npm run seed:dev
\`\`\`

This will:
- Create the college-connect database
- Populate collections: users, events, clubs, talks, news
- Insert sample data for testing

## Default Test Credentials

After seeding, you can login with:
- **Email:** john@college.com
- **Password:** Password123

OR

- **Email:** jane@college.com
- **Password:** Password123

## Running the Application

\`\`\`bash
# Development server
npm run dev

# Open http://localhost:3000 in your browser
\`\`\`

## Database Management

### View Collections
\`\`\`bash
mongosh
use college-connect
show collections
db.users.find()  # View all users
db.events.find() # View all events
\`\`\`

### Reset Database
\`\`\`bash
npm run seed:dev
# This will clear and repopulate all collections
\`\`\`

### Troubleshooting

**Port 27017 already in use:**
\`\`\`bash
# Find process using port 27017
lsof -i :27017  # macOS/Linux
netstat -ano | findstr :27017  # Windows

# Kill the process or use a different port
\`\`\`

**MongoDB connection refused:**
- Ensure MongoDB service is running
- Check MONGODB_URI in .env.local is correct
- Try: `mongosh` to test connection directly

## Next Steps

1. Update `.env.local` with your own NEXTAUTH_SECRET (use `openssl rand -base64 32`)
2. Customize seed data in `scripts/seed-database.ts`
3. Start developing!
