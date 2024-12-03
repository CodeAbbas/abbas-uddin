let currentSlide = 0;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.testimonial-container figure');
    const totalSlides = slides.length;

    // Update current slide index
    currentSlide += direction;

    // Wrap around if out of bounds
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1; // Go to last slide
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0; //