import mongoose from 'mongoose';

import app from '@/app';

const PORT = 3000;

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('Cannot find JWT_KEY');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('Cannot find MONGO_URI');
  }

  const uri = process.env.MONGO_URI;
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }

  app.listen(PORT, () => {
    console.log(`listening on PORT:${PORT}`);
  });
};

start();
