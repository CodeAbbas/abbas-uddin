// ALL ANIMATIONS AND INITIALIZATIONS
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('wave-canvas');
  const ctx = canvas.getContext('2d');

  let width, height;
  let waves = [];

  // Configuration
  const config = {
    waveCount: 3,
    // The color gradient: transparent -> cyan -> transparent
    colorStart: 'rgba(3, 218, 198, 0)',
    colorMid: 'rgba(3, 218, 198, 0.15)', // Very light opacity (15%)
    colorEnd: 'rgba(3, 218, 198, 0)',
    speed: 0.005,
    amplitude: 50, // Height of the wave peaks
    frequency: 0.01 // How tight the waves are
  };

  function init() {
    resize();
    window.addEventListener('resize', resize);
    createWaves();
    animate();
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createWaves() {
    waves = [];
    for (let i = 0; i < config.waveCount; i++) {
      waves.push({
        y: height / 2, // Center the wave vertically
        length: 0.01 + i * 0.002, // Different wavelengths
        amplitude: config.amplitude + i * 20, // Different heights
        speed: config.speed + i * 0.002, // Different speeds
        offset: Math.random() * 100 // Random starting position
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Create the gradient fill
    // Runs vertically from top to bottom of the canvas
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, config.colorStart);
    gradient.addColorStop(0.5, config.colorMid); // Brightest in the middle
    gradient.addColorStop(1, config.colorEnd);

    ctx.fillStyle = gradient;

    // Draw each wave
    waves.forEach((wave) => {
      ctx.beginPath();
      ctx.moveTo(0, height / 2);

      // Generate the wave points
      for (let x = 0; x < width; x++) {
        // Sine wave formula: y = A * sin(B * x + C)
        const y = wave.y + Math.sin(x * wave.length + wave.offset) * wave.amplitude;
        ctx.lineTo(x, y);
      }

      // Close the path to fill it
      // Draw down to bottom-right, then bottom-left, then close
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();

      // Move the wave for next frame
      wave.offset += wave.speed;
    });

    requestAnimationFrame(animate);
  }

  // Start
  init();

  // PROJECT CARD ANIMATIONS
  const projectCards = document.querySelectorAll('.project-card');
  const techTags = document.querySelectorAll('.tech-tag');

  // Reset animations
  projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.animation = 'none';
  });

  // Staggered animation for tech tags
  techTags.forEach((tag, index) => {
    const delay = 0.1 + (index % 4) * 0.1;
    tag.style.transition = `all 0.3s ease ${delay}s`;
  });

  // Animate project cards on scroll
  const animateProjectCards = () => {
    const triggerBottom = window.innerHeight * 0.85;

    projectCards.forEach((card, index) => {
      const cardTop = card.getBoundingClientRect().top;

      if (cardTop < triggerBottom) {
        card.style.animation = `fadeInUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards ${index * 0.2}s`;
      }
    });
  };

  // Add hover effect for project cards
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      const tags = this.querySelectorAll('.tech-tag');
      tags.forEach((tag, index) => {
        tag.style.transform = 'translateY(-5px)';
        tag.style.opacity = '1';
      });
    });

    card.addEventListener('mouseleave', function () {
      const tags = this.querySelectorAll('.tech-tag');
      tags.forEach((tag, index) => {
        tag.style.transform = 'translateY(0)';
        tag.style.opacity = '0.9';
      });
    });
  });

  // Check project cards on scroll
  window.addEventListener('scroll', animateProjectCards);

  // Initial check for project cards
  animateProjectCards();

  // Parallax effect for background elements
  window.addEventListener('mousemove', function (e) {
    const bgElements = document.querySelectorAll('.bg-element');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    bgElements.forEach(element => {
      const speed = element.classList.contains('bg-element-1') ? 30 : 20;
      element.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });

  // PROGRESS BAR ANIMATION
  const progressBars = document.querySelectorAll('.progress-bar');

  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width;
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  progressBars.forEach(bar => {
    progressObserver.observe(bar);
  });

  // TESTIMONIALS SLIDER
  const testimonialsContainer = document.querySelector(".testimonials-container");
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const dots = document.querySelectorAll(".testimonial-dot");

  // Set initial card width for proper scrolling
  function setCardWidth() {
    const containerWidth = testimonialsContainer.clientWidth;
    let cardWidth;

    if (window.innerWidth > 1100) {
      // Desktop: 3 cards per view
      cardWidth = containerWidth / 3 - 16;
    } else if (window.innerWidth > 768) {
      // Tablet: 2 cards per view
      cardWidth = containerWidth / 2 - 16;
    } else {
      // Mobile: 1 card per view
      cardWidth = containerWidth - 16;
    }

    testimonialCards.forEach((card) => {
      card.style.minWidth = `${cardWidth}px`;
    });
  }

  // Initialize card widths
  setCardWidth();

  // Update card widths on window resize
  window.addEventListener("resize", setCardWidth);

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      // Update active dot
      dots.forEach((d) => d.classList.remove("active"));
      dot.classList.add("active");

      // Calculate scroll position
      const cardWidth = testimonialCards[0].offsetWidth + 16; // Card width + gap
      const scrollPosition = index * cardWidth;

      // Scroll to position
      testimonialsContainer.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    });
  });

  // Auto-scroll testimonials
  let currentSlide = 0;
  const totalSlides = testimonialCards.length;

  function autoScroll() {
    currentSlide = (currentSlide + 1) % totalSlides;

    // Update active dot
    dots.forEach((d) => d.classList.remove("active"));
    dots[currentSlide].classList.add("active");

    // Calculate scroll position
    const cardWidth = testimonialCards[0].offsetWidth + 16; // Card width + gap
    const scrollPosition = currentSlide * cardWidth;

    // Scroll to position
    testimonialsContainer.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  }

  // Set auto-scroll interval
  let scrollInterval = setInterval(autoScroll, 5000);

  // Pause auto-scroll on hover
  testimonialsContainer.addEventListener("mouseenter", () => {
    clearInterval(scrollInterval);
  });

  // Resume auto-scroll on mouse leave
  testimonialsContainer.addEventListener("mouseleave", () => {
    clearInterval(scrollInterval);
    scrollInterval = setInterval(autoScroll, 5000);
  });

  // CONTACT FORM VALIDATION


  // TESTIMONIAL AND CONTACT ANIMATION ON SCROLL
  const animateTestimonialsOnScroll = () => {
    const elements = document.querySelectorAll(".testimonial-card, .contact-card, .contact-form-container");
    const triggerBottom = window.innerHeight * 0.8;

    elements.forEach((element, index) => {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < triggerBottom) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Set initial state for testimonial/contact animation
  const elementsToAnimate = document.querySelectorAll(".testimonial-card, .contact-card, .contact-form-container");
  elementsToAnimate.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = `all 0.6s ease ${index * 0.1}s`;
  });

  // Check testimonials/contact on scroll
  window.addEventListener("scroll", animateTestimonialsOnScroll);

  // Initial check for testimonials/contact
  animateTestimonialsOnScroll();

  // FOOTER ANIMATIONS (STATS COUNTER)
  const statNumbers = document.querySelectorAll(".stat-number");
  let animated = false;

  function animateStats() {
    if (animated) return;

    const statsSection = document.querySelector(".stats-container");
    const statsSectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (statsSectionTop < windowHeight * 0.8) {
      statNumbers.forEach((stat) => {
        const targetNumber = Number.parseInt(stat.textContent);
        let currentNumber = 0;
        const duration = 2000; // 2 seconds
        const increment = targetNumber / (duration / 16); // 60fps

        const counter = setInterval(() => {
          currentNumber += increment;

          if (currentNumber >= targetNumber) {
            stat.textContent = targetNumber + "+";
            clearInterval(counter);
          } else {
            stat.textContent = Math.floor(currentNumber);
          }
        }, 16);
      });

      animated = true;
      window.removeEventListener("scroll", animateStats);
    }
  }

  // Check stats on scroll
  window.addEventListener("scroll", animateStats);

  // Initial check for stats
  animateStats();

  // BACK TO TOP FUNCTIONALITY
  // FLOATING DOCK FUNCTIONALITY (CHAT & TO-TOP)
  const floatingDock = document.getElementById("floating-dock");
  const toTopBtn = document.getElementById("to-top-btn");
  const aboutSection = document.querySelector("#about"); // Target the About section to know when to show it

  if (floatingDock && aboutSection) {
    // Show/hide dock based on scroll position
    window.addEventListener("scroll", () => {
      // Trigger slightly before reaching the end of the hero section
      const triggerPoint = aboutSection.offsetTop - 100; 
      
      if (window.scrollY > triggerPoint) {
        floatingDock.classList.add("is-visible");
      } else {
        floatingDock.classList.remove("is-visible");
      }
    });

    // Smooth Scroll to top when the arrow is clicked
    if (toTopBtn) {
      toTopBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }
  } //.to-top
});

// CLOCK
var clock = new Vue({
  el: '#clock',
  data: {
    time: '',
    date: ''
  }
});

var week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
var timerID = setInterval(updateTime, 1000);
updateTime();

function updateTime() {
  var cd = new Date();
  clock.time = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);
  clock.date = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth() + 1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];
}

function zeroPadding(num, digit) {
  return num.toString().padStart(digit, '0');
}

// NAVIGATION SYSTEM
class NavigationPage {
  constructor() {
    this.currentId = null;
    this.currentTab = null;
    this.tabContainerHeight = 70;
    this.lastScroll = 0;
    let self = this;

    $(".nav-tab").click(function (event) {
      self.onTabClick(event, $(this));
    });
    $(window).scroll(() => {
      this.onScroll();
    });
    $(window).resize(() => {
      this.onResize();
    });
  }

  onTabClick(event, element) {
    const href = element.attr("href");

    // Check if href starts with '#' (in-page anchor)
    if (href.startsWith("#")) {
      event.preventDefault();
      const targetElement = $(href);
      if (targetElement.length) {
        let scrollTop = targetElement.offset().top - this.tabContainerHeight + 1;
        $("html, body").animate({ scrollTop: scrollTop }, 600);
      }
    }
  }

  onScroll() {
    this.checkHeaderPosition();
    this.findCurrentTabSelector();
    this.lastScroll = $(window).scrollTop();
  }
  onResize() {
    this.checkHeaderPosition();
    this.findCurrentTabSelector();
  }

  checkHeaderPosition() {
    const triggerPoint = window.innerHeight - this.tabContainerHeight;

    if ($(window).scrollTop() > triggerPoint) {
      $(".nav-container").addClass("nav-container--scrolled");
    } else {
      $(".nav-container").removeClass("nav-container--scrolled");
    }
  }

  findCurrentTabSelector() {
    let newCurrentId;
    let newCurrentTab;
    let self = this;

    $(".nav-tab").each(function () {
      let id = $(this).attr("href");
      // Only process hrefs starting with '#' for in-page navigation
      if (id.startsWith("#")) {
        let target = $(id);
        if (target.length) {
          let offsetTop = target.offset().top - self.tabContainerHeight;
          let offsetBottom = target.offset().top + target.height() - self.tabContainerHeight;

          if ($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
            newCurrentId = id;
            newCurrentTab = $(this);
          }
        }
      }
    });

    if (this.currentId !== newCurrentId) {
      this.currentId = newCurrentId;
      this.currentTab = newCurrentTab;

      $(".nav-tab").removeClass("active");

      if (this.currentTab) {
        this.currentTab.addClass("active");
      }
    }
  }

}
new NavigationPage();

// Function for Education Tabs
function openTab(evt, yearName) {
  // Hide all tab content
  const tabcontent = document.getElementsByClassName("tab-content");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the "active" class from all tab buttons
  const tablinks = document.getElementsByClassName("tab-btn");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }

  // Show the specific tab content and set the clicked button as active
  document.getElementById(yearName).style.display = "block";
  evt.currentTarget.classList.add("active");
}
// Dynamic footer(copyright )year
document.addEventListener('DOMContentLoaded', () => {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
