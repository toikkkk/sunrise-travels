document.addEventListener('DOMContentLoaded', () => {
    // Image Carousel
    const track = document.getElementById('carousel-track');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    let currentIdx = 0;
    
    if (track && nextBtn && prevBtn) {
        const updateCarousel = () => {
            track.style.transform = `translateX(-${currentIdx * 100}%)`;
        };

        // Auto slide cycle (5 seconds)
        let autoSlideInterval;
        
        const startAutoSlide = () => {
            stopAutoSlide();
            autoSlideInterval = setInterval(() => {
                if (nextBtn) {
                    // Trigger click programmatically, but bypass reset recursion
                    const slides = track.children.length;
                    if (currentIdx < slides - 1) {
                        currentIdx++;
                    } else {
                        currentIdx = 0;
                    }
                    updateCarousel();
                }
            }, 5000);
        };

        const stopAutoSlide = () => {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
            }
        };

        nextBtn.addEventListener('click', () => {
            const slides = track.children.length;
            if (currentIdx < slides - 1) {
                currentIdx++;
                updateCarousel();
            } else {
                currentIdx = 0; // Reset to start
                updateCarousel();
            }
            startAutoSlide(); // Reset auto timer
        });

        prevBtn.addEventListener('click', () => {
            if (currentIdx > 0) {
                currentIdx--;
                updateCarousel();
            } else {
                currentIdx = track.children.length - 1; // Go to end
                updateCarousel();
            }
            startAutoSlide(); // Reset auto timer
        });

        // Start auto slider on load
        startAutoSlide();
    }

    // Mobile Menu Drawer Logic
    const openMenuBtn = document.getElementById('open-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
    const mobileMenuPanel = document.getElementById('mobile-menu-panel');

    const openMobileMenu = () => {
        mobileMenu.classList.remove('hidden');
        // Force reflow for transitions
        mobileMenu.offsetHeight;
        mobileMenuBackdrop.classList.remove('opacity-0');
        mobileMenuBackdrop.classList.add('opacity-100');
        mobileMenuPanel.classList.remove('translate-x-full');
        mobileMenuPanel.classList.add('translate-x-0');
        document.body.style.overflow = 'hidden';
    };

    const closeMobileMenu = () => {
        mobileMenuBackdrop.classList.remove('opacity-100');
        mobileMenuBackdrop.classList.add('opacity-0');
        mobileMenuPanel.classList.remove('translate-x-0');
        mobileMenuPanel.classList.add('translate-x-full');
        document.body.style.overflow = '';
        setTimeout(() => {
            mobileMenu.classList.add('hidden');
        }, 300); // Wait for transition duration
    };

    if (openMenuBtn) openMenuBtn.addEventListener('click', openMobileMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMobileMenu);
    if (mobileMenuBackdrop) mobileMenuBackdrop.addEventListener('click', closeMobileMenu);

    // Custom Toast Notification System
    const errorToast = document.getElementById('error-toast');
    const errorToastMsg = document.getElementById('error-toast-message');
    const closeToastBtn = document.getElementById('close-toast-btn');
    let toastTimeout;

    const showToast = (message) => {
        if (!errorToast || !errorToastMsg) return;
        
        errorToastMsg.textContent = message;
        clearTimeout(toastTimeout);

        // Slide down and fade in
        errorToast.classList.remove('-translate-y-24', 'opacity-0', 'pointer-events-none');
        errorToast.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');

        toastTimeout = setTimeout(() => {
            hideToast();
        }, 4000);
    };

    const hideToast = () => {
        if (!errorToast) return;
        errorToast.classList.add('-translate-y-24', 'opacity-0', 'pointer-events-none');
        errorToast.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
    };

    if (closeToastBtn) {
        closeToastBtn.addEventListener('click', hideToast);
    }

    // Dynamic Booking via WhatsApp Modal Logic
    const selectRoute = document.getElementById('booking-route-select');
    const selectPassengers = document.getElementById('booking-passengers-select');
    const inputDate = document.getElementById('booking-date-input');
    const searchBtn = document.getElementById('search-schedules-btn');

    // Pre-fill date picker with today's date automatically on page load to prevent empty field on mobile
    if (inputDate) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        const todayStr = `${yyyy}-${mm}-${dd}`;
        inputDate.value = todayStr;
        inputDate.min = todayStr; // Prevent booking past dates
    }

    const bookingModal = document.getElementById('booking-modal');
    const closeBookingModalBtn = document.getElementById('close-booking-modal');
    const modalBookingForm = document.getElementById('modal-booking-form');

    const openBookingModal = () => {
        if (!inputDate || !inputDate.value) {
            showToast('Silakan pilih tanggal keberangkatan terlebih dahulu.');
            return;
        }
        
        bookingModal.classList.remove('hidden');
        // Trigger smooth fade and zoom transition
        setTimeout(() => {
            bookingModal.classList.remove('opacity-0');
            bookingModal.querySelector('div').classList.remove('scale-95');
            bookingModal.querySelector('div').classList.add('scale-100');
        }, 10);
    };

    const closeBookingModal = () => {
        bookingModal.classList.add('opacity-0');
        bookingModal.querySelector('div').classList.remove('scale-100');
        bookingModal.querySelector('div').classList.add('scale-95');
        setTimeout(() => {
            bookingModal.classList.add('hidden');
        }, 300);
    };

    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openBookingModal();
        });
    }

    if (closeBookingModalBtn) {
        closeBookingModalBtn.addEventListener('click', closeBookingModal);
    }

    // Dismiss modal on clicking backdrop
    if (bookingModal) {
        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                closeBookingModal();
            }
        });
    }

    if (modalBookingForm) {
        modalBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const routeText = selectRoute ? selectRoute.options[selectRoute.selectedIndex].text : '';
            const passengersText = selectPassengers ? selectPassengers.value : '1 Orang';
            const dateValue = inputDate ? inputDate.value : '';

            const nameVal = document.getElementById('modal-name-input').value;
            const pickupVal = document.getElementById('modal-pickup-input').value;
            const destinationVal = document.getElementById('modal-destination-input').value;

            // Formatted Date (Indonesian Locale)
            let formattedDate = dateValue;
            try {
                const dateObj = new Date(dateValue);
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                formattedDate = dateObj.toLocaleDateString('id-ID', options);
            } catch (err) {}

            const message = `Halo Sunrise Travels, saya ingin memesan tiket shuttle:

📝 *Detail Pemesanan:*
• Nama: ${nameVal}
• Rute: ${routeText}
• Tanggal: ${formattedDate}
• Penumpang: ${passengersText}
• Penjemputan: ${pickupVal}
• Tujuan: ${destinationVal}

Mohon diproses untuk ketersediaan kursi. Terima kasih!`;

            const whatsappUrl = `https://wa.me/6289630550000?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
            
            // Reset form and close
            modalBookingForm.reset();
            closeBookingModal();
        });
    }

    // Header scroll background behavior
    const header = document.querySelector('header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    // Velocity scroll skew spring animation on cards (Desktop only for light performance on mobile)
    let lastScrollTop = 0;
    let velocity = 0;
    let scrollTimeout;
    const velocityCards = document.querySelectorAll('.lift-card, .zoom-img-container');

    const applyVelocitySkew = (scrolled) => {
        if (window.innerWidth < 768) return;
        
        velocity = scrolled - lastScrollTop;
        lastScrollTop = scrolled <= 0 ? 0 : scrolled;
        
        // Clamp skew angle between -3.5deg and 3.5deg
        const skew = Math.min(Math.max(velocity * 0.03, -3.5), 3.5);
        
        velocityCards.forEach(card => {
            card.style.transform = `skewY(${skew}deg)`;
            card.style.transition = 'transform 0.08s ease';
        });
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            velocityCards.forEach(card => {
                card.style.transform = 'skewY(0deg)';
                card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
            });
        }, 120);
    };

    // Scroll-reactive image parallax inside cards (Desktop only for light performance on mobile)
    const parallaxImages = document.querySelectorAll('.dest-img-parallax');
    const applyImageParallax = () => {
        if (window.innerWidth < 768) {
            parallaxImages.forEach(img => {
                img.style.transform = 'none';
            });
            return;
        }
        
        const viewportHeight = window.innerHeight;
        parallaxImages.forEach(img => {
            const rect = img.parentElement.getBoundingClientRect();
            const cardTop = rect.top;
            const cardHeight = rect.height;
            
            if (cardTop + cardHeight > 0 && cardTop < viewportHeight) {
                const scrollPercent = (cardTop + cardHeight) / (viewportHeight + cardHeight);
                const yTranslation = (scrollPercent - 0.5) * 36; // Range of motion roughly -18px to 18px
                img.style.transform = `translate3d(0, ${yTranslation}px, 0)`;
            }
        });
    };

    // Initialize Lenis smooth inertia scroll with fallback
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: false
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Synchronize scroll events
        lenis.on('scroll', () => {
            handleScroll();
            const scrolled = window.scrollY;
            applyVelocitySkew(scrolled);
            applyImageParallax();
            
            // Parallax velocity scroll on Hero background (Desktop only)
            const heroBg = document.querySelector('.hero-bg');
            if (heroBg) {
                if (window.innerWidth >= 768) {
                    heroBg.style.transform = `translate3d(0, ${scrolled * 0.35}px, 0)`;
                } else {
                    heroBg.style.transform = 'none';
                }
            }
        });
    } else {
        window.addEventListener('scroll', () => {
            handleScroll();
            const scrolled = window.scrollY;
            applyVelocitySkew(scrolled);
            applyImageParallax();
            
            const heroBg = document.querySelector('.hero-bg');
            if (heroBg) {
                if (window.innerWidth >= 768) {
                    heroBg.style.transform = `translate3d(0, ${scrolled * 0.35}px, 0)`;
                } else {
                    heroBg.style.transform = 'none';
                }
            }
        });
    }
    handleScroll(); // Initial check on load
    applyImageParallax(); // Initial positioning on load

    // IntersectionObserver scroll reveal for cards and sections
    if ('IntersectionObserver' in window) {
        const revealOptions = {
            root: null,
            rootMargin: '0px 0px -80px 0px', // Trigger slightly before coming fully into view
            threshold: 0.05
        };
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);

        document.querySelectorAll('.lift-card, .zoom-img-container, .scroll-reveal').forEach(el => {
            if (!el.classList.contains('scroll-reveal')) {
                el.classList.add('reveal-card');
            }
            revealObserver.observe(el);
        });
    } else {
        document.querySelectorAll('.lift-card, .zoom-img-container, .scroll-reveal').forEach(el => {
            el.classList.add('active');
        });
    }

    // Circular View Transition Theme Toggler (Vanilla JS implementation of React AnimatedThemeToggler)
    const themeBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-toggle-icon');
    let isThemeTransitioning = false;

    // Check system preference or localStorage on mount
    if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        if (themeIcon) themeIcon.textContent = 'light_mode';
    } else {
        document.documentElement.classList.remove('dark');
        if (themeIcon) themeIcon.textContent = 'dark_mode';
    }

    if (themeBtn && themeIcon) {
        themeBtn.addEventListener('click', async () => {
            if (isThemeTransitioning) return;
            isThemeTransitioning = true;

            const isDark = document.documentElement.classList.contains('dark');
            const nextTheme = isDark ? 'light' : 'dark';

            const toggleTheme = () => {
                if (nextTheme === 'dark') {
                    document.documentElement.classList.add('dark');
                    themeIcon.textContent = 'light_mode';
                    localStorage.setItem('theme', 'dark');
                } else {
                    document.documentElement.classList.remove('dark');
                    themeIcon.textContent = 'dark_mode';
                    localStorage.setItem('theme', 'light');
                }
            };

            // Browser supports the View Transitions API
            if (document.startViewTransition) {
                try {
                    const transition = document.startViewTransition(() => {
                        toggleTheme();
                    });

                    await transition.ready;

                    const rect = themeBtn.getBoundingClientRect();
                    const centerX = rect.left + rect.width / 2;
                    const centerY = rect.top + rect.height / 2;
                    const maxDistance = Math.hypot(
                        Math.max(centerX, window.innerWidth - centerX),
                        Math.max(centerY, window.innerHeight - centerY)
                    );

                    document.documentElement.animate(
                        {
                            clipPath: [
                                `circle(0px at ${centerX}px ${centerY}px)`,
                                `circle(${maxDistance}px at ${centerX}px ${centerY}px)`,
                            ],
                        },
                        {
                            duration: 700,
                            easing: 'ease-in-out',
                            pseudoElement: '::view-transition-new(root)',
                        }
                    );
                } catch (e) {
                    toggleTheme();
                } finally {
                    isThemeTransitioning = false;
                }
            } else {
                // Fallback for browsers that don't support View Transitions API
                toggleTheme();
                isThemeTransitioning = false;
            }
        });
    }
});
