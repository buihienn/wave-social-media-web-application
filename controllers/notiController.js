const notiController = {};
const models = require("../models");


notiController.noti = (req, res) => {
    res.locals.title = "Wave | Notification";
    res.locals.fileCSS = "notification.css";
    res.locals.layout = "layout";
    res.locals.currentPage = 'noti';
    

    res.render('notification');
}

notiController.notiFetch = async (req, res) => {
    try {
        // Lấy thông tin user từ session
        const userId = req.session.user.id;
        console.log(userId);
        // Lấy danh sách notifications liên quan đến người dùng
        const notifications = await models.Notification.findAll({
            where: { UserID: userId },
            include: [
                {
                    model: models.User,
                    as: 'user',
                    attributes: ['Username', 'ProfilePicture'], // Chỉ lấy các trường cần thiết
                },
                {
                    model: models.User,
                    as: 'actionUser',
                    attributes: ['Username', 'ProfilePicture'], // Thông tin người thực hiện hành động
                }
            ]
        });
        res.render('notification', {
            notifications: notifications,
            title: 'Wave | Notifications',
            fileCSS: 'notification.css',
            layout: 'layout',
            currentPage: 'noti' 
        });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).send('Internal server error');
    }
};

notiController.markAsRead = async (req, res) => {
    try {
        const notificationId = req.params.id; // Lấy ID thông báo từ URL
        console.log(notificationId);
        console.log(notificationId);
        const notification = await models.Notification.findByPk(notificationId); 

        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        
        notification.IsRead = true;
        await notification.save();

        return res.status(200).json({ message: 'Notification marked as read', notification });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};


module.exports = notiController;