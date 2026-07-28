// Smooth Scrolling and Interactive Alert on Load
document.addEventListener("DOMContentLoaded", function() {
    console.log("BLACKPINK Fan Hub Loaded Successfully!");

    // Interactive greeting alert on clicking the logo
    const logo = document.querySelector('.logo');
    logo.style.cursor = "pointer";
    logo.addEventListener('click', function() {
        alert("BLACKPINK in your area! 🖤💖");
    });
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

// sendDataToSupabase();
