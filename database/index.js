const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb://admin:admin@127.0.0.1:27017/Twitter?readPreference=primary&ssl=false&directConnection=true"
  )
  .then(() => console.log("Youpi!"))
  .catch((err) => console.log(err));
