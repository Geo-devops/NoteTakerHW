const express = require("express")
const apiRoutes = require("./routes/api");
const htmlRoutes = require("./routes/html")

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, () => console.log("listening on PORT " + PORT));
