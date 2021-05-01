"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("../entities/User");
async function getProfile(username) {
    try {
        const user = await typeorm_1.getRepository(User_1.User).findOne({
            where: [{ username: username }]
        });
        console.log(user);
        if (!user)
            throw new Error("User does not exist!");
        const profile = new User_1.User();
        profile.username = user.username;
        profile.bio = user.bio;
        profile.image = user.image;
        return profile;
    }
    catch (err) {
        throw err;
    }
}
exports.getProfile = getProfile;
