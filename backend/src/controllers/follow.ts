import { getRepository } from "typeorm";
import { User } from "../entities/User";
import { sanitizeField } from "../utils/security";

// export async function addFollow(followerEmail: string, following: string): Promise<Follow> {
//     try {
//         const followRepo = getRepository(Follow);

//         const followerData = await getRepository(User).findOne(followerEmail);

//         const follower = followerData?.username;

//         if(follower === following) throw new Error("You can't follow yourself!");
        
//         const oldFollow = await followRepo.findOne({where: [{follower, following}]});

//         if(oldFollow) throw new Error("You already follow " + following);

//         const follow = followRepo.save({
//             follower: follower,
//             following: following
//         })

//         return follow;

//     } catch (err) {
//         throw err;
//     }
// }

export async function addFollow(followerEmail: string, following: string): Promise<User> {
    try {
        const userRepo = getRepository(User);

        const followerLink = await userRepo.findOne(followerEmail, {relations: ["following"]});
        const followingLink = await userRepo.findOne({where: [{username: following}], relations: ["follower"]})
        const followerUser = await userRepo.findOne(followerEmail)
        const followingUser = await userRepo.findOne({where: [{username: following}]});

        if(!followingLink || !followingUser) throw new Error("User not exist!");
        if(!followerLink || !followerUser) throw new Error("User does not exist!");

        if(following === followerLink.username) throw new Error("You can't follow yourself!");

        followerLink.following.forEach(user1 => {
            if(following === user1.username) throw new Error("You Already follow " + following + '!');
        })

        followingLink.follower.forEach(user1 => {
            if(followerLink.username === user1.username) throw new Error(followerLink.username + "already followed you!")
        })

        sanitizeField(followerUser);
        sanitizeField(followingUser);

        followerLink.following.push(followingUser);
        followingLink.follower.push(followerUser)

        const followings = await userRepo.save(followerLink);
        const followers = await userRepo.save(followingLink);

        return followings;
    } catch (err) {
        console.log("iuy+++++++++++++++++++++++++++++++++");
        
        throw err;
    }
}

export async function deleteFollow(followerEmail: string, following: string): Promise<User> {
    try {
        const userRepo = getRepository(User);

        const followerLink = await userRepo.findOne(followerEmail, {relations: ["following"]});
        const followingLink = await userRepo.findOne({where: [{username: following}], relations: ["follower"]})
        const followerUser = await userRepo.findOne(followerEmail)
        const followingUser = await userRepo.findOne({where: [{username: following}]});

        if(!followingLink || !followingUser) throw new Error("User not exist!");
        if(!followerLink || !followerUser) throw new Error("You are not able to follow " + following + '!');

        var f = 0;

        followerLink.following.forEach((user1, ind) => {
            sanitizeField(user1);
            if(following === user1.username) followerLink.following.splice(ind, 1), f = 1;
            ;
        })

        followingLink.follower.forEach((user1, ind) => {
            sanitizeField(user1);
            if(followerLink.username === user1.username) followingLink.follower.splice(ind, 1), f = 1;
            ;
        })

        if(!f) throw new Error("You didn't follow " + following + '!');

        const followings = await userRepo.save(followerLink);
        const followers = await userRepo.save(followingLink);

        return followings;
        
    } catch (err) {
        throw err;
    }
}

export async function getFollowers(email: string): Promise<User> {
    try {
        const userRepo = getRepository(User);
        const followerLink = await userRepo.findOne(email, {relations: ["follower"]});

        if(!followerLink?.follower.length) throw new Error("You don't have any follower!");

        return followerLink;
    } catch (err) {
        throw err;
    }
}

export async function getFollowings(email: string): Promise<User> {
    try {
        const userRepo = getRepository(User);
        const followingLink = await userRepo.findOne(email, {relations: ["following"]});

        if(!followingLink?.follower.length) throw new Error("You didn't follow anyone!");

        return followingLink;
    } catch (err) {
        throw err;
    }
}

export async function checkFollower(followingEmail: string, follower: string): Promise<Boolean> {
    try {
        const userRepo = getRepository(User);
        const followerLink = await userRepo.findOne(followingEmail, {relations: ["follower"]});
        const followerEmail = await userRepo.findOne({where: [{username: follower}]});

        const flag =  (followerLink?.follower.find((value) => value.email === followerEmail?.email))? true: false;
        
        return flag;
    } catch (err) {
        throw err;
    }
}
