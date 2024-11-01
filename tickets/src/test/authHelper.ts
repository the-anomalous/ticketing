import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const signin = () => {
  const email = 'test@test.com';
  const JWT_KEY = 'asdf';
  const id = new mongoose.Types.ObjectId().toHexString();

  const token = jwt.sign(
    {
      email,
      id,
    },
    JWT_KEY
  );
  const session = { jwt: token };
  const sessionJSON = JSON.stringify(session);
  const sessionBase64 = Buffer.from(sessionJSON).toString('base64');

  return [`session=${sessionBase64}`];
};

export { signin };
