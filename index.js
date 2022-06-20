import app from "./server.js";
import sqlite3 from "sqlite3";
import PoolsDAO from "./dao/PoolsDAO.js"

const port = process.env["PORT"];

await PoolsDAO.injectDB();
app.listen(port, () => { 
  console.log("listening on port %d", port);
});