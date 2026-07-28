// Smooth Scrolling and Interactive Alert on Load
document.addEventListener("DOMContentLoaded", function() {
    console.log("BLACKPINK Fan Hub Loaded Successfully!");

    // Interactive greeting alert on clicking the logo
    const logo = document.querySelector('.logo');
    logo.style.cursor = "pointer";
    logo.addEventListener('click', function() {
        alert("BLACKPINK in your area! 🖤💖");
    });

    // ওয়েবসাইট চালু হওয়ার সাথে সাথে ডেটাবেজ থেকে পোস্টগুলো লোড করার জন্য
    loadPosts();
});

// Supabase Integration Script
const supabaseUrl = 'https://yqbttjgcgyuytdzaierz.supabase.co';
const supabaseKey = 'Sb_publishable_UMVUrSiISAbG9BQX4w4_oQ_xbGW_UFj';

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function sendDataToSupabase() {
    const { data, error } = await supabase
        .from('posts')
        .insert([
            { title: 'Blackpink Fan Hub', content: 'Connected successfully!' }
        ]);

    if (error) {
        console.error('ডেটা পাঠাতে সমস্যা হয়েছে:', error);
    } else {
        console.log('সফলভাবে ডেটা সেভ হয়েছে:', data);
    }
}

// Supabase থেকে পোস্টগুলো এনে ওয়েবসাইটে দেখানোর ফাংশন
async function loadPosts() {
    const container = document.getElementById('postsContainer');
    if (!container) return;

    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('id', { ascending: false }); // নতুন পোস্টগুলো সবার উপরে দেখানোর জন্য

    if (error) {
        console.error('পোস্ট লোড করতে সমস্যা হয়েছে:', error);
        return;
    }

    container.innerHTML = '';

    if (data.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #aaa;">এখনো কোনো পোস্ট করা হয়নি!</p>';
        return;
    }

    data.forEach(post => {
        const postCard = document.createElement('div');
        postCard.style.cssText = "background: #222; padding: 15px; margin-bottom: 15px; border-radius: 8px; border-left: 4px solid #ff69b4; text-align: left;";
        
        postCard.innerHTML = `
            <h3 style="margin: 0 0 10px 0; color: #ff69b4;">${post.title}</h3>
            <p style="margin: 0; color: #ddd; word-break: break-word;">${post.content}</p>
        `;
        
        container.appendChild(postCard);
    });
}

async function handleUserPost() {
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;

    if (!title || !content) {
        alert("দয়া করে টাইটেল এবং লেখা দুটিই দিন!");
        return;
    }

    const { data, error } = await supabase
        .from('posts')
        .insert([{ title: title, content: content }]);

    if (error) {
        console.error('সমস্যা হয়েছে:', error);
        alert('পোস্ট সেভ হয়নি!');
    } else {
        alert('সফলভাবে পোস্ট হয়েছে!');
        document.getElementById('postTitle').value = '';
        document.getElementById('postContent').value = '';
        
        // পোস্ট করার সাথে সাথে পেজ রিফ্রেশ ছাড়াই নতুন পোস্টটি স্ক্রিনে দেখানোর জন্য
        loadPosts();
    }
}
