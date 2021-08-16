import createApp from "./src/app";

const liesteningHandler = () =>
  console.log(`Liestening to ${process.env.DEV_PORT || 3000}`);

const main = () => {
  const app = createApp();
  app.listen(process.env.PORT, liesteningHandler);
};

main();
