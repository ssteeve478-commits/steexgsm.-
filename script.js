function showPage(pageId) {
    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active");
    });

    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }
}


function toggleMenu() {
    const sidebar = document.querySelector(".sidebar");

    sidebar.classList.toggle("open");
}


function openLogin() {
    document.getElementById("loginModal").style.display = "flex";
}


function openRegister() {
    document.getElementById("registerModal").style.display = "flex";
}


function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}


async function registerUser() {

    const name = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("registerConfirmPassword").value;

    if (name === "" || email === "" || password === "" || confirmPassword === "") {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    if (password.length < 6) {
        alert("Le mot de passe doit contenir au moins 6 caractères.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Les mots de passe ne correspondent pas.");
        return;
    }

    try {

        const response = await fetch("http://localhost:3000/api/register", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        alert(data.message);

        closeModal("registerModal");

        document.getElementById("registerName").value = "";
        document.getElementById("registerEmail").value = "";
        document.getElementById("registerPassword").value = "";
        document.getElementById("registerConfirmPassword").value = "";

    } catch (error) {

        console.error(error);

        alert("Impossible de contacter le serveur.");
    }
}


window.onclick = function(event) {

    const loginModal = document.getElementById("loginModal");
    const registerModal = document.getElementById("registerModal");

    if (event.target === loginModal) {
        loginModal.style.display = "none";
    }

    if (event.target === registerModal) {
        registerModal.style.display = "none";
    }
};