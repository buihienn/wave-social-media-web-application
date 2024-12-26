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
    const notificationId = req.params.id;
    const notification = await models.Notification.findByPk(notificationId);

    if (!notification) {
        return res.redirect("/noti");
    }
    else {
        notification.IsRead = true;
        await notification.save();

        // Send success response with the updated notification
        return res.status(200).json({ message: 'Notification marked as read', notification });
    }
    
    } catch (error) {
        console.error('Error marking notification as read:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

notiController.deleteNotification = async (req, res) => {
    try {
        const notificationId = req.params.id;
        
        const notification = await models.Notification.findByPk(notificationId);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
  
        await notification.destroy();
  
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        console.error('Error deleting notification:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


module.exports = notiController;