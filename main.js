/* ============================================
   NEVOR Studio — main.js
   ============================================ */

(function () {
    'use strict';

    /* --- Sticky Nav on Scroll --- */
    const nav = document.getElementById('nav');
    if (nav && !nav.classList.contains('nav-solid')) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 60) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    /* --- Mobile Hamburger Menu --- */
    const hamburger = document.getElementById('navHamburger');
    const overlay = document.getElementById('mobileOverlay');

    if (hamburger && overlay) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
        });

        // Close overlay on link click
        const mobileLinks = overlay.querySelectorAll('a');
        mobileLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    /* --- Scroll Fade-In (Intersection Observer) --- */
    const fadeElements = document.querySelectorAll('.fade-in');

    if ('IntersectionObserver' in window && fadeElements.length > 0) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        });

        fadeElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback: show everything
        fadeElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }

    /* --- Simple Case Slider (Menacity) --- */
    const simpleSlider = document.getElementById('caseSimpleSlider');
    if (simpleSlider) {
        const items = Array.from(simpleSlider.querySelectorAll('.case-simple-item'));
        const imageEl = document.getElementById('caseSimpleImage');
        const textAEl = document.getElementById('caseSimpleTextA');
        const textBEl = document.getElementById('caseSimpleTextB');
        const prevBtn = simpleSlider.querySelector('[data-simple-prev]');
        const nextBtn = simpleSlider.querySelector('[data-simple-next]');
        let currentIndex = 0;

        function renderItem() {
            const item = items[currentIndex];
            if (!item || !imageEl || !textAEl || !textBEl) {
                return;
            }

            imageEl.style.opacity = '0.2';
            window.setTimeout(function () {
                imageEl.src = item.getAttribute('data-image') || imageEl.src;
                textAEl.textContent = item.getAttribute('data-text-a') || '';
                textBEl.textContent = item.getAttribute('data-text-b') || '';
                imageEl.style.opacity = '1';
            }, 120);
        }

        function goTo(index) {
            if (items.length === 0) {
                return;
            }
            currentIndex = (index + items.length) % items.length;
            renderItem();
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function () {
                goTo(currentIndex - 1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function () {
                goTo(currentIndex + 1);
            });
        }

        renderItem();
    }

    /* --- Work Page Carousel --- */
    const carouselItems = document.getElementById('carouselItems');
    const carouselPrevBtn = document.getElementById('carouselPrevBtn');
    const carouselNextBtn = document.getElementById('carouselNextBtn');
    const indicators = document.getElementById('carouselIndicators');

    if (carouselItems && carouselPrevBtn && carouselNextBtn && indicators) {
        const cards = Array.from(carouselItems.querySelectorAll('.carousel-card'));
        const indicatorButtons = Array.from(indicators.querySelectorAll('.indicator'));
        let currentIndex = 0;

        function updateCarousel() {
            // Update carousel cards
            cards.forEach(function (card, index) {
                if (index === currentIndex) {
                    card.classList.add('active');
                } else {
                    card.classList.remove('active');
                }
            });

            // Update indicators
            indicatorButtons.forEach(function (btn, index) {
                if (index === currentIndex) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            // Update button states
            carouselPrevBtn.disabled = currentIndex === 0;
            carouselNextBtn.disabled = currentIndex === cards.length - 1;
        }

        function goToSlide(index) {
            if (index >= 0 && index < cards.length) {
                currentIndex = index;
                updateCarousel();
            }
        }

        // Event listeners
        carouselPrevBtn.addEventListener('click', function () {
            if (currentIndex > 0) {
                goToSlide(currentIndex - 1);
            }
        });

        carouselNextBtn.addEventListener('click', function () {
            if (currentIndex < cards.length - 1) {
                goToSlide(currentIndex + 1);
            }
        });

        // Indicator buttons
        indicatorButtons.forEach(function (btn, index) {
            btn.addEventListener('click', function () {
                goToSlide(index);
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft' && currentIndex > 0) {
                goToSlide(currentIndex - 1);
            } else if (e.key === 'ArrowRight' && currentIndex < cards.length - 1) {
                goToSlide(currentIndex + 1);
            }
        });

        // Touch/Swipe detection for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        carouselItems.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        carouselItems.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);

        function handleSwipe() {
            var swipeThreshold = 50; // Minimum distance to trigger swipe
            var diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swiped left, go to next slide
                    if (currentIndex < cards.length - 1) {
                        goToSlide(currentIndex + 1);
                    }
                } else {
                    // Swiped right, go to previous slide
                    if (currentIndex > 0) {
                        goToSlide(currentIndex - 1);
                    }
                }
            }
        }

        // Initialize
        updateCarousel();
    }

})();
