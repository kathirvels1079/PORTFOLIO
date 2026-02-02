document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        hamburger.classList.toggle('toggle');

        // Animate Links
        links.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });

    // Close mobile menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            hamburger.classList.remove('toggle');
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(13, 13, 13, 0.95)';
            navbar.style.padding = '1rem 0';
        } else {
            navbar.style.background = 'rgba(13, 13, 13, 0.8)';
            navbar.style.padding = '1.5rem 0';
        }
    });

    // Smooth Scroll for Anchor Links (Polyfill-like behavior for better control)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Account for fixed navbar height
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    revealElements.forEach(element => revealObserver.observe(element));

    // Simple Parallax Effect for Hero
    const heroBg = document.querySelector('.hero-bg');
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        if (scrollPosition < 800) {
            heroBg.style.transform = `scale(1.1) translateY(${scrollPosition * 0.5}px)`;
        }
    });

    // EmailJS Contact Form Handler
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Generate a random five digit number for the contact_number variable
            // this.contact_number.value = Math.random() * 100000 | 0;

            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerText;

            submitButton.innerText = 'Sending...';
            submitButton.disabled = true;

            // RED FLAG: Replace these placeholders with your actual EmailJS Service ID and Template ID
            const serviceID = 'service_35wjoko';
            const templateID = 'template_aqyrue8';

            emailjs.sendForm(serviceID, templateID, this)
                .then(function () {
                    alert('Message sent successfully!');
                    contactForm.reset();
                    submitButton.innerText = originalButtonText;
                    submitButton.disabled = false;
                }, function (error) {
                    alert('Failed to send message: ' + JSON.stringify(error));
                    submitButton.innerText = originalButtonText;
                    submitButton.disabled = false;
                });
        });
    }

    // Interactive Card Blob Effect (Box-Only)
    const interactiveCards = document.querySelectorAll(".interactive");

    interactiveCards.forEach(card => {
        const blob = card.querySelector(".blob");

        if (blob) {
            card.addEventListener("mousemove", e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Move blob to cursor position
                blob.style.left = `${x}px`;
                blob.style.top = `${y}px`;
                blob.style.opacity = "0.35"; // Ensure visible on move
            });

            card.addEventListener("mouseleave", () => {
                blob.style.opacity = "0"; // Hide on leave
            });

            card.addEventListener("mouseenter", () => {
                blob.style.opacity = "0.35"; // Show on enter
            });
        }
    });
});
