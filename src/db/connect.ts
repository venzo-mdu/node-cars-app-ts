import mongoose, { ConnectOptions } from 'mongoose';
import config from 'config';
const dotenv = require("dotenv");
dotenv.config()

function connect() {
    // const dbUri = config.get("dbUri") as string;
    // const dbUri = "mongodb://127.0.0.1:27017/mydb";
    const dbUri = process.env.MONGO_DB_URI;
    console.log("dburi",dbUri);
    return mongoose.connect(dbUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions).then(() => {
        console.log("Database connected successfully");
    }).catch((error) => {
        console.log("db error", error);
        process.exit(1);
    });

}
export default connect;