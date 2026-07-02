import express from "express"
import * as authController from "../controller/auth.mjs"

const router = express.Router() // 객체 만들기

// 회원가입

//http://127.0.0.1:8080/post/signup (POST 방식)
router.post("/signup", authController.signup) // authController의 signup 사용



// 로그인
//http://127.0.0.1:8080/post/login (POST 방식)
router.post("/login", authController.login) // authController의 login 사용



// 로그인 유지 체크
//http://127.0.0.1:8080/post/me (GET 방식)
router.get("/me", authController.me) // authController의 me 사용



// 라우터 객체 리턴
export default router