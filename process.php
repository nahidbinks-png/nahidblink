<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($_POST['message']));

    if (!empty($name) && !empty($email) && !empty($message)) {
        // You can save this data to a database or send an email
        echo "<script>
                alert('Thank you, $name! Your message has been received.');
                window.location.href='index.html';
              </script>";
    } else {
        echo "<script>
                alert('Please fill in all fields correctly.');
                window.history.back();
              </script>";
    }
} else {
    header("Location: index.html");
    exit();
}
?>

