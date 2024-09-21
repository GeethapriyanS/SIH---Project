const forms = document.querySelector(".forms"),
      pwShowHide = document.querySelectorAll(".eye-icon"),
      links = document.querySelectorAll(".link");

pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");

        pwFields.forEach(password => {
            if (password.type === "password") {
                password.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
                return;
            }
            password.type = "password";
            eyeIcon.classList.replace("bx-show", "bx-hide");
        });
    });
});

links.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault(); // Prevent form submit
        forms.classList.toggle("show-signup");
    });
});

// Handle form submission
document.querySelectorAll(".form-content form").forEach(form => {
    form.addEventListener("submit", e => {
        e.preventDefault(); // Prevent actual form submission
        
        // Basic validation
        let email = form.querySelector('input[type="email"]').value;
        let password = form.querySelector('input[type="password"]').value;

        if (email && password) {
            // If email and password are entered, redirect to index.html
            window.location.href = "Ri.html";
        } else {
            alert("Please fill in both fields.");
        }
    });
});
