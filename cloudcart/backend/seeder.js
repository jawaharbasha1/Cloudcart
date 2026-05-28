const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./src/models/Product');
const User = require('./src/models/User');
const Order = require('./src/models/Order');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const mockProducts = [
  { name: 'Cloud Server Pro', description: 'High-performance cloud server with 16 vCPUs, 64GB RAM, and 500GB NVMe SSD', price: 299.99, category: 'Servers', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400', rating: 4.8, reviews: 234, stock: 50, tags: ['compute', 'high-performance'] },
  { name: 'Kubernetes Cluster', description: 'Managed Kubernetes cluster with auto-scaling, monitoring, and 99.99% SLA', price: 499.99, category: 'Containers', image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400', rating: 4.9, reviews: 189, stock: 30, tags: ['kubernetes', 'orchestration'] },
  { name: 'CI/CD Pipeline', description: 'Automated CI/CD pipeline with Jenkins integration, artifact storage, and deployment automation', price: 149.99, category: 'DevOps', image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400', rating: 4.7, reviews: 312, stock: 100, tags: ['automation', 'deployment'] },
  { name: 'Database Cluster', description: 'MongoDB Atlas-compatible database cluster with automated backups and replication', price: 199.99, category: 'Databases', image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400', rating: 4.6, reviews: 156, stock: 75, tags: ['database', 'nosql'] },
  { name: 'Load Balancer', description: 'Global load balancer with SSL termination, DDoS protection, and health checks', price: 89.99, category: 'Networking', image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400', rating: 4.5, reviews: 98, stock: 200, tags: ['networking', 'security'] },
  { name: 'Monitoring Suite', description: 'Prometheus + Grafana monitoring with custom dashboards, alerting, and log aggregation', price: 179.99, category: 'Monitoring', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400', rating: 4.8, reviews: 267, stock: 150, tags: ['monitoring', 'observability'] }
];

const mockUsers = [
  { name: 'Admin User', email: 'admin@cloudcart.io', password: 'password123', role: 'admin' },
  { name: 'Test User', email: 'user@example.com', password: 'password123', role: 'user' }
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    const createdUsers = await User.insertMany(mockUsers);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = mockProducts.map(product => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Order.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
