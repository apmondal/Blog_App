import jwt from "jsonwebtoken"
import { User } from "../entities/User";

const SECRET = "this_is_the_most_secret_code";

export async function sign(user: User): Promise<string> {
    return new Promise<string> ((resolve, reject) => {
        jwt.sign({
            username: user.username,
            email: user.email
        }, SECRET, (err: any, encoded: string | undefined) => {
            if(err) return reject(err);

            resolve(encoded as string);
        })
    })
}

export async function decode(token: string): Promise<User> {
    return new Promise<User> ((resolve, reject) => {
        jwt.verify(token, SECRET, (err, decoded: object | undefined) => {
            if(err) return reject(err);

            resolve(decoded as User);
        })
    })
}
