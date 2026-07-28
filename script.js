// Smooth Scrolling and Interactive Alert on Load
document.addEventListener("DOMContentLoaded", function() {
    console.log("BLACKPINK Fan Hub Loaded Successfully!");

    // Interactive greeting alert on clicking the logo
    const logo = document.querySelector('.logo');
    logo.style.cursor = "pointer";
    logo.addEventListener('click', function() {
        alert("BLACKPINK in your area! 🖤💖");
    });

    // পেজ ওপেন হওয়ার সাথে সাথে সেভ করা পোস্টগুলো স্ক্রিনে নিয়ে আসা
    loadPosts();
});

// ফেসবুক স্টাইলে পোস্ট লোড করার ফাংশন
function loadPosts() {
    const container = document.getElementById('postsContainer');
    if (!container) return;

    // ব্রাউজার থেকে পোস্টগুলো ফেচ করা
    let posts = JSON.parse(localStorage.getItem('bp_posts')) || [];

    container.innerHTML = '';

    if (posts.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #aaa;">এখনো কোনো পোস্ট করা হয়নি। প্রথম পোস্ট আপনিই করুন!</p>';
        return;
    }

    posts.forEach((post, index) => {
        const postCard = document.createElement('div');
        postCard.style.cssText = "background: #1e1e1e; padding: 20px; margin-bottom: 20px; border-radius: 10px; border-left: 5px solid #ff69b4; box-shadow: 0 4px 8px rgba(0,0,0,0.2);";
        
        postCard.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <h3 style="margin: 0; color: #ff69b4; font-size: 18px;">${post.title}</h3>
                <span style="font-size: 12px; color: #888;">${post.time}</span>
            </div>
            <p style="margin: 0 0 15px 0; color: #ddd; word-break: break-word; line-height: 1.5;">${post.content}</p>
            <div style="text-align: right;">
                <button onclick="deletePost(${index})" style="background: transparent; border: 1px solid #ff4444; color: #ff4444; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">ডিলিট</button>
            </div>
        `;
        
        container.appendChild(postCard);
    });
}

// নতুন পোস্ট করার ফাংশন (ফেসবুকের মতো সাথে সাথে স্ক্রিনে দেখাবে)
function handleUserPost() {
    const titleInput = document.getElementById('postTitle');
    const contentInput = document.getElementById('postContent');
    
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title || !content) {
        alert("দয়া করে টাইটেল এবং লেখা দুটিই পূরণ করুন!");
        return;
    }

    // বর্তমান সময় বের করার কোড
    const now = new Date();
    const timeString = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newPost = {
        title: title,
        content: content,
        time: timeString
    };

    // আগের পোস্টগুলোর সাথে নতুন পোস্টটি যোগ করা
    let posts = JSON.parse(localStorage.getItem('bp_posts')) || [];
    posts.unshift(newPost); // নতুন পোস্ট সবার উপরে দেখানোর জন্য unshift ব্যবহার করা হয়েছে

    // ব্রাউজারে সেভ করে রাখা
    localStorage.setItem('bp_posts', JSON.stringify(posts));

    // ফর্ম ক্লিয়ার করা
    titleInput.value = '';
    contentInput.value = '';

    // সাথে সাথে স্ক্রিন রিফ্রেশ করে পোস্টগুলো সামনে নিয়ে আসা
    loadPosts();
}

// পোস্ট ডিলিট করার ফাংশন
function deletePost(index) {
    let posts = JSON.parse(localStorage.getItem('bp_posts')) || [];
    posts.splice(index, 1);
    localStorage.setItem('bp_posts', JSON.stringify(posts));
    loadPosts();
}
