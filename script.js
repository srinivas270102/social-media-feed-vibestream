// Sample data
const posts = [
    {
        id: 1,
        username: "JohnDoe",
        verified: true,
        content: "Just joined SocialApp! Excited to connect with everyone here. #newuser #socialmedia",
        time: "1 hour ago",
        comments: 2,
        likes: 5,
        liked: true,
        avatarColor: "#1DA1F2"
    },
    {
        id: 2,
        username: "JaneSmith",
        verified: false,
        content: "Beautiful day for a walk in the park! 🌳 The flowers are blooming and the birds are singing. #nature #outdoors #spring",
        time: "2 hours ago",
        comments: 3,
        likes: 12,
        liked: true,
        avatarColor: "#17bf63"
    },
    {
        id: 3,
        username: "TechGuru",
        verified: true,
        content: "Just released a new tutorial on JavaScript frameworks. Check it out on my profile! #javascript #webdev #coding",
        time: "1 day ago",
        comments: 8,
        likes: 24,
        liked: false,
        avatarColor: "#e0245e"
    }
];

// DOM elements
const postsContainer = document.getElementById('posts');
const postForm = document.getElementById('post-form');
const postTextarea = document.getElementById('post-textarea');
const postBtn = document.getElementById('post-btn');
const cancelBtn = document.getElementById('cancel-btn');
const homeBtn = document.getElementById('home-btn');
const newPostBtn = document.getElementById('new-post-btn');
const profileBtn = document.getElementById('profile-btn');
const charCount = document.getElementById('char-count');
const settingsBtn = document.getElementById('settings-btn');

// State variables
let isLoading = false;
let currentView = 'home';

// Initialize app
function init() {
    renderPosts();
    setupEventListeners();
    updateActiveNav();
}

// Render all posts
function renderPosts() {
    postsContainer.innerHTML = '';
    
    if (posts.length === 0) {
        postsContainer.innerHTML = `
            <div class="empty-state">
                <i class="far fa-comment-dots"></i>
                <h3>No posts yet</h3>
                <p>Be the first to share something!</p>
            </div>
        `;
        return;
    }
    
    posts.forEach(post => {
        const postElement = createPostElement(post);
        postsContainer.appendChild(postElement);
    });
}

// Create a single post element
function createPostElement(post) {
    const postEl = document.createElement('div');
    postEl.className = 'post fade-in';
    postEl.dataset.id = post.id;
    
    const likeIcon = post.liked ? 'fas fa-heart' : 'far fa-heart';
    const likeColor = post.liked ? 'style="color: #e0245e;"' : '';
    const verifiedBadge = post.verified ? '<i class="fas fa-check-circle verified-badge"></i>' : '';
    
    postEl.innerHTML = `
        <div class="post-header">
            <div class="avatar" style="background-color: ${post.avatarColor}">${post.username.charAt(0)}</div>
            <div class="user-info">
                <div class="username">${post.username} ${verifiedBadge}</div>
                <div class="time">${post.time}</div>
            </div>
        </div>
        <div class="post-content">${formatPostContent(post.content)}</div>
        <div class="post-actions">
            <div class="action comment">
                <i class="far fa-comment"></i> ${post.comments}
            </div>
            <div class="action like">
                <i class="${likeIcon}" ${likeColor}></i> <span class="like-count">${post.likes}</span>
            </div>
            <div class="action share">
                <i class="fas fa-share"></i>
            </div>
        </div>
    `;
    
    return postEl;
}

// Format post content (highlight hashtags and mentions)
function formatPostContent(content) {
    // Highlight hashtags
    content = content.replace(/#(\w+)/g, '<span class="hashtag">#$1</span>');
    // Highlight mentions
    content = content.replace(/@(\w+)/g, '<span class="mention">@$1</span>');
    return content;
}

// Set up event listeners
function setupEventListeners() {
    // New post button
    newPostBtn.addEventListener('click', showPostForm);
    
    // Home button
    homeBtn.addEventListener('click', showHome);
    
    // Profile button
    profileBtn.addEventListener('click', showProfile);
    
    // Cancel button
    cancelBtn.addEventListener('click', hidePostForm);
    
    // Post button
    postBtn.addEventListener('click', createPost);
    
    // Textarea input
    postTextarea.addEventListener('input', handleTextareaInput);
    
    // Settings button
    settingsBtn.addEventListener('click', showSettings);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hidePostForm();
        }
        
        // Ctrl+Enter or Cmd+Enter to post
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && postForm.style.display === 'block') {
            createPost();
        }
    });
}

// Show post form
function showPostForm() {
    postForm.style.display = 'block';
    postTextarea.focus();
    currentView = 'new-post';
    updateActiveNav();
}

// Hide post form
function hidePostForm() {
    postForm.style.display = 'none';
    postTextarea.value = '';
    updateCharCount(280);
    postBtn.disabled = true;
    
    // Return to previous view
    if (currentView === 'new-post') {
        showHome();
    }
}

// Show home view
function showHome() {
    currentView = 'home';
    renderPosts();
    updateActiveNav();
}

// Show profile view
function showProfile() {
    currentView = 'profile';
    postsContainer.innerHTML = `
        <div class="empty-state">
            <i class="fas fa-user-circle"></i>
            <h3>Your Profile</h3>
            <p>Profile page is under construction</p>
        </div>
    `;
    updateActiveNav();
}

// Show settings
function showSettings() {
    alert('Settings will be available in the next update!');
}

// Handle textarea input
function handleTextareaInput() {
    const text = postTextarea.value;
    const remaining = 280 - text.length;
    
    updateCharCount(remaining);
    postBtn.disabled = text.trim() === '';
}

// Update character count display
function updateCharCount(remaining) {
    charCount.textContent = remaining;
    charCount.className = 'char-count';
    
    if (remaining < 0) {
        charCount.classList.add('error');
    } else if (remaining < 20) {
        charCount.classList.add('warning');
    }
}

// Create a new post
function createPost() {
    const content = postTextarea.value.trim();
    if (content === '' || content.length > 280) return;
    
    // Simulate loading
    isLoading = true;
    postBtn.innerHTML = '<span class="spinner"></span> Posting...';
    postBtn.disabled = true;
    
    // Simulate network delay
    setTimeout(() => {
        const newPost = {
            id: Date.now(),
            username: "You",
            verified: false,
            content: content,
            time: "Just now",
            comments: 0,
            likes: 0,
            liked: false,
            avatarColor: getRandomColor()
        };
        
        posts.unshift(newPost);
        hidePostForm();
        renderPosts();
        
        // Add click event to the new post's like button
        const newPostElement = postsContainer.querySelector(`[data-id="${newPost.id}"]`);
        if (newPostElement) {
            const likeBtn = newPostElement.querySelector('.like');
            likeBtn.addEventListener('click', () => toggleLike(newPost.id));
        }
        
        isLoading = false;
        postBtn.innerHTML = 'Post';
        postBtn.disabled = false;
        
        // Show success animation
        const firstPost = postsContainer.firstChild;
        if (firstPost) {
            firstPost.classList.add('pulse');
            setTimeout(() => firstPost.classList.remove('pulse'), 500);
        }
    }, 1000);
}

// Toggle like on a post
function toggleLike(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
    
    // Update the post in the DOM
    const postElement = postsContainer.querySelector(`[data-id="${postId}"]`);
    if (postElement) {
        const likeIcon = postElement.querySelector('.like i');
        const likeCount = postElement.querySelector('.like-count');
        
        likeIcon.className = post.liked ? 'fas fa-heart' : 'far fa-heart';
        likeIcon.style.color = post.liked ? '#e0245e' : '';
        likeCount.textContent = post.likes;
        
        // Add animation
        likeIcon.classList.add('pulse');
        setTimeout(() => likeIcon.classList.remove('pulse'), 500);
    }
}

// Update active navigation button
function updateActiveNav() {
    [homeBtn, newPostBtn, profileBtn].forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (currentView === 'home') homeBtn.classList.add('active');
    else if (currentView === 'new-post') newPostBtn.classList.add('active');
    else if (currentView === 'profile') profileBtn.classList.add('active');
}

// Generate random color for avatar
function getRandomColor() {
    const colors = ['#1DA1F2', '#17bf63', '#e0245e', '#794bc4', '#f45d22', '#ffad1f'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Add event delegation for dynamically added elements
document.addEventListener('click', (e) => {
    // Handle like clicks
    if (e.target.closest('.like')) {
        const postElement = e.target.closest('.post');
        const postId = parseInt(postElement.dataset.id);
        toggleLike(postId);
    }
    
    // Handle comment clicks
    if (e.target.closest('.comment')) {
        alert('Comment feature coming soon!');
    }
    
    // Handle share clicks
    if (e.target.closest('.share')) {
        alert('Share options will be available soon!');
    }
});

// Initialize the app
init();


