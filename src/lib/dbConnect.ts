import mongoose from "mongoose";

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to databse");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {});
    console.log(db);

    connection.isConnected = db.connections[0].readyState;

    console.log("DB Connected successfully");
  } catch (error) {
    console.log("Databse connection failed", error);

    process.exit();
  }
}

export default dbConnect;
