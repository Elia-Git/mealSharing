function addReservaton(id) {
  const insertNumber_of_guests = document.getElementById("number_of_guests");
  const insertContact_name = document.getElementById("contact_name");
  const insertContact_email = document.getElementById("contact_email");
  const insertContact_phonenumber = document.getElementById(
    "contact_phonenumber"
  );

  let insertReservation = {
    meal_id: id,
    number_of_guests: insertNumber_of_guests.value,
    contact_name: insertContact_name.value,
    contact_email: insertContact_email.value,
    contact_phonenumber: insertContact_phonenumber.value,
  };
  console.log(insertReservation);

  fetch("/api/reservations", {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(insertReservation),
  })
    .then(() => {
      alert("Your booking is submited succesfully");
    })
    .catch((err) => {
      console.log(err);
    });
}

window.handleMealRequest = (params) => {
  fetch(`/api/meals/${params.id}`)
    .then((response) => response.json())
    .then((meal) => {
      document.head.innerHTML = `
      <link rel="stylesheet" href="/index.css" />
      				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      				<title>${meal[0].title}</title>`;
      document.body.innerHTML = `
      <div class="header">
      <div class="navbar">
        <a href="/" data-navigo>Home</a>
        <a href="meals" data-navigo>Meals</a>
        <a href="review/1" data-navigo>Reviews</a>
        <a href="/" data-navigo>Contact</a>
    </div>
    </div>
							<div class='meal'>
									<div>
											<p>${meal[0].title}</p>
											<img class="logo" src="https://source.unsplash.com/400x250?${meal[0].title}" alt="meal picture">
									</div>
									<div>
											<div>ID: ${meal[0].id}</div><br>
											<div>Description: ${meal[0].description}</div><br>
											<div><i class="fa fa-map-marker" style="font-size:24px;"></i>  ${meal[0].location}</div><br>
                      <div>Price: ${meal[0].price}DKK</div><br>

									</div>
							</div><br>
														<div class='add-reservation'></div>
							<br>
								<h3>Reserve for this meal?</h3>
 <label for="contact_name">Contact Name</label><br>
 <input type="text"; id="contact_name"; placeholder="Your Name"><br>
 <label for ="contact_phone">Contact Phone Number</label><br>
 <input type="number"; id="contactPhone"; placeholder="Your Phone Number"> <br>
 <label for ="contact_email">Contact Email</label><br>
 <input type="email"; id="contact_email"; placeholder="Your Email"> <br>
 <button href="meal/1" onclick="addReservation(${meal[0].id})">Book Seat</button>
 </form>`;
    });
  router.updatePageLinks();
};

//const reserveMeal = () => {
//  return (document.body.innerHTML = `
//  <h2>Reserve this meal</h2>
// <form action="../../api/reservations" method="POST" id="createReservation">
//	<label for="mealid">Meal Id:</label><br>
//	<input id="mealid" name="mealid" value="${id}"><br><br>
//	<label for="name">Contact_name:</label><br>
//	<input type="text" id="name" name="name"><br><br>
//	<label for="email">Contact_mail:</label><br>
//	<input type="text" id="email" name="email" value="" placeholder="example@domain.com"><br><br>
//	<label for="contact_phonenumber">Phone number:</label><br>
//	<input type="text" id="contact_phonenumber" name="contact_phonenumber" value=""><br><br>
//   <button onclick=addReservation()>Book Seat</button><br><br><br>`);
//};

// function renderMeals(meals) {
//     const ul = document.querySelector(".meals");
//     meals.forEach((meal) => {
//         const li = document.createElement("li");
//         li.innerHTML = `<p><a href="/meal/${meal.id}">${meal.description}</a></p> `;

//         ul.appendChild(li);
//     });
// }

// const { response } = require("express");
