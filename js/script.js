document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }

    // Scroll Header Styling
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.height = '70px';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
        } else {
            header.style.height = '90px';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
        }
    });

    // Smooth Scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple Gallery Lightbox Placeholder
    // (This is just a placeholder functionality)
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            console.log('Open Lightbox for:', imgSrc);
        });
    });

    // Intersection Observer for reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stagger-container')) {
                    const items = entry.target.querySelectorAll('.reveal');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('active');
                        }, index * 100);
                    });
                } else {
                    entry.target.classList.add('active');
                }
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial setup for reveal elements
    document.querySelectorAll('section').forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    document.querySelectorAll('.grid-3, .gallery-grid, .footer-grid').forEach(el => {
        el.classList.add('stagger-container');
        const children = el.children;
        for (let child of children) {
            child.classList.add('reveal');
        }
        revealObserver.observe(el);
    });

    // Special cases like program blocks or individual cards not in grids
    document.querySelectorAll('.program-block, .quote-box').forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });
});
