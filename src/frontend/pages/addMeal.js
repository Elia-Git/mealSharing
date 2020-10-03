window.handleAddMealRequest = (params) => {
  fetch(`/api/meals/${params.id}`)
    .then((response) => response.json())
    .then((meal) => {
      document.head.innerHTML = `
              <link rel="stylesheet" href="/index.css" />
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> `;

      document.body.innerHTML = `
      <div class="header">

      <div class="dropdown">
        <button onclick="myFunction()" class="dropbtn">Menu</button>
        <div id="myDropdown" class="dropdown-content">
        <a a href="/" data-navigo>Home</a>
        <a href="meals" data-navigo>Meals</a>
          <a href="meal/1" data-navigo>Reservations</a>
          <a href="review/1" data-navigo>Reviews</a>
          <a href="/" data-navigo>Contact</a>
          </div>
      </div>
  </div>
  <h1>Reserve a meal${params.id}</h1>
<P>Create your own meal!!!</P>
  <form action="POST" class="add-meal">
  <input class="meal-input "type="text" id="title" name="title" placeholder="Meal Title">
    <input class="meal-input "type="text" id="description" name="description" placeholder="Meal Description">
    <input class="meal-input "type="text" id="location" name="location" placeholder="Location?">
    <input class="meal-input "type="datetime" id="when" name="when?" >
    <input class="meal-input "type="number" id="max_reservations" min="0" name="Max reservations" >
    <input class="meal-input "type="decimal" id="price" name="Meal Price" >
    <input class="meal-input "type="date" id="created_date" name="Created Date" >

  <button type="submit" href="addMeal/1> Add a Meal</button>
  </form> `;
    });
  router.updatePageLinks();
  // make sure the backend api works before working with it here
  //fetch("/api/meals")
  //  .then((response) => response.json())
  //  .then((meals) => console.log(meals));
};

function addMeal(id) {
  const insertTitle = document.getElementById("title");
  const insertDescription = document.getElementById("description");
  const insertLocation = document.getElementById("location");
  const insertWhen = document.getElementById("when");
  const insertMax_reservations = document.getElementById("max_reservations");
  const insertPrice = document.getElementById("price");
  const insertCreated_date = document.getElementById("created_date");

  let insertMeal = {
    title: insertTitle.value,
    description: insertDescription.value,
    location: insertLocation.value,
    when: insertWhen.value,
    max_reservations: insertMax_reservations.value,
    price: insertPrice.value,
    created_date: insertCreated_date.value,
  };
  console.log(insertMeal);
  console.log(insertCreated_date);

  fetch("/api/meals", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(insertMeal),
  })
    .then(() => {
      alert("Your meal is added succesfully");
    })
    .catch((err) => {
      console.log(err);
    });
}

//Validate the form
function validateForm() {
  const title = document.getElementById("title").value;
  const location = document.getElementById("location").value;
  const when = document.getElementById("when").value;
  const max_reservations = document.getElementById("max_reservations").value;
  const price = document.getElementById("price").value;
  if (
    title == "" ||
    location == " " ||
    when == "" ||
    max_reservations == "" ||
    price == ""
  ) {
    return false;
  }

  addMeal();
}
