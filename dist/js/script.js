// AOS Init
AOS.init({
  duration: 1500,
});

// Hamburger menu
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("hamburger-active");
  navMenu.classList.toggle("hidden");
});

// Navbar
window.onscroll = () => {
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;
  const toTop = document.querySelector("#scroll-top");

  if (window.pageYOffset > fixedNav) {
    header.classList.add("navbar-fixed");
    toTop.classList.remove("hidden");
    toTop.classList.add("flex");
  } else {
    header.classList.remove("navbar-fixed");
    toTop.classList.remove("flex");
    toTop.classList.add("hidden");
  }
};

// Contact Form
const form = document.querySelector("#contact-me");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const message = document.querySelector("#message").value;
  const formMessage = document.querySelector("#form-message");

  if (name === "" || email === "" || message === "") {
    formMessage.classList.remove("hidden");
    formMessage.classList.add("alert-error");
    formMessage.classList.add("block");
    formMessage.innerHTML = `
    <h3 class="alert-title">Error!</h3>
    <p class="alert-message">Please fill in all required fields</p>
    `;

    return;
  }

  if (name !== "" && email !== "" && message !== "") {
    // Send email with XHR
    const xhr = new XMLHttpRequest();

    xhr.open("POST", "https://formspree.io/f/mayvzqdk", true);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        formMessage.classList.remove("hidden");
        formMessage.classList.add("alert-success");
        formMessage.classList.add("block");
        formMessage.innerHTML = `
        <h3 class="alert-title">Message sent!</h3>
        <p class="alert-message">Thank you for contacting me, I will get back to you as soon as possible.</p>
        `;

        form.reset();
      } else {
        formMessage.classList.remove("hidden");
        formMessage.classList.add("alert-error");
        formMessage.classList.add("block");
        formMessage.innerHTML = `
        <h3 class="alert-title">Error!</h3>
        <p class="alert-message">There was an error sending your message, please try again later.</p>
        `;
      }
    };

    xhr.send(
      JSON.stringify({
        name,
        email,
        message,
      })
    );
  }
});

window.addEventListener("click", (e) => {
  if (e.target != hamburger && e.target != navMenu) {
    hamburger.classList.remove("hamburger-active");
    navMenu.classList.add("hidden");
  }
});

// Theme toggler
const themeToggler = document.querySelector("input#toggle-dark");
const html = document.querySelector("html");

themeToggler.addEventListener("click", () => {
  if (themeToggler.checked) {
    html.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    html.classList.remove("dark");
    localStorage.theme = "light";
  }
});

if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  themeToggler.checked = true;
} else {
  themeToggler.checked = false;
}
