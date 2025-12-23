import express from "express"
import {health} from "./routers/health.js"
import { users } from "./routers/users.js"
import { agents } from "./routers/agents.js"
const app = express()

app.use(express.json())
app.use("/health",health)
app.use("/users",users)
app.use("/agents",agents)


app.listen(8000,(req,res)=>{
    console.log("server run ...");
})