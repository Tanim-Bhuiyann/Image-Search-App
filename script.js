

const accessKey = "LHpKnF8axSK3OQZzT5kAtOBqj8ZRIfqMBKH5eJY5UCU";

async function fetchResults(searchInput, page) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos/?client_id=${accessKey}&query=${searchInput}&page=${page}`
    );
    const data = await response.json();

    return data.results;
  } catch (error) {
    console.error("got error", error);
   
  }
}

async function main() {
  const searchResultsContainer = document.querySelector(".search-results");
  const form = document.querySelector("#form");
  const inputElement = document.querySelector("#search-input");
  const showMoreButton = document.querySelector("#show-more-button");
  let page = 1;
  let searchInput = "";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    searchInput = inputElement.value;
    searchResultsContainer.innerHTML = "";
    page = 1;  
    form.reset();

    const results = await fetchResults(searchInput, page);

    for (const result of results) {
      const container = document.createElement("div");
      container.classList.add("search-result");

      const imageElement = document.createElement("img");
      imageElement.src = result.urls.full;

      container.appendChild(imageElement);
      searchResultsContainer.appendChild(container);
    }
  });

  showMoreButton.addEventListener("click", async () => {
    page++;
    const results = await fetchResults(searchInput, page);

    for (const result of results) {
      const container = document.createElement("div");
      container.classList.add("search-result");

      const imageElement = document.createElement("img");
      imageElement.src = result.urls.full;

      container.appendChild(imageElement);
      searchResultsContainer.appendChild(container);
    }
  });
}

main();
