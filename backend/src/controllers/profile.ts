import { getRepository } from "typeorm";
import { User } from "../entities/User";

export async function getProfile(username: string): Promise<User> {
    try {
        const user = await getRepository(User).findOne({
            where: [{username: username}]
        });
        console.log(user);
        
        if(!user) throw new Error("User does not exist!");
        

        const profile = new User();

        profile.name = user.name;
        profile.username = user.username;
        profile.email = user.email;
        profile.bio = user.bio;
        profile.image = user.image;

        return profile;
    } catch (err) {
        throw err;
    }
}
