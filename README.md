# URL Shortener

A full-stack URL Shortener web application that converts long URLs into short URLs.

## Features

- User Registration
- User Login
- JWT Authentication
- Password Hashing using bcryptjs
- Create Short URLs
- Redirect to Original URL
- Click Tracking
- MySQL Database Integration

## Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js

### Database
- MySQL

### Other Technologies
- REST APIs
- JWT Authentication
- bcryptjs

## Project Structure

url-shortener/
│
├── frontend/
├── backend/
└── README.md

## Installation

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend

Open:
```bash
frontend/index.html
```

## API Endpoints

### Authentication

- POST /api/auth/register
- POST /api/auth/login

### URL

- POST /api/url/shorten
- GET /:shortCode

## Author

Himanshu Singh Khatri