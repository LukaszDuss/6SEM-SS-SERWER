const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./queries");
const port = 3002;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/Tasks", db.getTasks);
app.post("/Tasks", db.createTask);
app.delete("/Tasks", db.deleteTask);
app.put("/Task/Text", db.updateTask);
app.put("/Task/Due", db.updateDue);
app.put("/Task/Priority", db.updatePriority);
app.put("/Task/Status", db.updateStatus);

app.listen(port, () => {
  console.log(`App running on port http://localhost:${port}.`);
});
