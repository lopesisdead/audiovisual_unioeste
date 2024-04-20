import { openDB } from "./config.js";

export async function init() {
    const db = await openDB();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS tasks(
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            status TEXT NOT NULL,
            date TEXT NOT NULL
        )
    `);
    console.log("Criado!! 👍👍")
}