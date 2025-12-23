import express from "express"
import { getAgents, writeAgents } from "../utils/agentsUtils.js"


export const agents = express()

agents.get("/", async (req, res) => {
    try {
        let agents = await getAgents()
        res.json(agents)
    } catch (error) {
        console.error(error);
        res.status(500).send("ERROR")
    }
})

agents.get("/:id", async (req, res) => {
    try {
        let agents = await getAgents()
        const agent = agents.filter((agent) => { if (agent.id == req.params.id) { return true } })
        if (agent[0]) {
            res.json(agent)
        } else { res.status(404).send("Not Found") }
    } catch (error) {
        console.error(error);
        res.json(error)
    }
})

agents.post("/", async (req, res) => {
    try {
        let agents = await getAgents()
        let flag = true
        for (let agent of agents) {
            if (agent.id == req.body.id) {
                flag = false
                res.status(409).send("Conflict")
            }
        } if (flag) {
            agents.push(req.body)
            await writeAgents(agents)
            res.status(201).send("update")
        }
    } catch (error) {
        console.error(error, "oufutnfuyt");
        res.json(error)

    }
})


agents.put("/:id", async (req, res) => {
    try {
        let agents = await getAgents()
        const inagent = agents.findIndex((agent) => agent.id == req.params.id)
        if (inagent != -1) {
            for (let key in req.body) {
                agents[inagent][key] = req.body[key]
            }
            await writeAgents(agents)
            res.json(agents[inagent])
        } else { res.status(404).send("Not Found") }
    } catch (error) {
        console.error(error);
        res.json(error)
    }
})