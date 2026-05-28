# CloudCart: Modern SaaS E-commerce Platform

CloudCart is a premium full-stack DevOps-themed e-commerce web application with a modern SaaS dashboard UI inspired by Vercel, Grafana, Stripe, and Linear.

## Architecture

* **Frontend**: React, Redux Toolkit, Tailwind CSS v4, Framer Motion, Recharts
* **Backend**: Node.js, Express.js, MongoDB
* **DevOps**: Docker, Docker Compose, Jenkins, Nginx
* **Monitoring**: Prometheus, Grafana

## Features

### User Features
- Modern Landing Page with DevOps workflow visualization
- Animated, responsive glassmorphism UI
- User authentication
- Product catalog with search and filters
- Cart and checkout flow

### Admin & DevOps Dashboard
- Analytics with real-time charts
- Order management
- Product inventory management
- CI/CD Deployment tracking interface
- System monitoring interface (CPU, RAM, Containers)

## Getting Started

### Local Development (Frontend Only - with Mock Data)

```bash
cd frontend
npm install
npm run dev
```
Access the app at `http://localhost:3000`

### Full Stack with Docker (Production Mode)

```bash
docker-compose up --build -d
```
- App: `http://localhost:80`
- API: `http://localhost:5000`
- Grafana: `http://localhost:3000` (User: admin / Pass: admin)
- Prometheus: `http://localhost:9090`

## Project Structure

```
cloudcart/
├── frontend/          # React + Vite application
│   ├── src/           # Source code (components, pages, store)
│   └── index.html     # HTML entry
├── backend/           # Node.js + Express API
│   ├── src/           # Controllers, Models, Routes
│   └── index.js       # API entry
├── docker/            # Dockerfiles for frontend and backend
├── monitoring/        # Prometheus & Grafana configs
├── jenkins/           # Jenkinsfile for CI/CD
├── nginx/             # Nginx reverse proxy configs
└── docker-compose.yml # Container orchestration
```
