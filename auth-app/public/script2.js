// Toggle between Login and Signup forms
document.querySelector(".signup-link").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".forms").classList.add("show-signup");
});

document.querySelector(".login-link").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".forms").classList.remove("show-signup");
});

// Handle form submission
document.querySelectorAll(".form-content form").forEach(form => {
    form.addEventListener("submit", async e => {
        e.preventDefault(); // Prevent actual form submission

        const email = form.querySelector('input[type="email"]').value;
        const password = form.querySelectorAll('input[type="password"]')[0].value;
        const username = form.querySelector('input[type="text"]')?.value; // Get username if present

        // Check if all required fields are filled
        if (email && password/* && (form.closest('.signup') ? username : true)*/) {
            const endpoint = form.closest('.signup')
                ? 'http://localhost:5000/api/auth/signup'  // Signup endpoint
                : 'http://localhost:5000/api/auth/login';   // Login endpoint
            try {
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password, username })
                });

                const data = await response.json();
                if (response.ok) {
                    // Store token and redirect to homepage
                    localStorage.setItem('token', data.token);
                    window.location.href = "index.html";
                } else {
                    alert(data.msg);
                }
            } catch (error) {
                console.error('Error:', error);
                alert("An error occurred. Please try again.");
            }
        } else {
            alert("Please fill in all required fields.");
        }
    });
});

// Handle "Forgot Password" link
document.querySelector(".forgot-password-link").addEventListener("click", (e) => {
    e.preventDefault();
    alert("Password reset functionality is not implemented yet.");
});

// Password visibility toggle
document.querySelectorAll(".toggle-password").forEach(toggleIcon => {
    toggleIcon.addEventListener("click", () => {
        const passwordInput = toggleIcon.previousElementSibling;
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            toggleIcon.textContent = "Hide";
        } else {
            passwordInput.type = "password";
            toggleIcon.textContent = "Show";
        }
    });
});
