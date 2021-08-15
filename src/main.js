import createApp from "./app";

const liesteningHandler = () =>
  console.log(`Liestening to ${process.env.DEV_PORT || 4000}`);

const main = () => {
  const app = createApp();
  app.listen(4000, liesteningHandler);
};

main();
