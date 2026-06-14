import 'dotenv/config.js';
import app from './app.js';
import connectDB from './config/db.js';
import Otp from './modules/user/otp.schema.js';
import { ConnectCloudinary } from './config/cloudinary.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    //------------- Connect Database --------------------
    await connectDB();
    await ConnectCloudinary();

    // Start Server
    const server = app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    // Graceful Shutdown
    const shutdown = async (signal) => {
      console.log(`\n${signal} received. Shutting down gracefully...`);

      server.close(() => {
        console.log('🛑 HTTP server closed');
        process.exit(0);
      });
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  } catch (error) {
    console.error('❌ Server startup failed:', error);
    process.exit(1);
  }
};

startServer();
