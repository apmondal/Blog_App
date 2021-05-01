import e from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { sign } from "../utils/jwt";
import { hashPassword, matchPassword } from "../utils/password";
import { sanitizeField } from "../utils/security";

interface UserSignupData {
    name: string
    username: string
    password: string
    email: string
}

interface UserLoginData {
    password: string
    username: string
}

interface UserUpdateData {
    username?: string
    password?: string
    bio?: string
    image?: string
}

export async function createUser(data: UserSignupData): Promise<User> {

    //check if user give data to all the field
    if(!data.email) throw new Error("Email is blank!");
    if(!data.username) throw new Error("Username is blank!");
    if(!data.password) throw new Error("Password is blank!");
    if(!data.name) throw new Error("Name is blank!");

    //check in database if email is already exist
    const repo = getRepository(User);
    const exist = await repo.findOne(data.email);

    if(exist) throw new Error("Email is already exist!");
    
    //create user and send back
    try {
        const user = await getRepository(User).save({
            name: data.name,
            username: data.username,
            email: data.email,
            password: await hashPassword(data.password),
        })

        sanitizeField(user);
        user.token = await sign(user);
    
        return user
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export async function loginUser(data: UserLoginData): Promise<User> {

    //check if user give data to all the field
    if(!data.username) throw new Error("Username is blank!");
    if(!data.password) throw new Error("Password is blank!");

    //check in database if email is present or not
    const repo = getRepository(User);
    const exist = await repo.findOne({where: [{username: data.username}]});
    
    if(!exist) throw new Error("Username does not exist!");

    //check if password matches
    const compare = await matchPassword(exist.password!, data.password);

    if(compare === false) throw new Error("Wrong password!");

    sanitizeField(exist);
    exist.token = await sign(exist);

    return exist;
}

export async function getUserByEmail(email: string): Promise<User> {
    const repo = getRepository(User);
    const user = await repo.findOne(email);

    if(!user) throw new Error("No user with this email id!");

    sanitizeField(user);

    return user;
}

export async function updateUserDetails(data: UserUpdateData, email: string): Promise<User> {
    const repo = getRepository(User);
    const user = await repo.findOne(email);

    if(!user) throw new Error("No user with this email id!");

    if(data.bio) user.bio = data.bio;
    if(data.image) user.image = data.image;
    if(data.username) user.username = data.username;
    if(data.password) user.password = await hashPassword(data.password);

    const updateUser = await repo.save(user);

    sanitizeField(updateUser);

    return updateUser;
}
