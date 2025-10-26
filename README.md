# Chatz - Real-time Chat Application

A real-time chat application built with Ruby on Rails and React, featuring WebSocket communication via Action Cable.

## Tech Stack

**Backend:**
- Ruby on Rails 8.1
- PostgreSQL
- Action Cable (WebSocket)
- Solid Cache, Solid Queue, Solid Cable

**Frontend:**
- React 19.2
- React Router DOM
- Material-UI (MUI)
- Vite

## Features

- Real-time messaging using WebSocket (Action Cable)
- One-on-one chatrooms
- User management
- RESTful API
- Responsive Material-UI interface

## Prerequisites

- Ruby 3.x
- Node.js 18+ and npm/yarn
- PostgreSQL
- Docker & Docker Compose (for deployment)

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd chatz
```

### 2. Install dependencies

```bash
# Install Ruby gems
bundle install

# Install JavaScript packages
npm install
```

### 3. Database setup

```bash
# Create and setup database
bin/rails db:create
bin/rails db:migrate
bin/rails db:seed
```

### 4. Run the application

Development mode with hot-reloading:

```bash
bin/rails s
```

```bash
bin/vite dev
```

This starts both Rails server and Vite dev server.

The application will be available at `http://localhost:3000`

## Database Schema

**Users**
- username (unique)
- fullname

**Chatrooms**
- userone_id (User)
- usertwo_id (User)

**Messages**
- user_id (User)
- chatroom_id (Chatroom)
- content
- created_at

## API Endpoints

```
GET  /api/v1/users           # List all users
POST /api/v1/users           # Create a new user
DELETE /api/v1/users/:username # Delete a user

GET  /api/v1/chatrooms       # List all chatrooms

GET  /api/v1/messages        # List messages
POST /api/v1/messages        # Create a new message
```

## WebSocket

Action Cable is mounted at `/cable` for real-time message delivery.

## Deployment

The project includes Docker configuration for production deployment:

```bash
docker-compose up -d
```

Environment variables required:
- `CHATZ_DATABASE_USER`
- `CHATZ_DATABASE_PASSWORD`
- `DB_PATH`
- `PORT`

## Development

Run tests:
```bash
bin/rails test
```

Code quality checks:
```bash
bin/rubocop
bin/brakeman
bin/bundler-audit
```

## Project Structure

```
app/
├── channels/         # Action Cable channels
├── controllers/      # Rails controllers (API)
├── javascript/       # React frontend
│   ├── components/  # React components
│   ├── pages/       # Page components
│   └── entrypoints/ # Vite entry points
├── models/          # Rails models
├── serializers/     # JSON serializers
└── views/           # Rails views
```
