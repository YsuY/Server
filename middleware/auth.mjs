import jwt from "jsonwebtoken"
import { config } from "../config.mjs"
import * as authRepository from "../data/auth.mjs"


const AUTH_ERROR = { message: "인증에러" }

export const isAuth = async(req, res, next) => { // next : 다음으로 넘어갈 수 있음
    const authHeader = req.get("Authorization")
    console.log(authHeader)

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        console.log("헤더 에러")
        return res.status(401).json(AUTH_ERROR)
    }

    // 헤더의 키 값 : authorization, 그 안에 Bearer token(Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNDYwMjNlZTg0YTkzNWI4YTc5OTEyMCIsImlhdCI6MTc4MzA
    // zODA0MywiZXhwIjoxNzgzMTI0NDQzfQ.zMxSOTz2dt9UB7JedCo1C3BGRgUe0_NC4CXprDOasok)
    //토큰 분리하기
    const token = authHeader.split(" ")[1] //공백 이후인 Bearer제거한 토큰만 반환
    jwt.verify(token, config.jwt.secretKey, async(error, decoded) => {
        if(error) {
            console.log("토큰 에러") // 기간이 만료되거나 제대로 된 것이 아닐 때
            return res.status(401).json(AUTH_ERROR)
        }
        // console.log(decoded)
        // 데이터 -> auth.mjs의 findbyid 사용
        const user = await authRepository.findById(decoded.id) // 오브젝트 id가 꺼내짐
        if(!user) {
            console.log("해당 아이디 없음")
            return res.status(401).json(AUTH_ERROR)
        }
        console.log("user.id: ", user.id)
        console.log("user.userid: ", user.userid)
        req.id = user.id // user.id => 오브젝트 아이디, req.id에 오브젝트 아이디 넣어줌
        req.token = token
        next()
    })


}