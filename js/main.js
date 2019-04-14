const newsApiKey = "9eb038d4f82f40688fddbb6108e7abcc";
const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApiKey}`;

const main = document.querySelector('main');

window.addEventListener('load', e => {
  updateNews();
});

async function updateNews() {
  const res = await fetch(newsApiUrl);
  const json = await res.json();

  main.innerHTML = json.articles.map(createArticle).join('\n');
}

function createArticle(article) {
  return `
    <div class="card article">
      <a href="${article.url}">
        <div class="card-image">
          <figure class="image is-4by3">
            <img src="${article.urlToImage}">
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

