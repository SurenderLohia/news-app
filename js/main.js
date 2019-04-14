const defaultSource = 'the-washington-post';
const newsApiKey = "9eb038d4f82f40688fddbb6108e7abcc";
const sourcesUrl = `https://newsapi.org/v2/sources?apiKey=${newsApiKey}`;

const main = document.querySelector('main');
const sourceSelector = document.getElementById('sources-selector');

window.addEventListener('load', async e => {
  updateNews();
  await updateSources();

  sourceSelector.value = defaultSource;

  sourceSelector.addEventListener('change', e => {
    updateNews(e.target.value);
  });

  if('serviceWorker' in navigator) {
    try {
      navigator.serviceWorker.register('sw.js');
      console.log('SW registered');
    } catch (error) {
      console.log('SW reg failed');
    }
  }
});

async function updateSources() {
  const res = await fetch(sourcesUrl);
  const json = await res.json();

  sourceSelector.innerHTML = json.sources.map(createSourceOption).join('\n');
}

async function updateNews(source = defaultSource) {
  const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${newsApiKey}`);
  const json = await res.json();

  main.innerHTML = json.articles.map(createArticle).join('\n');
}

function createArticle(article) {
  return `
    <div class="card article">
      <a href="${article.url}">
        <div class="card-image">
          <figure class="image is-4by3">
            <img crossorigin="anonymous" src="${article.urlToImage}">
          </figure>
        </div>
        <div class="card-content">
          <h2 class="mb1">${article.title}</h2>
          <p>${article.description}</p>
        </div>
      </a>
    </div>
  `;
}

function createSourceOption(option) {
  return `
    <option value="${option.id}">${option.name}</option>
  `
}

