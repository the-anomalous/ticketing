import request from "supertest";
import { app } from "@/app";

it("returns status 400, email invalid", async () => {
  return await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@testcom",
      password: "12345",
    })
    .expect(400);
});

it("returns status 400, user(email) does not exist", async () => {
  return await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "12345",
    })
    .expect(400);
});

it("returns status 400, incorrect password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "123456",
    })
    .expect(201);

    await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "1234",
    })
    .expect(400);
});

it("responds with a cookie, valid credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "12345",
    })
    .expect(201);

    const response = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "12345",
    })
    .expect(201);
    
    expect(response.get('Set-Cookie')).toBeDefined()
}); 