import express from "express";
import cors from "cors";
import storyRoute from "./routes/storyRoute.js";
import userRoute from "./routes/userRoute.js";

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/api/story", storyRoute);
app.use("/api/user", userRoute);

app.listen(PORT, () => {
  console.log(`Api is running !!`);
});
