window.onload = function () {
  Particles.init({
    selector: ".background1"
  });
};
const particles = Particles.init({
  selector: ".background1",
  color: ["#03dac6", "#ff0266", "#000000"],
  connectParticles: true,
  responsive: [
    {
      breakpoint: 768,
      options: {
        color: ["#faebd7", "#03dac6", "#ff0266"],
        maxParticles: 43,
        connectParticles: false
      }
    }
  ]
});

new NavigationPage();
