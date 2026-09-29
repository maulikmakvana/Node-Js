const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("MongoDB is connected successfully...");
}).catch((err) => {
    console.log("MongoDB Connection Error: ", err);
});
