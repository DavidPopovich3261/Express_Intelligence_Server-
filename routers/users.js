import express from "express"
import { getUsers, writeusers } from "../utils/usersUtils.js"

export const users = express()


users.get("/", async (req, res) => {
    try {
        let users = await getUsers()
        res.json(users)
    } catch (error) {
        console.error(error);
        res.status(500).send("ERROR")
    }
})

users.post("/", async (req, res) => {
    try {
        let users = await getUsers()
        let flag = true
        for (let user of users) {
            if (user.username == req.body.username) {
                flag = false
                res.status(409).send("Conflict")
            }
        } if (flag) {
            users.push(req.body)
            await writeusers(users)
            res.status(200).send("update")
        }
    } catch (error) {
        console.error(error, "oufutnfuyt");
        res.json(error)

    }
})

users.put("/:username", async (req, res) => {
    try {
        let users = await getUsers()
        const inuser = users.findIndex((user) => user.username == req.params.username)
        if (inuser != -1) {
            users[inuser].password = req.body.password
            await writeusers(users)
            res.json(users[inuser])
        } else { res.status(404).send("Not Found") }
    } catch (error) {
        console.error(error);
        res.json(error)
    }
})

users.delete("/:username", async (req, res) => {
    try {
        let users = await getUsers()
        users = await users.filter((user) => { if (user.username != req.params.username) { return true } })
        await writeusers(users)
        res.status(200).send("resource deleted successfully")
    } catch (error) {
        res.status(404).send("Not Found")
    }
})