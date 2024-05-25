const anime_info = document.querySelector("#anime-info");
const anime_search_inp = document.querySelector("#animeInp");
const anime_search_form = document.querySelector("#anime-search-form");

// Fetching data from Kitsu api
async function getData(anime) {
  try {
    const res = await fetch(
      `https://kitsu.io/api/edge/anime?filter[text]=${anime}`,
      {
        method: "GET",
      }
    );
    const data = await res.json();
    renderInfo(data);
  } catch (error) {
    console.log(error);
  }
}

// Rendering Anime info and display through card
function renderInfo(data) {
  console.log(data.data[0]);
  anime_info.innerHTML = `
    <div class="card m-4">
      <img class="card-img-top" src=${
        data.data[0].attributes.posterImage.large
      } alt="Card image cap" />
      <div class="card-body">
        <h5 class="card-title"><b>${data.data[0].attributes.canonicalTitle}</b></h5>
        <p class="card-text">
          <b>Synopsis:</b>${
            data.data[0].attributes.synopsis
          }<br />
          <b>Start Date:</b>${
            !data.data[0].attributes.startDate
              ? "N/A"
              : new Date(data.data[0].attributes.startDate)
          }<br />
          <b>Status:</b>${
            !data.data[0].attributes.status
              ? "N/A"
              : data.data[0].attributes.status
          }<br />
          <b>End Date:</b>${
            !data.data[0].attributes.endDate
              ? "N/A"
              : new Date(data.data[0].attributes.endDate)
          }<br />
          <b>Episode Count:</b>${
            !data.data[0].attributes.episodeCount
              ? "N/A"
              : data.data[0].attributes.episodeCount
          }<br />
          <b>Age Rating:</b>${
            !data.data[0].attributes.ageRating
              ? "N/A"
              : data.data[0].attributes.ageRating
          }<br />
          <b>Age Rating Guide:</b>${
            !data.data[0].attributes.ageRatingGuide
              ? "N/A"
              : data.data[0].attributes.ageRatingGuide
          }<br />
          <b>Average Rating:</b>${
            !data.data[0].attributes.averageRating
              ? "N/A"
              : data.data[0].attributes.averageRating
          }<br />
        </p>
        <p class="card-text">
          <small class="text-muted">Updated at: ${new Date(
            data.data[0].attributes.updatedAt
          )}</small>
        </p>
      </div>
    </div>
  `;
}

// Handling Submit
anime_search_form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputValue = anime_search_inp.value.trim();
  let filterValue = inputValue.split(" ").join("%20");
  if (!filterValue) {
    alert("Input should not be empty");
  } else {
    anime_info.innerHTML = spinner();
    anime_search_form.reset();
    getData(filterValue);
  }
});

// Display Spinner while fetching and display the data
function spinner() {
  return `<div class="spinner-border text-primary d-flex justify-content-center mx-auto w-full" role = "status">
    </div >`;
}
