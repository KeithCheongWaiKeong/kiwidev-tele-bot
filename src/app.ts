import * as express from "express";
import { join } from "path";

const app = express();
const port = process.env.PORT ?? 3000;

app.use(express.static(join(__dirname, "public")));

app.get("*", (req, res) => {
  res.redirect("/");
});

app.listen(port, () => {
  console.log('App is now live.')
  console.log(`App listening on port ${port}.`);
});
