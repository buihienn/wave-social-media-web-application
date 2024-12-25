document.addEventListener('DOMContentLoaded', () => {
    let offset = 10; // Số bài đăng đã tải
    const limit = 10; // Số bài đăng mỗi lần tải
    let isLoading = false; // Đang tải dữ liệu hay không

    window.addEventListener('scroll', async () => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        // Kiểm tra nếu đã kéo gần đến cuối trang
        if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
            isLoading = true;
            document.getElementById('loading').style.display = 'block';

            try {
                // Gửi yêu cầu AJAX để lấy thêm bài đăng
                const response = await fetch(`/home?offset=${offset}&limit=${limit}`, {
                    headers: {
                        Accept: 'application/json',
                    },
                });

                const data = await response.json();

                // Kiểm tra container bài đăng
                const postContainer = document.querySelector('.container-post');
                if (!postContainer) {
                    console.error('Error: .container-post not found in DOM');
                    return;
                }

                // Duyệt qua các bài đăng nhận được và thêm vào container
                data.posts.forEach(post => {
                    const postElement = document.createElement('div');
                    postElement.classList.add('post', 'd-flex', 'py-2');
                    postElement.innerHTML = `
                        <!-- Avatar -->
                        <div class="container-avatar px-2">
                            <div class="avatar-container">
                                <img src="${post.user.ProfilePicture}" alt="User Avatar" class="img-fluid avatar">
                            </div>
                        </div>
                        <!-- Main Content -->
                        <div class="container-post-main container-fluid p-0 d-flex flex-column">
                            <div class="container-user d-flex justify-content-between align-items-start mb-2">
                                <div class="container-user-first d-flex flex-column align-items-start">
                                    <div class="username d-flex">
                                        <strong class="me-2">${post.user.Username}</strong>
                                        <img src="/icons/verified.svg" alt="Verified" class="d-flex align-self-center" style="width: 1rem; height: 1rem;">
                                    </div>
                                    <small class="text-muted">${post.timeAgo}</small>
                                </div>
                                <div class="container-user-end d-flex align-items-center">
                                    <button class="followButton follow me-2 mt-1" style="--bs-btn-padding-y: 0.3rem;">Follow</button>
                                    <button class="btn btn-sm">
                                        <img src="/icons/3dots.svg" alt="Verified" class="d-flex align-self-top" style="width: 20px; height: 20px;">
                                    </button>
                                </div>
                            </div>
                            <p class="content-post m-0">${post.Content}</p>
                            <div class="container-post-main-image my-2 d-flex flex-row overflow-auto">
                                <img src="${post.PictureURL}" alt="${post.PostID}" class="img-fluid me-2">
                            </div>
                            <div class="container-reaction d-flex">
                                <div class="container-reaction-wave d-flex align-items-center me-4">
                                    <img src="/icons/surge.svg" alt="Wave Icon" style="width: 20px; height: 20px;" class="me-1">
                                    <small class="text-muted">14K</small>
                                </div>
                                <div class="container-reaction-comment d-flex align-items-center me-4">
                                    <img src="/icons/comment.svg" alt="Comment Icon" style="width: 20px; height: 20px;" class="me-1">
                                    <small class="text-muted">200</small>
                                </div>
                                <div class="container-reaction-copy d-flex align-items-center">
                                    <img src="/icons/copy.svg" alt="Copy Icon" style="width: 20px; height: 20px;">
                                </div>
                            </div>
                        </div>
                    `;
                    postContainer.appendChild(postElement);
                });

                offset += limit; // Cập nhật offset
            } catch (error) {
                console.error('Error loading more posts:', error);
            } finally {
                isLoading = false;
                document.getElementById('loading').style.display = 'none';
            }
        }
    });
});