import MongoDB, { ObjectId } from "mongodb"
import * as UserRepository from "./auth.mjs"
import { getPosts } from "../db/database.mjs"


// 포스트를 작성
export async function create(text, id) { // 아이디 :오브젝트 아이디
    // 오브젝트 아이디를 이용해 사용자의 정보를 얻어냄
    return UserRepository.findById(id).then((user) => getPosts().insertOne({
        // 전달 받은 텍스트, 글 쓴 날짜, 유저 아이디(오브젝트아이디), 이름
        text, 
        createdAt: new Date(), 
        idx: user.id, 
        name: user.name,
        userid: user.userid
    })).then((result) => {
        // 사용자에 대한 오브젝트 아이디를 넣어 찾아줌
        return getPosts().findOne({ _id: result.insertedId })
    })
}

// 모든 포스트를 리턴
export async function getAll() {
    // getPosts 컬렉션을 찾고 내림차순으로 정렬 후 배열로 리턴
    return getPosts().find().sort({createdAt: -1}).toArray()
}

// 사용자 아이디에 대한 포스트를 리턴
export async function getAllByUserid(userid) {
    // getPosts 컬렉션 중 userid에 해당하는 글을 찾고 내림차순으로 정렬 후 배열로 리턴
    return getPosts().find({userid}).sort({createdAt: -1}).toArray()
}

// 글 번호에 대한 포스트 리턴
export async function getById(id) {
    return getPosts().find({ _id: new ObjectId(id) }).next().then(mapOptionalPost)
}

function mapOptionalPost(post){
    return post ? { ...post, id: post._id.toString() } : post
}

// 포스트 수정에 대한 결과 리턴
export async function update(id, edit) {
    return getPosts().updateOne(
        {_id: new ObjectId(id)},
        {$set: edit}
    )
}

// 수정 후 조회
export async function getpost(id) {
    return getPosts().findOne({ _id: new ObjectId(id) })
}

//포스트 삭제
export async function remove(id) {
    return getPosts().deleteOne({_id: new ObjectId(id)})
}