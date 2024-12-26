export async function likeAction(event) {
    const button = event.currentTarget;
    const image = button.querySelector('img');
    const likesCountElement = button.querySelector('small');
    const postId = button.getAttribute('data-post-id'); // Lấy PostID từ data-post-id
    const isLiked = button.getAttribute('data-liked') === 'true'; // Lấy trạng thái từ data-liked

    if (!likesCountElement) {
        console.error('Error: likesCountElement not found in DOM');
        return;
    }

    try {
        // Gửi yêu cầu AJAX tới server
        const response = await fetch(`/posts/${postId}/like`, {
            method: isLiked ? 'DELETE' : 'POST', // DELETE nếu bỏ thích, POST nếu thích
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json(); // Dữ liệu trả về từ server

            // Cập nhật giao diện
            button.setAttribute('data-liked', isLiked ? 'false' : 'true'); // Cập nhật trạng thái
            image.src = isLiked ? '/icons/surge.svg' : '/icons/surge-active.svg'; // Đổi biểu tượng
            likesCountElement.textContent = data.likesCount; // Cập nhật số lượt thích
        } else {
            console.error('Error liking post:', response.statusText);
        }
    } catch (error) {
        console.error('Error sending like request:', error);
    }
}