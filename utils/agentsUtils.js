import { promises as fs } from "fs"



export const getAgents = async function () {
    try {
        let agents = await fs.readFile("./data/agents.json", "utf8")
        agents = JSON.parse(agents)
        return agents
    } catch (error) {
        console.error(error);
        return
    }
}
export const writeAgents = async (agents) => {
    try {
        agents = JSON.stringify(agents)
        await fs.writeFile("./data/agents.json", agents)
        return "write"
    } catch (error) {
        console.error(error);
        return
    }
}