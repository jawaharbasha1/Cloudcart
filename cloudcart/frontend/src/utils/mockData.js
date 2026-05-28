// Mock data for the entire application
export const mockProducts = [
  { _id: '1', name: 'Cloud Server Pro', description: 'High-performance cloud server with 16 vCPUs, 64GB RAM, and 500GB NVMe SSD', price: 299.99, category: 'Servers', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400', rating: 4.8, reviews: 234, stock: 50, tags: ['compute', 'high-performance'] },
  { _id: '2', name: 'Kubernetes Cluster', description: 'Managed Kubernetes cluster with auto-scaling, monitoring, and 99.99% SLA', price: 499.99, category: 'Containers', image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400', rating: 4.9, reviews: 189, stock: 30, tags: ['kubernetes', 'orchestration'] },
  { _id: '3', name: 'CI/CD Pipeline', description: 'Automated CI/CD pipeline with Jenkins integration, artifact storage, and deployment automation', price: 149.99, category: 'DevOps', image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400', rating: 4.7, reviews: 312, stock: 100, tags: ['automation', 'deployment'] },
  { _id: '4', name: 'Database Cluster', description: 'MongoDB Atlas-compatible database cluster with automated backups and replication', price: 199.99, category: 'Databases', image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400', rating: 4.6, reviews: 156, stock: 75, tags: ['database', 'nosql'] },
  { _id: '5', name: 'Load Balancer', description: 'Global load balancer with SSL termination, DDoS protection, and health checks', price: 89.99, category: 'Networking', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400', rating: 4.5, reviews: 98, stock: 200, tags: ['networking', 'security'] },
  { _id: '6', name: 'Monitoring Suite', description: 'Prometheus + Grafana monitoring with custom dashboards, alerting, and log aggregation', price: 179.99, category: 'Monitoring', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400', rating: 4.8, reviews: 267, stock: 150, tags: ['monitoring', 'observability'] },
  { _id: '7', name: 'Docker Registry', description: 'Private Docker registry with vulnerability scanning and image lifecycle management', price: 59.99, category: 'Containers', image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400', rating: 4.4, reviews: 143, stock: 500, tags: ['docker', 'registry'] },
  { _id: '8', name: 'SSL Certificate', description: 'Wildcard SSL certificate with automatic renewal and multi-domain support', price: 29.99, category: 'Security', image: 'https://images.unsplash.com/photo-1563986768609-322da13575f2?w=400', rating: 4.3, reviews: 89, stock: 1000, tags: ['security', 'ssl'] },
  { _id: '9', name: 'CDN Premium', description: 'Global CDN with 200+ edge locations, real-time analytics, and instant purge', price: 129.99, category: 'Networking', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400', rating: 4.7, reviews: 201, stock: 300, tags: ['cdn', 'performance'] },
  { _id: '10', name: 'API Gateway', description: 'Managed API gateway with rate limiting, authentication, and request transformation', price: 99.99, category: 'Networking', image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400', rating: 4.6, reviews: 178, stock: 250, tags: ['api', 'gateway'] },
  { _id: '11', name: 'Serverless Functions', description: 'Event-driven serverless compute with auto-scaling and pay-per-execution billing', price: 39.99, category: 'Compute', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400', rating: 4.5, reviews: 134, stock: 999, tags: ['serverless', 'functions'] },
  { _id: '12', name: 'Terraform Module Pack', description: 'Infrastructure as Code module pack with 50+ pre-built Terraform modules', price: 249.99, category: 'DevOps', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400', rating: 4.9, reviews: 89, stock: 100, tags: ['iac', 'terraform'] },
];

export const mockOrders = [
  { _id: 'ORD-001', user: 'John Doe', email: 'john@example.com', items: [mockProducts[0], mockProducts[2]], total: 449.98, status: 'Delivered', date: '2026-05-25', paymentMethod: 'Credit Card' },
  { _id: 'ORD-002', user: 'Jane Smith', email: 'jane@example.com', items: [mockProducts[1]], total: 499.99, status: 'Processing', date: '2026-05-26', paymentMethod: 'PayPal' },
  { _id: 'ORD-003', user: 'Bob Wilson', email: 'bob@example.com', items: [mockProducts[3], mockProducts[4], mockProducts[7]], total: 319.97, status: 'Shipped', date: '2026-05-26', paymentMethod: 'Credit Card' },
  { _id: 'ORD-004', user: 'Alice Brown', email: 'alice@example.com', items: [mockProducts[5]], total: 179.99, status: 'Pending', date: '2026-05-27', paymentMethod: 'Stripe' },
  { _id: 'ORD-005', user: 'Charlie Davis', email: 'charlie@example.com', items: [mockProducts[8], mockProducts[9]], total: 229.98, status: 'Delivered', date: '2026-05-24', paymentMethod: 'Credit Card' },
];

export const mockUsers = [
  { _id: 'USR-001', name: 'John Doe', email: 'john@example.com', role: 'user', status: 'Active', orders: 12, spent: 2499.88, joined: '2026-01-15' },
  { _id: 'USR-002', name: 'Jane Smith', email: 'jane@example.com', role: 'admin', status: 'Active', orders: 8, spent: 1899.92, joined: '2026-02-01' },
  { _id: 'USR-003', name: 'Bob Wilson', email: 'bob@example.com', role: 'user', status: 'Active', orders: 5, spent: 799.95, joined: '2026-03-10' },
  { _id: 'USR-004', name: 'Alice Brown', email: 'alice@example.com', role: 'user', status: 'Inactive', orders: 3, spent: 449.97, joined: '2026-04-20' },
  { _id: 'USR-005', name: 'Charlie Davis', email: 'charlie@example.com', role: 'user', status: 'Active', orders: 15, spent: 3299.85, joined: '2025-12-05' },
];

export const mockAnalytics = {
  revenue: { value: 48295, change: 12.5, data: [
    { name: 'Jan', value: 4200 }, { name: 'Feb', value: 5100 }, { name: 'Mar', value: 4800 },
    { name: 'Apr', value: 6200 }, { name: 'May', value: 7100 }, { name: 'Jun', value: 8400 },
    { name: 'Jul', value: 7800 }, { name: 'Aug', value: 9200 }, { name: 'Sep', value: 8900 },
    { name: 'Oct', value: 10100 }, { name: 'Nov', value: 11200 }, { name: 'Dec', value: 12500 },
  ]},
  orders: { value: 1247, change: 8.3 },
  users: { value: 3892, change: 15.2 },
  deployments: { value: 156, change: 22.1 },
};

export const mockSalesData = [
  { name: 'Mon', sales: 4200, revenue: 12400, orders: 42 },
  { name: 'Tue', sales: 3800, revenue: 11200, orders: 38 },
  { name: 'Wed', sales: 5100, revenue: 15300, orders: 51 },
  { name: 'Thu', sales: 4600, revenue: 13800, orders: 46 },
  { name: 'Fri', sales: 6200, revenue: 18600, orders: 62 },
  { name: 'Sat', sales: 5800, revenue: 17400, orders: 58 },
  { name: 'Sun', sales: 4400, revenue: 13200, orders: 44 },
];

export const mockDeployments = [
  { id: 'DEP-001', service: 'frontend-app', environment: 'Production', status: 'Success', version: 'v2.4.1', duration: '2m 34s', timestamp: '2026-05-27 09:15:00', commit: 'a1b2c3d', author: 'John Doe' },
  { id: 'DEP-002', service: 'api-gateway', environment: 'Production', status: 'Success', version: 'v1.8.3', duration: '3m 12s', timestamp: '2026-05-27 08:45:00', commit: 'e4f5g6h', author: 'Jane Smith' },
  { id: 'DEP-003', service: 'auth-service', environment: 'Staging', status: 'Running', version: 'v3.1.0', duration: '1m 48s', timestamp: '2026-05-27 09:30:00', commit: 'i7j8k9l', author: 'Bob Wilson' },
  { id: 'DEP-004', service: 'payment-service', environment: 'Production', status: 'Failed', version: 'v2.0.1', duration: '4m 22s', timestamp: '2026-05-26 22:10:00', commit: 'm0n1o2p', author: 'Alice Brown' },
  { id: 'DEP-005', service: 'notification-svc', environment: 'Staging', status: 'Success', version: 'v1.2.0', duration: '1m 56s', timestamp: '2026-05-26 18:30:00', commit: 'q3r4s5t', author: 'Charlie Davis' },
  { id: 'DEP-006', service: 'analytics-engine', environment: 'Production', status: 'Success', version: 'v4.0.2', duration: '5m 11s', timestamp: '2026-05-26 15:00:00', commit: 'u6v7w8x', author: 'John Doe' },
];

export const mockContainers = [
  { id: 'CTR-001', name: 'cloudcart-frontend', image: 'cloudcart/frontend:latest', status: 'Running', cpu: 12.4, memory: 256, uptime: '7d 4h 23m', ports: '3000:3000', health: 'Healthy' },
  { id: 'CTR-002', name: 'cloudcart-api', image: 'cloudcart/api:latest', status: 'Running', cpu: 34.2, memory: 512, uptime: '7d 4h 23m', ports: '5000:5000', health: 'Healthy' },
  { id: 'CTR-003', name: 'cloudcart-mongodb', image: 'mongo:7.0', status: 'Running', cpu: 8.1, memory: 1024, uptime: '14d 2h 10m', ports: '27017:27017', health: 'Healthy' },
  { id: 'CTR-004', name: 'cloudcart-redis', image: 'redis:7-alpine', status: 'Running', cpu: 2.3, memory: 128, uptime: '14d 2h 10m', ports: '6379:6379', health: 'Healthy' },
  { id: 'CTR-005', name: 'cloudcart-nginx', image: 'nginx:alpine', status: 'Running', cpu: 1.8, memory: 64, uptime: '7d 4h 23m', ports: '80:80,443:443', health: 'Healthy' },
  { id: 'CTR-006', name: 'cloudcart-worker', image: 'cloudcart/worker:latest', status: 'Stopped', cpu: 0, memory: 0, uptime: '-', ports: '-', health: 'Unhealthy' },
];

export const mockJenkinsBuilds = [
  { id: '#247', job: 'cloudcart-frontend', status: 'Success', branch: 'main', duration: '2m 34s', timestamp: '2 min ago', stages: ['Checkout', 'Install', 'Lint', 'Test', 'Build', 'Deploy'] },
  { id: '#246', job: 'cloudcart-api', status: 'Success', branch: 'main', duration: '3m 12s', timestamp: '15 min ago', stages: ['Checkout', 'Install', 'Lint', 'Test', 'Build', 'Deploy'] },
  { id: '#245', job: 'cloudcart-frontend', status: 'Failed', branch: 'feature/auth', duration: '1m 48s', timestamp: '1 hr ago', stages: ['Checkout', 'Install', 'Lint', 'Test'] },
  { id: '#244', job: 'cloudcart-worker', status: 'Success', branch: 'main', duration: '4m 22s', timestamp: '3 hrs ago', stages: ['Checkout', 'Install', 'Test', 'Build', 'Deploy'] },
  { id: '#243', job: 'cloudcart-api', status: 'Running', branch: 'develop', duration: '1m 56s', timestamp: 'Just now', stages: ['Checkout', 'Install', 'Lint'] },
];

export const mockSystemMetrics = {
  cpu: { current: 42, history: [35, 38, 42, 45, 41, 39, 42, 48, 52, 47, 43, 42] },
  ram: { current: 68, total: 32, used: 21.8, history: [62, 64, 65, 67, 68, 70, 69, 68, 67, 68, 69, 68] },
  disk: { current: 54, total: 500, used: 270 },
  network: { in: 124.5, out: 89.3 },
  uptime: '14d 2h 10m',
  activeUsers: 234,
  requestsPerSecond: 1247,
  avgResponseTime: 42,
  errorRate: 0.12,
};

export const mockTrafficData = [
  { time: '00:00', requests: 120, errors: 2, latency: 45 },
  { time: '02:00', requests: 80, errors: 1, latency: 38 },
  { time: '04:00', requests: 45, errors: 0, latency: 32 },
  { time: '06:00', requests: 90, errors: 1, latency: 41 },
  { time: '08:00', requests: 250, errors: 3, latency: 52 },
  { time: '10:00', requests: 480, errors: 5, latency: 58 },
  { time: '12:00', requests: 620, errors: 7, latency: 65 },
  { time: '14:00', requests: 550, errors: 4, latency: 55 },
  { time: '16:00', requests: 480, errors: 6, latency: 61 },
  { time: '18:00', requests: 390, errors: 3, latency: 48 },
  { time: '20:00', requests: 310, errors: 2, latency: 44 },
  { time: '22:00', requests: 200, errors: 1, latency: 40 },
];

export const mockLogs = [
  { timestamp: '2026-05-27 09:30:15', level: 'INFO', service: 'api-gateway', message: 'Request processed successfully - GET /api/products - 200 OK (42ms)' },
  { timestamp: '2026-05-27 09:30:12', level: 'INFO', service: 'auth-service', message: 'User login successful - user: john@example.com' },
  { timestamp: '2026-05-27 09:30:10', level: 'WARN', service: 'payment-service', message: 'Slow query detected - findOrderById took 2.3s (threshold: 1s)' },
  { timestamp: '2026-05-27 09:30:08', level: 'ERROR', service: 'payment-service', message: 'Payment processing failed - Stripe API timeout after 30s' },
  { timestamp: '2026-05-27 09:30:05', level: 'INFO', service: 'frontend-app', message: 'Build completed successfully - v2.4.1 deployed to production' },
  { timestamp: '2026-05-27 09:29:58', level: 'INFO', service: 'nginx', message: 'Health check passed - all upstream servers healthy' },
  { timestamp: '2026-05-27 09:29:55', level: 'DEBUG', service: 'analytics-engine', message: 'Processing batch of 1247 events - queue depth: 342' },
  { timestamp: '2026-05-27 09:29:50', level: 'INFO', service: 'mongodb', message: 'Replica set primary elected - node-1.mongodb.internal' },
  { timestamp: '2026-05-27 09:29:45', level: 'WARN', service: 'cloudcart-worker', message: 'Memory usage above 80% threshold - current: 84%' },
  { timestamp: '2026-05-27 09:29:40', level: 'INFO', service: 'redis', message: 'Cache hit ratio: 94.2% - 12,847 hits / 13,632 total' },
];

export const mockActivities = [
  { id: 1, type: 'deployment', message: 'Frontend v2.4.1 deployed to production', time: '2 min ago', icon: 'rocket' },
  { id: 2, type: 'order', message: 'New order #ORD-005 received - $229.98', time: '5 min ago', icon: 'shopping-cart' },
  { id: 3, type: 'user', message: 'New user registered: charlie@example.com', time: '12 min ago', icon: 'user-plus' },
  { id: 4, type: 'alert', message: 'CPU usage spike detected on api-gateway', time: '18 min ago', icon: 'alert-triangle' },
  { id: 5, type: 'build', message: 'Jenkins build #246 completed successfully', time: '25 min ago', icon: 'check-circle' },
  { id: 6, type: 'deployment', message: 'API Gateway v1.8.3 deployed to production', time: '45 min ago', icon: 'rocket' },
  { id: 7, type: 'order', message: 'Order #ORD-004 payment confirmed', time: '1 hr ago', icon: 'credit-card' },
  { id: 8, type: 'alert', message: 'SSL certificate renewal in 7 days', time: '2 hrs ago', icon: 'shield' },
];

export const categories = ['All', 'Servers', 'Containers', 'DevOps', 'Databases', 'Networking', 'Monitoring', 'Security', 'Compute'];
