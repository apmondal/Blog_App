"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserDetails = exports.getUserByEmail = exports.loginUser = exports.createUser = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
const jwt_1 = require("../utils/jwt");
const password_1 = require("../utils/password");
const security_1 = require("../utils/security");
async function createUser(data) {
    //check if user give data to all the field
    if (!data.email)
        throw new Error("Email is blank!");
    if (!data.username)
        throw new Error("Username is blank!");
    if (!data.password)
        throw new Error("Password is blank!");
    if (!data.name)
        throw new Error("Name is blank!");
    //check in database if email is already exist
    const repo = typeorm_1.getRepository(User_1.User);
    const exist = await repo.findOne(data.email);
    if (exist)
        throw new Error("Email is already exist!");
    //create user and send back
    try {
        const user = await typeorm_1.getRepository(User_1.User).save({
            name: data.name,
            username: data.username,
            email: data.email,
            password: await password_1.hashPassword(data.password),
        });
        security_1.sanitizeField(user);
        user.token = await jwt_1.sign(user);
        return user;
    }
    catch (e) {
        console.log(e);
        throw e;
    }
}
exports.createUser = createUser;
async function loginUser(data) {
    //check if user give data to all the field
    if (!data.username)
        throw new Error("Username is blank!");
    if (!data.password)
        throw new Error("Password is blank!");
    //check in database if email is present or not
    const repo = typeorm_1.getRepository(User_1.User);
    const exist = await repo.findOne({ where: [{ username: data.username }] });
    if (!exist)
        throw new Error("Username does not exist!");
    //check if password matches
    const compare = await password_1.matchPassword(exist.password, data.password);
    if (compare === false)
        throw new Error("Wrong password!");
    security_1.sanitizeField(exist);
    exist.token = await jwt_1.sign(exist);
    return exist;
}
exports.loginUser = loginUser;
async function getUserByEmail(email) {
    const repo = typeorm_1.getRepository(User_1.User);
    const user = await repo.findOne(email);
    if (!user)
        throw new Error("No user with this email id!");
    security_1.sanitizeField(user);
    return user;
}
exports.getUserByEmail = getUserByEmail;
async function updateUserDetails(data, email) {
    const repo = typeorm_1.getRepository(User_1.User);
    const user = await repo.findOne(email);
    if (!user)
        throw new Error("No user with this email id!");
    if (data.name)
        user.name = data.name;
    if (data.bio)
        user.bio = data.bio;
    if (data.image)
        user.image = data.image;
    if (data.username)
        user.username = data.username;
    if (data.password)
        user.password = await password_1.hashPassword(data.password);
    const updateUser = await repo.save(user);
    security_1.sanitizeField(updateUser);
    return updateUser;
}
exports.updateUserDetails = updateUserDetails;
