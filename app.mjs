import express from "express"
import {config} from "./config.mjs" // config.mjs 안의 config 임포트
import { connectDB } from "./db/database.mjs" //connectDB 시 자동 생성되는 코드
import authRouter from "./router/auth.mjs"
import postRouter from "./router/posts.mjs"

const app = express()

app.use(express.json())
app.use("/auth", authRouter)
app.use("/post", postRouter)

app.use((req, res) => {
    res.sendStatus(404) // 다루지 않는 것 404로 보내기
})


// app.listen(config.host.port, () => { // config.host.port : 8080
//     console.log("서버 실행 중...")
// })

connectDB().then(() => {
    app.listen(config.host.port, () => { 
        console.log("DB/웹 서버 실행 중...")
    })
}).catch(console.error)

//API 주소를 만들기 위해 ...