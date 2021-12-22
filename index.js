const express = require("express");
const app = express();
const port = "8000";

app.use(express.urlencoded({ extended: true }));
app.use("/", require("./routes"));
//Server Listner
app.listen(port, function (err) {
  if (err) {
    console.log("Error Running the Server", err);
  }
  console.log("Server Running on Port: ", port);
});
