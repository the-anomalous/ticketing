import request from "supertest";
import { app } from "@/app";
import { signin } from "@/test/authHelper";


// Errors works for both currentuser and currentUser
it("returns current user", async () => {
  const {cookie, email} = await signin();

  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .set("Cookie", cookie)
    .expect(200);

  expect(response.body.currentUser.email).toEqual(email)
});

it("returns current user as null", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .expect(200);

  expect(response.body.currentUser).toEqual(null)
});