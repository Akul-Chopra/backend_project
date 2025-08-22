import express from "express";
import dotenv from "dotenv";
import authRouter from './routes/auth.js';
import categoryRoutes from './routes/category.js';

dotenv.config();
const app = express();


app.use(express.json());

app.use('/auth', authRouter);
app.use("/categories", categoryRoutes)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 8080}`);
});