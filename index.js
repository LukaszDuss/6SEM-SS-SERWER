const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const db = require("./queries");
const { application } = require("express");
const port = 3002;

app.use(cors());
app.use(bodyParser.json());

app.get("/tasks", db.getTasks);
app.post("/tasks", db.createTask);
app.delete("/tasks", db.deleteTask);
app.put("/tasks", db.updateTask);
app.put("/tasks/status", db.updateStatus);

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}.`);
});
