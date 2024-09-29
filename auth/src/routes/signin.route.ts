import {BadRequestError} from "@ad-tickets/commonlib";
import {validateRequest} from "@ad-tickets/commonlib";
import { User } from "@/models/user.model";
import PasswordManager from "@/services/password.hashing";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/api/users/signin", (req: Request, res: Response) => {
  return res.send("sign-in");
});

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email not valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("length should be between 4 to 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) throw new BadRequestError("Invalid credentials");

    const passwordMatch = await PasswordManager.comparePassword(existingUser.password, password)
    if (!passwordMatch) throw new BadRequestError('Invalid Credentials')
    
    // Generate JWT token 
    const token = jwt.sign({
        email: existingUser.email, 
        id: existingUser._id
    }, process.env.JWT_KEY!) 

    // Send a JWT 
    req.session = {
        jwt: token
    }

    return res.status(201).send(existingUser)
  }
);

export { router as signinRouter };
