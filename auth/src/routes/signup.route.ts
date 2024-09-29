import {BadRequestError} from "@ad-tickets/commonlib";
import {validateRequest} from "@ad-tickets/commonlib";
import { User } from "@/models/user.model";
import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from 'jsonwebtoken'

const router = express.Router();

router.get("/api/users/signup", (req: Request, res: Response) => {
  return res.send("sign-up");
});

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email not valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("length should be between 4 to 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {email, password} = req.body     
    const existingUser = await User.findOne({email})

    if (existingUser) {
        throw new BadRequestError('Email already in use')
    }

    const newUser = User.build({email, password}) 
    await newUser.save()

    // Generate JWT token
    const token = jwt.sign({
      email: newUser.email, 
      id: newUser._id
    }, process.env.JWT_KEY!)

    // Store JWT token in a session 
    req.session = {
      jwt: token
    }

    return res.status(201).send(newUser);
  }
);

export { router as signupRouter };
