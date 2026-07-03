import * as postRepository from "../data/posts.mjs"

// 포스트를 작성하는 함수
export async function createPost(req, res) {
    // 사용자가 json을 통해 보내온 데이터를 받음, 헤더에 사용자 정보가 암호화되어 들어있음 -> 글만 받아도 됨
    const {text} = req.body
    // 글을 작성할 땐 isAuth를 들렸다 오기 때문에 req.id를 넣어주면 오브젝트 아이디가 따라오게 됨
    const post = await postRepository.create(text, req.id)
    // 글 작성한 것을 post에 저장 후 성공적이면 출력
    res.status(201).json(post)
}   

// 모든 포스트를 가져오는 함수
export async function getPosts(req, res) {
    //user id 데이터 받기
    const userid = req.query.userid
    // 아이디의 글이 있으면 해당 글만 가져오고 아니라면 전체글 가져오기
    const data = await (userid? postRepository.getAllByUserid(userid) : postRepository.getAll())
    res.status(200).json(data)
}

// params : 특정 URL 조회
// query : 뭘 가져올지에 대한 추가 조건/옵션 조회(검색, 필터, 정렬 등)
// body : 요청 본문에 담아서 보내는 데이터(새 글 작성, 수정, 로그인 등) 

// 글 번호(id)에 대한 포스트 가져오는 함수
export async function getPost(req, res) {
    const id = req.params.id
    const post = await postRepository.getById(id)
    if(post){
        res.status(200).json(post)
    }else{
        res.status(404).json({ message: `${id}의 포스트가 없습니다`})
    }
}

// 포스트 수정하기에 대한 함수
export async function editPost(req, res) {
    const id = req.params.id
    const edit = {
        ...req.body,
        updatedAt: new Date()
    }
    const result = await postRepository.update(id, edit)
    // 수정할 게시글을 못 찾았다면
    if(result.matchedCount === 0) {
        res.status(404).json({ message: "수정 오류 발생"})
    } 
    const updatedPost = await postRepository.getpost(id)
    return res.status(200).json(updatedPost)
}

// 포스트 삭제
export async function deletePost(req, res) {
    const id = req.params.id
    const post = await postRepository.getById(id)
    if(!post) {
        return res.status(404).json({message: `${id}의 포스트가 없습니다`})
    }
    // 글 쓴 사용자와 로그인 한 사용자와 다르다면 에러 발생
    if(post.idx !== req.id) {
        // 보낼 게 없어서 status 대신 sendStatus(403) 사용
        return res.sendStatus(403)
    }
    await postRepository.remove(id)
    res.sendStatus(204) // 204 : no contenet 내용 없음
}