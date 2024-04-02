import express, { Application } from "express"
import compression from "compression"
import morgan from "morgan"
import helmet from "helmet"
import cors from "cors"


const app: Application = express()
app.use(express.json())
app.use(compression())
app.use(morgan("dev"))
app.use(helmet())
app.use(cors())

const port: number = 5000
app.listen(port, () => {
    console.log(`Backend Server is currently running on port ${port}`);
})