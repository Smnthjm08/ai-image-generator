import express, { response } from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";
import Post from "../db/models/post.js";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route("/").get((req, res) => {
  res.send("Hello from DALL -E!");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.complete({
      engine: "davinci-codex",
      prompt,
      max_tokens: 64,
      n: 1,
    });

    const image = aiResponse.data.choices[0].text;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);
    res.status(500).send(error?.response.data.error.message);
  }
});

export default router;
