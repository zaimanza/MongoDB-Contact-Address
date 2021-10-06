const transformFriend = (friend) => {
    return {
        ...friend._doc,
        _id: friend.id,
    };
};