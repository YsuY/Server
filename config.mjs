import dotenv from "dotenv"

dotenv.config() // env 파일 연결

function required(key, defaultValue=undefined) {
    // process.env로 접근
    // key, defaultValue 중 값이 있다면 value에 삽입
    const value = process.env[key] || defaultValue
    if (value == null) {
        throw new Error(`키 ${key}는 undefined`)
    }
    return value
}

export const config = {
    jwt: {
        secretKey: required("JWT_SECRET"),
        expireseInSec: parseInt(required("JWT_EXPIRES_SEC")) //parseInt: 숫자형으로 변환
    },
    bcrypt: {
        saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 10))
    },
    host: {
        port: parseInt(required("HOST_PORT", 8080))
    },
    db: {
        host: required("DB_HOST")
    }
}