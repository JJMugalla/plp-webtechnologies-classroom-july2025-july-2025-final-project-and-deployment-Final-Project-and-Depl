// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });
    
    // Page navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            
            // Update active navigation link
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            this.classList.add('active');
            
            // Hide all pages
            pages.forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            document.getElementById(pageId).classList.add('active');
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            
            // Scroll to top
            window.scrollTo(0, 0);
        });
    });
    
    // Image slider functionality
    const slides = document.getElementById('slides');
    const prevButton = document.getElementById('prevSlide');
    const nextButton = document.getElementById('nextSlide');
    const sliderControls = document.getElementById('sliderControls');
    const slideCount = document.querySelectorAll('.slide').length;
    let currentSlide = 0;
    let slideInterval;
    
    // Create slider controls
    for (let i = 0; i < slideCount; i++) {
        const button = document.createElement('button');
        if (i === 0) button.classList.add('active');
        button.addEventListener('click', () => {
            goToSlide(i);
            resetSlideInterval();
        });
        sliderControls.appendChild(button);
    }
    
    // Function to go to specific slide
    function goToSlide(n) {
        currentSlide = n;
        slides.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update control buttons
        document.querySelectorAll('#sliderControls button').forEach((btn, idx) => {
            btn.classList.toggle('active', idx === currentSlide);
        });
    }
    
    // Next and previous slide handlers
    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slideCount;
        goToSlide(currentSlide);
        resetSlideInterval();
    });
    
    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        goToSlide(currentSlide);
        resetSlideInterval();
    });
    
    // Auto advance slides
    function startSlideInterval() {
        slideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slideCount;
            goToSlide(currentSlide);
        }, 5000);
    }
    
    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    startSlideInterval();
    
    // Form validation
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Validate name
        const nameInput = document.getElementById('name');
        const nameError = document.getElementById('nameError');
        if (nameInput.value.trim() === '') {
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameError.style.display = 'none';
        }
        
        // Validate email
        const emailInput = document.getElementById('email');
        const emailError = document.getElementById('emailError');
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value)) {
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }
        
        // Validate message
        const messageInput = document.getElementById('message');
        const messageError = document.getElementById('messageError');
        if (messageInput.value.trim() === '') {
            messageError.style.display = 'block';
            isValid = false;
        } else {
            messageError.style.display = 'none';
        }
        
        // If form is valid, show success message
        if (isValid) {
            alert('Form submitted successfully!');
            contactForm.reset();
        }
    });
});