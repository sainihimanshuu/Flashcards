import app from "./app.js";
import connectToDatabase from "./src/Database/index.js";

connectToDatabase()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Listening to port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(`mySql connection error ${error}`);
    });
