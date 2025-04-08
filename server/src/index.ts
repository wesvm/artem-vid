import express from "express"
import cors from "cors"
import router from "./routes"
import errorHandler from "./middlewares/error"

const app = express()
const PORT = process.env.PORT || 3000
app.disable("x-powered-by")
app.use(express.json())
app.use(cors())
app.use("/api", (req, res) => {
  res.json({ message: "API is running" })
})
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})