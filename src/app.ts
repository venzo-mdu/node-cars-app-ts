import express  from "express";
// import config from "config"
import connect from "./db/connect";
import carRoutes from "./routes/carRoutes";
import userRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";
import checkerRoutes from "./routes/checkerRoutes";
// import errorHandler from "./middleware/errorHandler";

// const port = config.get("port") as number;
// const host = config.get("host") as string;
const dotenv = require("dotenv");
dotenv.config();

const portVar = process.env.PORT || 8000;

const port: number = portVar as number;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(errorHandler as unknown as express.ErrorRequestHandler);

app.use("/api/cars", carRoutes);
app.use("/api/users", userRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/checker", checkerRoutes);

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
    connect();
    // routes(app);
});

export default app;

// app.get("/",(req:Request,res:Response)=>{
//     return res.send("Hello from ts");
// });
// app.use('/api/cars', carRoutes);

