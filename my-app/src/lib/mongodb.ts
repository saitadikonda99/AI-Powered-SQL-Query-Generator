import { MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("❌ MONGODB_URI is not defined in environment variables");
}

// Add SSL configuration options
const options: MongoClientOptions = {
  ssl: true,
  tls: true,
  tlsAllowInvalidCertificates: true, // Only use during development
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
  try {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}

clientPromise = global._mongoClientPromise!;
export default clientPromise;
