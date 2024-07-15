import express from "express";
import {
  createStory,
  deleteStory,
  getStories,
  updateStory,
} from "../controller/storyController.js";

const router = express.Router();

router.post("/", createStory);
router.get("/", getStories);
router.get("/:id", updateStory);
router.delete("/:id", deleteStory);

export default router;
