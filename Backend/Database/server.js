const app = require("./src/app");

const mongoose = require("mongoose");
function connectDB() {
  mongoose
    .connect(
    //   uri paste the uri
    
    )
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB", err);
    });
}
connectDB();
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
