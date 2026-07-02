import MongoDB from "mongodb"
import { config } from "../config.mjs"

let db
export async function connectDB() {
    return MongoDB.MongoClient.connect(config.db.host).then((client) => {
        db = client.db("Xdb") // 데이터베이스명, 없으면 생성됨
    })
}