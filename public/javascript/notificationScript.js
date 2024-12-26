function tabBarActive() {
    document.querySelectorAll(".tab-bar").forEach(image => {
    let imageSrc = image.src;
    let activeImageSrc = imageSrc.replace(".svg", "-active.svg");

    image.onclick = () => {
        image.src = activeImageSrc;
    }
    image.onmouseout = function() {
        this.src = imageSrc;
    }
})
}

function setActiveMode(event) {
    document.querySelectorAll('#wave-nav .nav-link').forEach(link => {
        link.classList.remove('active');
    });

    event.currentTarget.classList.add('active');
}

function followAction(event) {
    let followBtn = event.currentTarget;

    if (followBtn.textContent.trim() === 'Follow back') {
        followBtn.textContent = 'Following';
        followBtn.classList.add('following');
        followBtn.classList.remove('follow');
    } else if (followBtn.textContent.trim() === 'Following') {
        followBtn.textContent = 'Follow back';
        followBtn.classList.add('follow');
        followBtn.classList.remove('following');
    }

    // Xử lý follow/unfollow
}

document.querySelectorAll('.followButton').forEach(button => {
    button.addEventListener('click', followAction);
});


// document.addEventListener('DOMContentLoaded', function () {
//     document.querySelectorAll('.noti').forEach(noti => {
//         noti.addEventListener('click', async (event) => {
//             const notificationId = event.currentTarget.id;
//             const response = await fetch(`/notifications/${notificationId}/mark-as-read`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ isRead: true }),
//             });

//             if (response.ok) {
//                 const notificationElement = event.target.closest('.noti');
//                 if (notificationElement) {
//                     notificationElement.classList.remove('unread');
//                     notificationElement.classList.add('read');
//                 } else {
//                     console.error("Không tìm thấy phần tử thông báo.");
//                 }
//             } else {
//                 console.error("Lỗi khi cập nhật trạng thái IsRead trong cơ sở dữ liệu.");
//             }
//         });
//     });
// });

document.querySelectorAll('.noti').forEach(noti => {
    noti.addEventListener('click', async (event) => {
        const notificationId = event.currentTarget.id;
        const response = await fetch(`/notifications/${notificationId}/mark-as-read`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ isRead: true }),
        });

        if (response.ok) {
            const notificationElement = event.target.closest('.noti');
            if (notificationElement) {
                notificationElement.classList.remove('unread');
                notificationElement.classList.add('read');
            } else {
                console.error("Không tìm thấy phần tử thông báo.");
            }
        } else {
            console.error("Lỗi khi cập nhật trạng thái IsRead trong cơ sở dữ liệu.");
        }
    });
});

document.querySelectorAll('.Delete_noti').forEach(button => {
    button.addEventListener('click', async (event) => {
        event.stopPropagation();
        const notificationId = button.id; // Lấy ID của thông báo từ nút

        try {
            const response = await fetch(`/notifications/${notificationId}/delete`, {
                method: 'DELETE'
            });

            if (response.ok) {
                // Tìm và xóa phần tử thông báo tương ứng trên giao diện
                const notificationElement = document.getElementById(notificationId);
                if (notificationElement) {
                    notificationElement.remove();
                } else {
                    console.error("Không tìm thấy phần tử thông báo để xóa.");
                }
            } else {
                console.error('Lỗi khi xóa thông báo:', await response.text());
            }
        } catch (error) {
            console.error('Lỗi:', error);
        }
    });
});




