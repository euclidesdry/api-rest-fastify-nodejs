import { app } from "./app";
import { env } from "./env";

app.listen({ port: env.PORT }).then(() => {
  console.log(`HTTP Server is running on port \x1b[32m${env.PORT}\x1b[36m`);
});
