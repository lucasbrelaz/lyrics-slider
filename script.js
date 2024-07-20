document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('slider');
  const prevButton = document.getElementById('prev');
  const nextButton = document.getElementById('next');
  const clearButton = document.getElementById('clear');
  const fileInput = document.getElementById('file-input');
  const lyricsList = document.getElementById('lyrics-list');

  let currentIndex = 0;
  let slides = [];
  let filesMap = new Map();

  function showSlide(index) {
      slides.forEach((slide, i) => {
          if (i === index) {
              slide.style.opacity = 1;
              slide.style.pointerEvents = 'auto';
          } else {
              slide.style.opacity = 0;
              slide.style.pointerEvents = 'none';
          }
      });
  }

  function showNextSlide() {
      if (currentIndex < slides.length - 1) {
          currentIndex++;
          fadeEffect();
      } else {
          // Apenas para sinalizar que não há mais slides disponíveis
          console.log('Não há mais slides disponíveis para avançar.');
      }
  }

  function showPrevSlide() {
      if (currentIndex > 0) {
          currentIndex--;
          fadeEffect();
      } else {
          // Apenas para sinalizar que não há mais slides disponíveis
          console.log('Não há mais slides disponíveis para retroceder.');
      }
  }

  function fadeEffect() {
      slides.forEach((slide, i) => {
          if (i === currentIndex) {
              slide.style.opacity = 1;
              slide.style.pointerEvents = 'auto';
          } else {
              slide.style.opacity = 0;
              slide.style.pointerEvents = 'none';
          }
      });
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
      const reader = new FileReader();
      reader.onload = function(event) {
          const text = event.target.result;
          const lines = text.split('\n').map(line => line.trim());
          const nonEmptyLines = lines.filter(line => line !== '');
          
          // Limpar slides existentes antes de carregar novos
          clearSlider();
          
          slides = nonEmptyLines.map(createSlide);
          renderSlides();
      };
      reader.readAsText(file);
  }

  function createSlide(text) {
      const slide = document.createElement('div');
      slide.classList.add('slide');
      slide.textContent = text;
      slider.appendChild(slide);
      return slide;
  }

  function renderSlides() {
      currentIndex = 0;
      showSlide(currentIndex);
  }

  function clearSlider() {
      slider.innerHTML = '';
      currentIndex = 0;
      slides = [];
  }

  function handleFileSelect(file, listItem) {
      loadLyrics(file);
      const items = lyricsList.querySelectorAll('li');
      items.forEach(item => item.classList.remove('selected'));
      listItem.classList.add('selected');
  }

  fileInput.addEventListener('change', (event) => {
      const files = Array.from(event.target.files);
      lyricsList.innerHTML = '';
      filesMap.clear();
      files.forEach(file => {
          filesMap.set(file.name, file);
          const listItem = document.createElement('li');
          listItem.textContent = file.name;
          listItem.addEventListener('click', () => handleFileSelect(file, listItem));
          lyricsList.appendChild(listItem);
      });
  });

  nextButton.addEventListener('click', showNextSlide);
  prevButton.addEventListener('click', showPrevSlide);
  clearButton.addEventListener('click', clearSlider);
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
