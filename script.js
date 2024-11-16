/* Credit and Thanks:
Matrix - Particles.js;
SliderJS - Ettrics;
Design - Abbas Uddin;
Fonts - Google Fonts
*/
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
    clock.date = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth()+1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];
};

function zeroPadding(num, digit) {
    var zero = '';
    for(var i = 0; i < digit; i++) {
        zero += '0';
    }
    return (zero + num).slice(-digit);
}
// CLOCK
window.onload = function() {
    Particles.init({
    selector: ".background1",
    color: ["#03dac6", "#ff0266", "#000000"],
    connectParticles: true
    });
  };
// background1


class NavigationPage {
  constructor() {
    this.currentId = null;
    this.currentTab = null;
    this.tabContainerHeight = 70;
    this.lastScroll = 0;
    let self = this;
    $(".nav-tab").click(function () {
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
    event.preventDefault();
    let scrollTop =
      $(element.attr("href")).offset().top - this.tabContainerHeight + 1;
    $("html, body").animate({ scrollTop: scrollTop }, 600);
  }

  onScroll() {
    this.checkHeaderPosition();
    this.findCurrentTabSelector();
    this.lastScroll = $(window).scrollTop();
  }

  onResize() {
    if (this.currentId) {
      this.setSliderCss();
    }
  }

  checkHeaderPosition() {
    const headerHeight = 75;
    if ($(window).scrollTop() > headerHeight) {
      $(".nav-container").addClass("nav-container--scrolled");
    } else {
      $(".nav-container").removeClass("nav-container--scrolled");
    }
    let offset =
      $(".nav").offset().top +
      $(".nav").height() -
      this.tabContainerHeight -
      headerHeight;
    if (
      $(window).scrollTop() > this.lastScroll &&
      $(window).scrollTop() > offset
    ) {
      $(".nav-container").addClass("nav-container--move-up");
      $(".nav-container").removeClass("nav-container--top-first");
      $(".nav-container").addClass("nav-container--top-second");
    } else if (
      $(window).scrollTop() < this.lastScroll &&
      $(window).scrollTop() > offset
    ) {
      $(".nav-container").removeClass("nav-container--move-up");
      $(".nav-container").removeClass("nav-container--top-second");
      $(".nav-container-container").addClass("nav-container--top-first");
    } else {
      $(".nav-container").removeClass("nav-container--move-up");
      $(".nav-container").removeClass("nav-container--top-first");
      $(".nav-container").removeClass("nav-container--top-second");
    }
  }

  findCurrentTabSelector(element) {
    let newCurrentId;
    let newCurrentTab;
    let self = this;
    $(".nav-tab").each(function () {
      let id = $(this).attr("href");
      let offsetTop = $(id).offset().top - self.tabContainerHeight;
      let offsetBottom =
        $(id).offset().top + $(id).height() - self.tabContainerHeight;
      if (
        $(window).scrollTop() > offsetTop &&
        $(window).scrollTop() < offsetBottom
      ) {
        newCurrentId = id;
        newCurrentTab = $(this);
      }
    });
    if (this.currentId != newCurrentId || this.currentId === null) {
      this.currentId = newCurrentId;
      this.currentTab = newCurrentTab;
      this.setSliderCss();
    }
  }

  setSliderCss() {
    let width = 0;
    let left = 0;
    if (this.currentTab) {
      width = this.currentTab.css("width");
      left = this.currentTab.offset().left;
    }
    $(".nav-tab-slider").css("width", width);
    $(".nav-tab-slider").css("left", left);
  }
}

new NavigationPage();

/* hero animation */
// Function to initialize progress bar animation
function initProgressBars() {
    const progressBars = document.querySelectorAll('.skills-progress');
    
    // Loop through each progress bar and apply the animation when it's in view
    progressBars.forEach(bar => {
        const value = bar.getAttribute('data-value');
        
        // Set the custom property --progress-width for the animation
        bar.style.setProperty('--progress-width', value);
        
        // Add the 'animate' class to trigger the CSS animation
        bar.classList.add('animate');
    });
}

// Check if the progress bars are in the viewport
function checkScroll() {
    const progressBars = document.querySelectorAll('.skills-progress');
    
    progressBars.forEach(bar => {
        if (isElementInViewport(bar)) {
            initProgressBars(); // Trigger animation once the bar is in view
        }
    });
}

// Helper function to check if an element is in the viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Listen for scroll events and check if the progress bars are in view
window.addEventListener('scroll', checkScroll);
window.addEventListener('resize', checkScroll); // Handle resizing

// Trigger the initial check when the page loads
checkScroll();

/* Clients cards

// Set the interval for the automatic slide (in milliseconds)
var slideInterval = 5000;

// Initialize the current slide index
var currentSlide = 0;

// Get the carousel element and its child elements
var carousel = document.querySelector('#myCarousel');
var carouselInner = carousel.querySelector('.carousel-inner');
var carouselItems = carousel.querySelectorAll('.item');
var carouselIndicators = carousel.querySelectorAll('.carousel-indicators li');

// Function to move to the next slide
function moveToNextSlide() {
  // Remove the active class from the current slide and indicator
  carouselItems[currentSlide].classList.remove('active');
  carouselIndicators[currentSlide].classList.remove('active');
  
  // Increment the slide index and wrap around if necessary
  currentSlide = (currentSlide + 1) % carouselItems.length;
  
  // Add the active class to the next slide and indicator
  carouselItems[currentSlide].classList.add('active');
  carouselIndicators[currentSlide].classList.add('active');
}

// Set up the interval for the automatic slide
setInterval(moveToNextSlide, slideInterval); */
