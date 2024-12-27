const followListController = {};

const models = require('../models');

followListController.getFollowers = async (req, res) => {
    res.locals.title = "Wave | Follower List";
    res.locals.fileCSS = "follow-list.css";
    res.locals.layout = "layout";
    res.locals.currentPage = 'profile';
    const userID = req.session.user?.id;

    try {
        const followers = await models.Follower.findAll({
            where: { FolloweeID: userID },
            include: [
                {
                    model: models.User,
                    as: 'follower',
                    attributes: ['Username', 'ProfilePicture', 'Name', 'UserID'],
                },
            ],
        });

        const followersWithStatus = await Promise.all(
            followers.map(async (follower) => {
                if (!follower.follower) {
                    return null;
                }

                const isFollowing = await models.Follower.findOne({
                    where: { FollowerID: userID, FolloweeID: follower.follower.UserID },
                });

                return {
                    ...follower.toJSON(),
                    follower: {
                        ...follower.follower.toJSON(),
                        UserID: follower.follower.UserID,
                    },
                    isFollowing: !!isFollowing,
                };
            })
        );

        res.render('follow-list', {
            followers: followersWithStatus.filter(Boolean),
            currentUserID: userID,
            listType: 'followers',
        });
    } catch (error) {
        console.error('Error fetching followers:', error);
        res.status(500).send('Internal Server Error');
    }
};


followListController.getFollowing = async (req, res) => {
    res.locals.title = "Wave | Following List";
    res.locals.fileCSS = "follow-list.css";
    res.locals.layout = "layout";
    res.locals.currentPage = 'profile';
    const userID = req.session.user.id;

    try {
        const following = await models.Follower.findAll({
            where: { FollowerID: userID },
            include: [
                {
                    model: models.User,
                    as: 'followee',
                    attributes: ['Username', 'ProfilePicture', 'Name', 'UserID'],
                },
            ],
        });

        res.render('follow-list', {
            following: following.map(f => f.toJSON()),
            currentUserID: userID,
            listType: 'following',
        });
    } catch (error) {
        console.error('Error fetching following:', error);
        res.status(500).send('Internal Server Error');
    }
};


followListController.followUser = async (req, res) => {
    const { userId } = req.params;
    const currentUserId = req.session.user.id;

    try {
        await models.Follower.create({
            FollowerID: currentUserId,
            FolloweeID: userId,
        });
        res.status(200).json({ message: 'Followed successfully' });
    } catch (error) {
        console.error('Error following user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

followListController.unfollowUser = async (req, res) => {
    const { userId } = req.params;
    const currentUserId = req.session.user.id;

    try {
        await models.Follower.destroy({
            where: { FollowerID: currentUserId, FolloweeID: userId },
        });
        res.status(200).json({ message: 'Unfollowed successfully' });
    } catch (error) {
        console.error('Error unfollowing user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = followListController;