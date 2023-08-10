import express from "express";
import config from "config"
import connect from "./db/connect";
import carRoutes from "./routes/carRoutes";
import userRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/cars", carRoutes);
app.use("/api/users", userRoutes);
app.use("/api/book", bookRoutes)

app.listen(port, host, () => {
    console.log(`Server is listening on port http://${host}:${port}`);
    connect();
    // routes(app);
});

export default app;

// app.get("/",(req:Request,res:Response)=>{
//     return res.send("Hello from ts");
// });
// app.use('/api/cars', carRoutes);

