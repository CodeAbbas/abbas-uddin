document.addEventListener('DOMContentLoaded', () => {
  const svg = document.querySelector('.paths');

  function createPath(position, index) {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M-${380 - index * 5 * position} -${189 + index * 6}C-${380 - index * 5 * position} -${189 + index * 6} -${312 - index * 5 * position} ${216 - index * 6} ${152 - index * 5 * position} ${343 - index * 6}C${616 - index * 5 * position} ${470 - index * 6} ${684 - index * 5 * position} ${875 - index * 6} ${684 - index * 5 * position} ${875 - index * 6}`);
      path.setAttribute('stroke', 'currentColor');
      path.setAttribute('stroke-width', 0.5 + index * 0.03);
      path.setAttribute('stroke-opacity', 0.1 + index * 0.03);
      svg.appendChild(path);
      return path;
  }

  function animatePath(path) {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, {
          strokeDashoffset: 0,
          duration: 20 + Math.random() * 10,
          repeat: -1,
          yoyo: true,
          ease: "none"
      });
  }

  for (let i = 0; i < 36; i++) {
      const position = i % 2 === 0 ? 1 : -1;
      const path = createPath(position, i);
      animatePath(path);
  }
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

// PARTICLES BACKGROUND
window.onload = function() {
  Particles.init({
      selector: ".background1",
      color: ["#03dac6", "#ff0266", "#000000"],
      connectParticles: true
  });
};

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
      event.preventDefault();
      let scrollTop = $(element.attr("href")).offset().top - this.tabContainerHeight + 1;
      $("html, body").animate({ scrollTop: scrollTop }, 600);
  }

  onScroll() {
      this.checkHeaderPosition();
      this.findCurrentTabSelector();
      this.lastScroll = $(window).scrollTop();
  }

  checkHeaderPosition() {
      const headerHeight = 75;
      if ($(window).scrollTop() > headerHeight) {
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
          let offsetTop = $(id).offset().top - self.tabContainerHeight;
          let offsetBottom = $(id).offset().top + $(id).height() - self.tabContainerHeight;
          
          if ($(window).scrollTop() > offsetTop && $(window).scrollTop() < offsetBottom) {
              newCurrentId = id;
              newCurrentTab = $(this);
          }
      });

      if (this.currentId !== newCurrentId) {
          this.currentId = newCurrentId;
          this.currentTab = newCurrentTab;
      }
  }
}
new NavigationPage();

// PROGRESS BAR ANIMATION
function checkScroll() {
  const progressBars = document.querySelectorAll('.skills-progress');
  
  progressBars.forEach(bar => {
      if (isElementInViewport(bar)) {
          initProgressBars();
      }
  });
}

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('resize', checkScroll);
checkScroll();
