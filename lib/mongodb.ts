import mongoose from 'mongoose';

// Define the structure for our cached connection
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend the global namespace to include our mongoose cache
declare global {
  var mongoose: MongooseCache | undefined;
}

// Retrieve MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Throw an error if MONGODB_URI is not defined
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// Initialize the cache object
// In development, Next.js hot-reloads can cause multiple connections
// This cache prevents that by reusing the existing connection
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

// Store the cache globally in development to persist across hot-reloads
if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Establishes and returns a MongoDB connection using Mongoose
 * Uses connection caching to prevent multiple simultaneous connections
 * @returns {Promise<typeof mongoose>} The Mongoose instance with an active connection
 */
async function connectDB(): Promise<typeof mongoose> {
  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Create a new connection promise if one doesn't exist
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Disable command buffering for better error handling
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    // Wait for the connection to establish and cache it
    cached.conn = await cached.promise;
  } catch (error) {
    // Clear the promise on error so the next call can retry
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;
