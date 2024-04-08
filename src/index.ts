import express, { Application, Request, Response, NextFunction } from "express"
import compression from "compression"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"
import authRoutes from "./routes/auth.routes"
import userRoutes from "./routes/user.routes"
import folderRoutes from "./routes/folder.routes"
import fileRoutes from "./routes/file.routes"
import reviewRoutes from "./routes/review.routes"
import fileHistoryRoutes from "./routes/fileHistory.routes"
import { HttpException } from "./exceptions/HttpException"
import { db } from "./config/dbConfig"

db.sequelize.authenticate()
    .then(() => {
        console.log("Database Connection Successful");
    }).catch(err => {
        console.log(err);
    })
db.sequelize.sync({ force: false })
    .then(() => {
        console.log("Yes Re Syncing to the database has been done");
    }).catch(err => {
        console.log(err);
    })

const app: Application = express()
app.use(express.json())
app.use(compression())
app.use(morgan("dev"))
app.use(helmet())
app.use(cors())
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/folders", folderRoutes)
app.use("/api/v1/folders", fileRoutes)
app.use("/api/v1/reviews", reviewRoutes)
app.use("/api/v1/fileHistory", fileHistoryRoutes)
app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!!!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

const port: number = 5000
app.listen(port, () => {
    console.log(`Backend Server is currently running on port ${port}`);
})