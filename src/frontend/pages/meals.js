window.handleMealsRequest = () => {
  document.body.innerHTML = `
  <div class="header">
   <div class="navbar">
    <a href="/" data-navigo>Home</a>
    <a href="meal/1" data-navigo>Reservations</a>
    <a href="review/1" data-navigo>Reviews</a>
    <a href="/" data-navigo>Contact</a>
 </div>
</div>
  <h1>List of our delicious meals</h1>

  <ul class="meals"></ul>
<div class="create_a_meal"><a href="addMeal/1" data-navigo>Create a new Meal</a></div>
<input class="reviewInput "type="test" onkeyup="search_meal()" id="searchbar" name="search-meal" placeholder="Search meal....">
  <div class="footer">
    Faccebook
    Twitter
    Intagram
    Linkedin</div>`;
  // make sure the backend api works before working with it here
  fetch("/api/meals")
    .then((response) => response.json())
    .then((meals) => renderMeals(meals));
  // .then(renderContacts);
};

function renderMeals(meals) {
  const ul = document.querySelector(".meals");
  meals.forEach((meal) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <p>Meal title: <a href="/meal/${meal.id}">${meal.title}</a></p>
		<p>Price : ${meal.price}</p>
		<p>Description: ${meal.description}</p>`;

    ul.appendChild(li);
  });
}

// function renderMealsToHome(meals) {
//     const ul = document.createElement("ul");
//     ul.setAttribute("class", "home");
//     for (let i = 0; i < meals.length; i++) {
//         const li = document.createElement("li");
//         li.setAttribute("class", "home");
//         li.innerHTML = `${meals[i].id}: ${meals[i].title}`;
//         ul.appendChild(li);
//     }
//     const footer = document.createElement("footer");
//     footer.innerHTML = `
//      <h3>Contact</h3>
//      <div class="contacts">
//        <p>Email: ethio-habesha@gmail.dk</p>
//        <p>Tlf: 91490603</p>
//        <div><a href="#"><i class="fab fa-facebook"></i></a>
//        <a href="#"><i class="fab fa-twitter"></i></a>
//        <a href="#"><i class="fab fa-youtube"></i><div>
//      </div>
//             <p>Adress: Valby, Copenhagen</p`;
//     document.body.appendChild(ul, footer);
//     document.body.appendChild(footer);
// }
