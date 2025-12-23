import { promises as fs } from "fs"



export const getUsers = async function () {
    try {
        let users = await fs.readFile("./data/users.json", "utf8")
        users = JSON.parse(users)
        return users
    } catch (error) {
        console.error(error);
        return
    }
}
export const writeusers = async (users) => {
    try {
        users=JSON.stringify(users)
        await fs.writeFile("./data/users.json",users)
        return "write"
    } catch (error) {
        console.error(error);
        return
    }
}