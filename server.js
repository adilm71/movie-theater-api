const { app } = require("./src/app");
const { db } = require("./db/connection.js");
const port = 3000;
app.listen(port, () => {
  db.sync();
  console.log(`The server is running on http://localhost:${port}/theatre`);
});
