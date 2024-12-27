const postController = {};
const models = require('../models');
const moment = require('moment');

postController.getPostDetails = async (req, res) => {
    const { postId } = req.params;
    res.locals.fileCSS = "post.css";
    res.locals.layout = "layout";

    // Lấy UserID từ session
    const userID = req.session.user.id;

    try {
        const post = await models.Post.findOne({
            where: { PostID: postId },
            include: [
                {
                    model: models.User,
                    as: 'user',
                    attributes: ['Username', 'ProfilePicture', 'UserID'],
                },
                {
                    model: models.Comment,
                    as: 'comments',
                    include: {
                        model: models.User,
                        as: 'user',
                        attributes: ['Username', 'ProfilePicture'], 
                    },
                },
                {
                    model: models.Like,
                    as: 'likes',
                    attributes: ['UserID'],
                },
            ],
        });
        

        if (!post) {
            return res.status(404).render('404', { message: 'Post not found' });
        }

        // Chuẩn bị dữ liệu cho view
        const postData = {
            postID: post.PostID,
            content: post.Content,
            timeAgo: formatTimeAgo(post.createdAt),
            image: post.PictureURL ? (post.PictureURL.startsWith('/') ? post.PictureURL : `/${post.PictureURL}`) : null,
            user: {
                id: post.user.UserID,
                username: post.user.Username,
                avatar: post.user.ProfilePicture.startsWith('/') ? post.user.ProfilePicture : `/${post.user.ProfilePicture}`,
            },
            comments: post.comments.map(comment => ({
                content: comment.Content,
                timeAgo: formatTimeAgo(comment.createdAt),
                user: {
                    username: comment.user?.Username || 'Unknown',
                    avatar: comment.user?.ProfilePicture.startsWith('/')
                        ? comment.user.ProfilePicture
                        : `/${comment.user.ProfilePicture}`,
                },
            })),
            likesCount: post.likes.length, 
            liked: post.likes.some(like => like.UserID === userID), 
            currentUserID: userID,
        };

        // Kiểm tra xem người dùng hiện tại có đang theo dõi người đăng bài không
        const isFollowing = await models.Follower.findOne({
            where: {
                FollowerID: userID,
                FolloweeID: post.user.UserID,
            },
        });

        postData.isFollowing = !!isFollowing; 

        // Render view với dữ liệu
        res.render('post', {
            title: `Post by ${post.user.Username}`,
            post: postData,
        });
    } catch (error) {
        console.error('Error fetching post details:', error);
        res.status(500).render('500', { message: 'Server error' });
    }
};

postController.likePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.session.user.id;

    try {
        // Kiểm tra xem người dùng đã thích bài đăng chưa
        const existingLike = await models.Like.findOne({ where: { PostID: postId, UserID: userId } });

        if (existingLike) {
            return res.status(400).json({ message: 'Already liked' });
        }

        // Thêm lượt thích
        await models.Like.create({ PostID: postId, UserID: userId });

        // Đếm lại số lượt thích
        const likesCount = await models.Like.count({ where: { PostID: postId } });

        res.json({ likesCount });
    } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

postController.unlikePost = async (req, res) => {
    const { postId } = req.params;
    const userId = req.session.user.id;

    try {
        // Xóa lượt thích
        await models.Like.destroy({ where: { PostID: postId, UserID: userId } });

        // Đếm lại số lượt thích
        const likesCount = await models.Like.count({ where: { PostID: postId } });

        res.json({ likesCount });
    } catch (error) {
        console.error('Error unliking post:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

postController.addComment = async (req, res) => {
    const postID = req.params.postID;
    const { comment } = req.body;
    const userID = req.session.user.id;

    try {
        // Thêm comment vào cơ sở dữ liệu
        const newComment = await models.Comment.create({
            Content: comment,
            UserID: userID,
            PostID: postID,
        });

        // Lấy thông tin user hiện tại
        const user = await models.User.findByPk(userID, {
            attributes: ['Username', 'ProfilePicture']
        });

        res.json({ 
            success: true, 
            comment: newComment,
            user: {
                username: user.Username,
                avatar: user.ProfilePicture.startsWith('/') ? user.ProfilePicture : `/${user.ProfilePicture}`
            }
            });
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ success: false, message: 'Error adding comment' });
    }
};

module.exports = postController;

function formatTimeAgo(createdAt) {
    return moment(createdAt).fromNow(); // Tự động trả về: "6 minutes ago", "2 days ago", ...
}