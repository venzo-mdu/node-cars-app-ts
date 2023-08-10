import mongoose, { ConnectOptions } from 'mongoose';
import config from 'config';

function connect() {
    const dbUri = config.get("dbUri") as string;
    // const dbUri = "mongodb://127.0.0.1:27017/mydb";

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