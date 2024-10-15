import jwt from 'jsonwebtoken';

const signin = () => {
  const email = 'test@test.com';
  const password = '12345';
  const JWT_KEY = 'asdf';
  const id = 'asdasndj12213';

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
