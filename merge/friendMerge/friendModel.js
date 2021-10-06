const Friend = require("../../models/friend");
const friendTransform = require("./friendTransform");


const friends = async (friendIds) => {
    try {
        const friends = await Friend.find({
            _id: friendIds
        });

        return friends.map((friend) => {
            return friendTransform.transformFriend(friend);
        });
    } catch (err) {
        throw err;
    }
};
exports.friends = friends;