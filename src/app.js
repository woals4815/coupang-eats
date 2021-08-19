import "dotenv/config";
import express from "express";
import cartRotuer from "./Routers/cartRouter";
import foodCategoryRouter from "./Routers/categoryRouter";
import locationRouter from "./Routers/locationRouter";
import menuRouter from "./Routers/menuRouter";
import optionRouter from "./Routers/optionRouter";
import restaurantRouter from "./Routers/restauratantRouter";
import userRouter from "./Routers/userRouter";
import routes from "./routes";

const app = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(routes.users, userRouter);
  app.use(routes.categories, foodCategoryRouter);
  app.use(routes.locations, locationRouter);
  app.use(routes.restaurants, restaurantRouter);
  app.use(routes.menus, menuRouter);
  app.use(routes.carts, cartRotuer);
  app.use(routes.options, optionRouter);

  return app;
};

export default app;
