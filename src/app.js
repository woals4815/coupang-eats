import "dotenv/config";
import express from "express";
import cartRotuer from "./Routers/cartRouter";
import foodCategoryRouter from "./Routers/categoryRouter";
import locationRouter from "./Routers/locationRouter";
import menuRouter from "./Routers/menuRouter";
import optionRouter from "./Routers/optionRouter";
import orderRouter from "./Routers/orderRouter";
import restaurantRouter from "./Routers/restauratantRouter";
import reviewRouter from "./Routers/reviewRouter";
import uploadRouter from "./Routers/uploadRouter";
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
  app.use(routes.orders, orderRouter);
  app.use(routes.reviews, reviewRouter);
  app.use(routes.uploads, uploadRouter);

  return app;
};

export default app;
