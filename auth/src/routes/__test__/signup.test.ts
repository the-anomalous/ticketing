import request from "supertest";
import { app } from "@/app";

it("returns status 201, user signed up", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "12345",
    })
    .set("Accept", "application/json")
    .expect(201);
});

it("returns status 400, email invalid", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@testcom",
      password: "12345",
    })
    .set("Accept", "application/json")
    .expect(400);
});

it("returns status 400 RequestValidation Error, password invalid", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "1",
    })
    .set("Accept", "application/json")
    .expect(400);
});

it("returns status 400, email mising", async () => {
    await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com"
    })
    .set("Accept", "application/json")
    .expect(400);
});

it("returns status 400, password mising", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      password: "12345",
    })
    .set("Accept", "application/json")
    .expect(400);
});

it("returns status 400, email already in use", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "asdf@asdf.com",
      password: "12345",
    })
    .set("Accept", "application/json")
    .expect(201);

    await request(app)
    .post("/api/users/signup")
    .send({
      email: "asdf@asdf.com",
      password: "12345"
    })
    .set("Accept", "application/json")
    .expect(400);
});

it("sets a cookie after succesfull signup", async () => {
    const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test232@test.com",
      password: "12345"
    })
    .set("Accept", "application/json")
    .expect(201);

    expect(response.get('Set-Cookie')).toBeDefined();
});