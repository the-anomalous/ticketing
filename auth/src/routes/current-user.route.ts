import { currentUser } from "@ad-tickets/commonlib";
import express from "express";

const router = express.Router();

// Not case sensitive
router.get("/api/users/currentuser", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
