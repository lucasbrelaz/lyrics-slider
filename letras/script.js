document.addEventListener('DOMContentLoaded', function () {
  const lyricsListContainer = document.getElementById('lyrics-list');
  const searchInput = document.getElementById('search-input');

  const lyricsFiles = [
    '17 de janeiro',
    'A Alegria',
    'Até outra vez',
    'Bondade',
    'Entrega',
    'Na Casa',
    'Oh Quão Lindo Esse Nome É',
    'Oração',
    'Preciosa Graça',
    'Te Agradeço',
    'Tua Palavra',
    'Vim Pra Te Adorar',
  ];

  // Função para ordenar o array em ordem alfabética
  function sortLyricsFiles(files) {
    return files.sort((a, b) => a.localeCompare(b));
  }

  // Ordenar o array
  let sortedLyricsFiles = sortLyricsFiles(lyricsFiles);

  // Função para exibir a lista de arquivos
  function displayLyricsList(files) {
    lyricsListContainer.innerHTML = '';
    files.forEach((file) => {
      const link = document.createElement('a');
      link.href = `${file}.txt`;
      link.textContent = file;
      link.download = file;
      link.classList.add('lyrics-link');

      const listItem = document.createElement('div');
      listItem.appendChild(link);

      lyricsListContainer.appendChild(listItem);
    });
  }

  // Exibir a lista ordenada de arquivos
  displayLyricsList(sortedLyricsFiles);

  // Função para filtrar a lista de arquivos
  function filterLyricsList(query) {
    const filteredFiles = sortedLyricsFiles.filter((file) =>
      file.toLowerCase().includes(query.toLowerCase()),
    );
    displayLyricsList(filteredFiles);
  }

  // Evento de input para o campo de pesquisa
  searchInput.addEventListener('input', function () {
    const query = searchInput.value.trim();
    if (query === '') {
      displayLyricsList(sortedLyricsFiles);
    } else {
      filterLyricsList(query);
    }
  });
});
