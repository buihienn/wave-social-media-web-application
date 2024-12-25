const postController = {};
const models = require('../models');
const moment = require('moment');

postController.getPostDetails = async (req, res) => {
    const { postId } = req.params;
    res.locals.fileCSS = "post.css";
    res.locals.layout = "layout";

    try {
        const post = await models.Post.findOne({
            where: { PostID: postId },
            include: [
                { model: models.User, as: 'user' }, 
                { model: models.Comment, as: 'comments', include: { model: models.User, as: 'user' } }, 
                { model: models.Like, as: 'likes' },
            ],
        });

        if (!post) {
            return res.status(404).render('404', { message: 'Post not found' });
        }

        // Chuẩn bị dữ liệu cho view
        const postData = {
            content: post.Content,
            timeAgo: formatTimeAgo(post.createdAt),
            image: post.PictureURL.startsWith('/')
                ? post.PictureURL
                : `/${post.PictureURL}`, // Thêm "/" nếu chưa có
            user: {
                username: post.user.Username,
                avatar: post.user.ProfilePicture.startsWith('/')
                    ? post.user.ProfilePicture
                    : `/${post.user.ProfilePicture}`,
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
        };

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

module.exports = postController;

function formatTimeAgo(createdAt) {
    return moment(createdAt).fromNow(); // Tự động trả về: "6 minutes ago", "2 days ago", ...
}