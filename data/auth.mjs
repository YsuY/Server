import MongoDB from "mongodb"
import { getUsers } from "../db/database.mjs" // users 컬렉션까지 접근

// ObjectId 다루는 객체 생성
const ObjectId = MongoDB.ObjectId


// 중복 체크 함수
export async function findByUserid(userid) {
    // next() : 그 다음 함수(mapOptionalUser)와 연결시켜줌
    return getUsers().find({userid}).next().then(mapOptionalUser)
}

//user 객체 받으면 처리, 호출 함수 -> 회원가입
export async function createUser(user) {
    return getUsers().insertOne(user).then((result) => result.insertedId.toString())
    // result.insertedId.toString() : 삽입 됐는지 확인, 아이디를 스트링으로 반환
}

// 유저 아이디를 찾아줌 -> 중복 체크 함수와 연결
function mapOptionalUser(user) {
    // 아이디가 있다면 객체 형식으로 리턴시켜줌. 없다면 null
    return user ? {...user, id: user._id.toString() } : user
}
