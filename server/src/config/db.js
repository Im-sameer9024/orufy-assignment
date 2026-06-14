import mongoose from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error('❌ MONGODB_URL is missing. Please check your environment variables.');
}

mongoose.set('strictQuery', true);

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(MONGODB_URL, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`✅ MongoDB Connected: ${connection.connection.host}`);

    mongoose.connection.on('connected', () => {
      console.log('📦 MongoDB connection established');
    });

    mongoose.connection.on('error', (error) => {
      console.error('❌ MongoDB connection error:', error);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected');
    });
  } catch (error) {
    console.error('❌ Failed to connect MongoDB:', error);
    process.exit(1);
  }
};

process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('🔌 MongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error while closing MongoDB connection:', error);
    process.exit(1);
  }
});

export default connectDB;
