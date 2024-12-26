const followListController = {};

const models = require('../models');

followListController.getFollowers = async (req, res) => {
    res.locals.title = "Wave | Follower List";
    res.locals.fileCSS = "follow-list.css";
    res.locals.layout = "layout";
    res.locals.currentPage = 'profile';
    const userID = req.session.user.id;

    try {
        const followers = await models.Follower.findAll({
            where: { FolloweeID: userID, Status: 'accepted' },
            include: [
                {
                    model: models.User,
                    as: 'follower',
                    attributes: ['Username', 'ProfilePicture', 'Name']
                }
            ]
        });

        res.render('follow-list', { followers, currentUserID: userID, listType: 'followers' });
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
            where: { FollowerID: userID, Status: 'accepted' },
            include: [
                {
                    model: models.User,
                    as: 'followee',
                    attributes: ['Username', 'ProfilePicture', 'Name']
                }
            ]
        });
        console.log(following);

        res.render('follow-list', { following, currentUserID: userID, listType: 'following' });
    } catch (error) {
        console.error('Error fetching following:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = followListController;