window.handleReviewsRequest = (params) => {
  document.body.innerHTML = `
    <div class="header">
    <div class="navbar">
          <a href="/" data-navigo>Home</a>
          <a href="meals" data-navigo>Meals</a>
          <a href="meal/1" data-navigo>Reservations</a>
           <a href="/" data-navigo>Contact</a>
            </div>
    </div>
  <h1>Reserve a meal${params.id}</h1>

  <form class="review-form" id="review-form">

  <input class="reviewInput "type="test" onkeyup="search_meal()" id="searchbar" name="search-meal" placeholder="Search meal....">
<input class="reviewInput "type="number" id="stars" name="stars" placeholder="Stars *">
<input class="reviewInput "type="text" id="comments" name="comments" placeholder="Comments">

<button type="submit"> Review</button>
  </form> `;
  // make sure the backend api works before working with it here
  fetch("/api/reservations")
    .then((response) => response.json())

    .then((reservations) => console.log(reservations));
};
