document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('slider');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  const fileInput = document.getElementById('file-input');

  let currentIndex = 0;
  let slides = [];

  function showSlide(index) {
      console.log(`Showing slide index: ${index}`);
      slides.forEach((slide, i) => {
          if (i === index) {
              slide.classList.add('active');
          } else {
              slide.classList.remove('active');
          }
      });
  }

  function showNextSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
  }

  function showPrevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
  }

  function showFirstSlide() {
      currentIndex = 0;
      showSlide(currentIndex);
  }

  function showLastSlide() {
      currentIndex = slides.length - 1;
      showSlide(currentIndex);
  }

  function loadLyrics(file) {
      console.log(`Loading file: ${file.name}`);
      const reader = new FileReader();
      reader.onload = function(event) {
          const text = event.target.result;
          console.log(`File content:\n${text}`);
          const lines = text.split('\n').map(line => line.trim());
          const nonEmptyLines = lines.filter(line => line !== '');
          console.log(`Parsed lines:\n${nonEmptyLines.join('\n')}`);
          slides = nonEmptyLines.map(createSlide);
          renderSlides();
      };
      reader.readAsText(file);
  }

  function createSlide(text) {
      const slide = document.createElement('div');
      slide.classList.add('slide');
      slide.textContent = text;
      console.log(`Created slide with text: ${text}`);
      return slide;
  }

  function renderSlides() {
      slider.innerHTML = '';
      slides.forEach(slide => slider.appendChild(slide));
      console.log(`Rendered ${slides.length} slides`);
      currentIndex = 0;
      showSlide(currentIndex);
  }

  nextButton.addEventListener('click', showNextSlide);
  prevButton.addEventListener('click', showPrevSlide);
  fileInput.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
          loadLyrics(file);
      }
  });

  document.addEventListener('keydown', (event) => {
      switch (event.key) {
          case 'ArrowLeft':
              showPrevSlide();
              break;
          case 'ArrowRight':
              showNextSlide();
              break;
          case 'Home':
              showFirstSlide();
              break;
          case 'End':
              showLastSlide();
              break;
      }
  });

  // Optional: Auto slide
  // setInterval(showNextSlide, 5000);
});
