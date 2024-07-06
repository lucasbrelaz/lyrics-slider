document.addEventListener('DOMContentLoaded', () => {
  const fileSelector = document.getElementById('fileSelector');
  const currentLineElement = document.getElementById('currentLine');
  const prevLineButton = document.getElementById('prevLine');
  const nextLineButton = document.getElementById('nextLine');
  
  let lines = [];
  let currentIndex = 0;

  fileSelector.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
              lines = e.target.result.split('\n').map(line => line.trim()).filter(line => line.length > 0);
              currentIndex = 0;
              displayCurrentLine();
          };
          reader.readAsText(file);
      }
  });

  prevLineButton.addEventListener('click', () => {
      if (currentIndex > 0) {
          currentIndex--;
          displayCurrentLine();
      }
  });

  nextLineButton.addEventListener('click', () => {
      if (currentIndex < lines.length - 1) {
          currentIndex++;
          displayCurrentLine();
      }
  });

  document.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
          prevLineButton.click();
      } else if (event.key === 'ArrowRight') {
          nextLineButton.click();
      }
  });

  function displayCurrentLine() {
      currentLineElement.textContent = lines[currentIndex] || '';
  }
});
