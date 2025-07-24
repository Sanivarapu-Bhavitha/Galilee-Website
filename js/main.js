// Modern JavaScript for Galilee Lake House Website

class GalileeWebsite {
  constructor() {
      this.init();
  }

  init() {
      this.handleLoading();
      this.initNavigation();
      this.initAnimations();
      this.initCarousels();
      this.initGallery();
      this.initBackToTop();
      this.initSmoothScroll();
      this.handleResize();
  }

  // Handle loading screen
  handleLoading() {
      window.addEventListener('load', () => {
          const loadingScreen = document.getElementById('loading-screen');
          if (loadingScreen) {
              setTimeout(() => {
                  loadingScreen.classList.add('hidden');
                  setTimeout(() => {
                      loadingScreen.remove();
                  }, 500);
              }, 1000);
          }
      });
  }

  // Initialize navigation functionality
  initNavigation() {
      const navbar = document.getElementById('mainNav');
      const navLinks = document.querySelectorAll('.nav-link');

      // Handle navbar scroll effect
      this.handleNavbarScroll(navbar);

      // Handle active nav links
      this.handleActiveNavLinks(navLinks);

      // Handle mobile menu
      this.handleMobileMenu();
  }

  handleNavbarScroll(navbar) {
      if (!navbar) return;

      let lastScrollTop = 0;
      
      window.addEventListener('scroll', () => {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          
          // Add/remove scrolled class
          if (scrollTop > 100) {
              navbar.classList.add('scrolled');
          } else {
              navbar.classList.remove('scrolled');
          }

          // Hide/show navbar on scroll (optional)
          if (scrollTop > lastScrollTop && scrollTop > 500) {
              navbar.style.transform = 'translateY(-100%)';
          } else {
              navbar.style.transform = 'translateY(0)';
          }
          
          lastScrollTop = scrollTop;
      });
  }

  handleActiveNavLinks(navLinks) {
      const sections = document.querySelectorAll('section[id]');
      
      window.addEventListener('scroll', () => {
          const scrollPosition = window.scrollY + 200;

          sections.forEach(section => {
              const sectionTop = section.offsetTop;
              const sectionHeight = section.offsetHeight;
              const sectionId = section.getAttribute('id');

              if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                  navLinks.forEach(link => {
                      link.classList.remove('active');
                      if (link.getAttribute('href') === `#${sectionId}`) {
                          link.classList.add('active');
                      }
                  });
              }
          });
      });
  }

  handleMobileMenu() {
      const navbarToggler = document.querySelector('.navbar-toggler');
      const navbarCollapse = document.querySelector('.navbar-collapse');
      const navLinks = document.querySelectorAll('.nav-link');

      // Close mobile menu when nav link is clicked
      navLinks.forEach(link => {
          link.addEventListener('click', () => {
              if (navbarCollapse.classList.contains('show')) {
                  const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                  bsCollapse.hide();
              }
          });
      });
  }

  // Initialize AOS animations
  initAnimations() {
      if (typeof AOS !== 'undefined') {
          AOS.init({
              duration: 1000,
              delay: 100,
              once: true,
              mirror: false,
              easing: 'ease-out-cubic'
          });

          // Refresh AOS on window resize
          window.addEventListener('resize', () => {
              AOS.refresh();
          });
      }
  }

  // Initialize Swiper carousels
  initCarousels() {
      // Features carousel
      if (document.querySelector('.featuresSwiper')) {
          new Swiper('.featuresSwiper', {
              loop: true,
              autoplay: {
                  delay: 5000,
                  disableOnInteraction: false,
              },
              pagination: {
                  el: '.swiper-pagination',
                  clickable: true,
              },
              effect: 'fade',
              fadeEffect: {
                  crossFade: true
              },
              speed: 1000,
          });
      }

      // Attractions carousel
      if (document.querySelector('.attractionsSwiper')) {
          new Swiper('.attractionsSwiper', {
              loop: true,
              autoplay: {
                  delay: 4000,
                  disableOnInteraction: false,
              },
              pagination: {
                  el: '.swiper-pagination',
                  clickable: true,
              },
              navigation: {
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
              },
              breakpoints: {
                  320: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                  },
                  768: {
                      slidesPerView: 2,
                      spaceBetween: 30,
                  },
                  1024: {
                      slidesPerView: 3,
                      spaceBetween: 40,
                  }
              },
              speed: 800,
          });
      }
  }

  // Initialize gallery functionality
  initGallery() {
      const galleryItems = document.querySelectorAll('.gallery-item');
      const galleryModal = document.getElementById('galleryModal');
      const galleryCarousel = document.getElementById('galleryCarousel');

      galleryItems.forEach((item, index) => {
          item.addEventListener('click', () => {
              if (galleryCarousel) {
                  const carousel = new bootstrap.Carousel(galleryCarousel);
                  carousel.to(index);
              }
          });
      });

      // Add keyboard navigation for gallery
      if (galleryModal) {
          galleryModal.addEventListener('keydown', (e) => {
              if (e.key === 'ArrowLeft') {
                  const carousel = bootstrap.Carousel.getInstance(galleryCarousel);
                  if (carousel) carousel.prev();
              } else if (e.key === 'ArrowRight') {
                  const carousel = bootstrap.Carousel.getInstance(galleryCarousel);
                  if (carousel) carousel.next();
              }
          });
      }
  }

  // Initialize back to top button
  initBackToTop() {
      const backToTopBtn = document.getElementById('backToTop');
      
      if (!backToTopBtn) return;

      // Show/hide button based on scroll position
      window.addEventListener('scroll', () => {
          if (window.scrollY > 500) {
              backToTopBtn.classList.add('show');
          } else {
              backToTopBtn.classList.remove('show');
          }
      });

      // Smooth scroll to top
      backToTopBtn.addEventListener('click', (e) => {
          e.preventDefault();
          window.scrollTo({
              top: 0,
              behavior: 'smooth'
          });
      });
  }

  // Initialize smooth scrolling for anchor links
  initSmoothScroll() {
      const anchorLinks = document.querySelectorAll('a[href^="#"]');
      
      anchorLinks.forEach(link => {
          link.addEventListener('click', (e) => {
              const href = link.getAttribute('href');
              const target = document.querySelector(href);
              
              if (target && href !== '#') {
                  e.preventDefault();
                  const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                  
                  window.scrollTo({
                      top: offsetTop,
                      behavior: 'smooth'
                  });
              }
          });
      });
  }

  // Handle window resize events
  handleResize() {
      let resizeTimer;
      
      window.addEventListener('resize', () => {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(() => {
              // Refresh AOS
              if (typeof AOS !== 'undefined') {
                  AOS.refresh();
              }
              
              // Update hero height on mobile
              this.updateHeroHeight();
          }, 250);
      });
  }

  updateHeroHeight() {
      const heroSection = document.querySelector('.hero-section');
      if (heroSection && window.innerWidth <= 768) {
          heroSection.style.minHeight = window.innerHeight + 'px';
      }
  }
}

// Utility functions
const Utils = {
  // Debounce function
  debounce(func, wait, immediate) {
      let timeout;
      return function executedFunction(...args) {
          const later = () => {
              timeout = null;
              if (!immediate) func(...args);
          };
          const callNow = immediate && !timeout;
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
          if (callNow) func(...args);
      };
  },

  // Throttle function
  throttle(func, limit) {
      let inThrottle;
      return function(...args) {
          if (!inThrottle) {
              func.apply(this, args);
              inThrottle = true;
              setTimeout(() => inThrottle = false, limit);
          }
      };
  },

  // Check if element is in viewport
  isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
  },

  // Animate counter
  animateCounter(element, start, end, duration) {
      const range = end - start;
      const minTimer = 50;
      const stepTime = Math.abs(Math.floor(duration / range));
      const timer = stepTime < minTimer ? minTimer : stepTime;
      
      const startTime = new Date().getTime();
      const endTime = startTime + duration;
      
      const run = () => {
          const now = new Date().getTime();
          const remaining = Math.max((endTime - now) / duration, 0);
          const value = Math.round(end - (remaining * range));
          element.textContent = value;
          
          if (value === end) {
              clearInterval(timer);
          }
      };
      
      const timer_id = setInterval(run, timer);
      run();
  }
};

// Performance optimizations
const PerformanceOptimizer = {
  // Lazy load images
  initLazyLoading() {
      if ('IntersectionObserver' in window) {
          const imageObserver = new IntersectionObserver((entries, observer) => {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {
                      const img = entry.target;
                      img.src = img.dataset.src;
                      img.classList.remove('lazy');
                      observer.unobserve(img);
                  }
              });
          });

          const lazyImages = document.querySelectorAll('img[data-src]');
          lazyImages.forEach(img => imageObserver.observe(img));
      }
  },

  // Preload critical resources
  preloadCriticalResources() {
      const criticalImages = [
          'https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1'
      ];

      criticalImages.forEach(src => {
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = src;
          document.head.appendChild(link);
      });
  },

  // Optimize scroll performance
  optimizeScrollPerformance() {
      let ticking = false;

      const updateScrollElements = () => {
          // Update scroll-dependent animations here
          ticking = false;
      };

      const requestScrollUpdate = () => {
          if (!ticking) {
              requestAnimationFrame(updateScrollElements);
              ticking = true;
          }
      };

      window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  }
};

// Analytics and tracking
const Analytics = {
  // Track user interactions
  trackInteraction(event, element) {
      // Add your analytics tracking code here
      console.log(`User interaction: ${event} on ${element}`);
  },

  // Track page views
  trackPageView(page) {
      // Add your analytics tracking code here
      console.log(`Page view: ${page}`);
  },

  // Track scroll depth
  trackScrollDepth() {
      let maxScroll = 0;
      const trackingThresholds = [25, 50, 75, 90, 100];
      const trackedThresholds = new Set();

      window.addEventListener('scroll', Utils.throttle(() => {
          const scrollPercent = Math.round(
              (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
          );

          if (scrollPercent > maxScroll) {
              maxScroll = scrollPercent;
              
              trackingThresholds.forEach(threshold => {
                  if (scrollPercent >= threshold && !trackedThresholds.has(threshold)) {
                      trackedThresholds.add(threshold);
                      this.trackInteraction('scroll', `${threshold}%`);
                  }
              });
          }
      }, 1000));
  }
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize main website functionality
  new GalileeWebsite();
  
  // Initialize performance optimizations
  PerformanceOptimizer.initLazyLoading();
  PerformanceOptimizer.preloadCriticalResources();
  PerformanceOptimizer.optimizeScrollPerformance();
  
  // Initialize analytics
  Analytics.trackPageView('home');
  Analytics.trackScrollDepth();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
      // Pause animations, videos, etc.
      console.log('Page hidden');
  } else {
      // Resume animations, videos, etc.
      console.log('Page visible');
  }
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
          .then(registration => {
              console.log('SW registered: ', registration);
          })
          .catch(registrationError => {
              console.log('SW registration failed: ', registrationError);
          });
  });
}

// Error handling
window.addEventListener('error', (e) => {
  console.error('JavaScript error:', e.error);
  // Add error reporting here
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
  // Add error reporting here
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GalileeWebsite, Utils, PerformanceOptimizer, Analytics };
}