
import express from "express"
import {isAuth} from "../middleware/auth.mjs"
import * as postController from "../controller/posts.mjs"


const router = express.Router() // 객체 만들기

// 전체 포스트 가져오기
//http://127.0.0.1:8080/post (GET)으로 주소 설정
//http://127.0.0.1:8080/post?userid=apple (GET)으로 특정인의 글만 가져오기
router.get("/", isAuth, postController.getPosts)


// 글 번호에 대한 포스트 가져오기
//http://127.0.0.1:8080/post/:id (GET)으로 주소 설정
router.get("/:id", isAuth, postController.getPost)

// 포스트 쓰기
//http://127.0.0.1:8080/post (POST)로 주소 설정
// isAuth -> postController의 createPost를 순서대로 들림
// 로그인 후 작성하게 되어있으므로 로그인 후 body에서 text 작성, Authorization의 Bearer token에 로그인 한 토큰 붙여넣기
// -> _id, text, createdAt, idx, name, userid 출력됨 
router.post("/", isAuth, postController.createPost)

// 포스트 수정하기
//http://127.0.0.1:8080/post/:id (PUT)로 주소 설정
router.put("/:id", isAuth, postController.updatePost)
 
// 포스트 삭제하기
//http://127.0.0.1:8080/post/:id (DELETE)로 주소 설정
router.delete("/:id", isAuth, postController.deletePost)

// 라우터 객체 리턴
export default router