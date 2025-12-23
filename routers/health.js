import express from "express"

export const health = express()

health.get("/",(req,res)=>{
    res.json({"ok" : "true"})
})