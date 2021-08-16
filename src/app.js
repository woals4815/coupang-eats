import "dotenv/config";
import express from "express";
import foodCategoryRouter from "./Routers/categoryRouter";
import userRouter from "./Routers/userRouter";
import routes from "./routes";

const app = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(routes.users, userRouter);
  app.use(routes.categories, foodCategoryRouter);

  return app;
};

export default app;
