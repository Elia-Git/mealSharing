window.handleHomeRequest = () => {
  document.body.innerHTML = `<div class="header">
 <div class="navbar">

      <a href="meals" data-navigo>Meals</a>
      <a href="meal/1" data-navigo>Reservations</a>
      <a href="review/1" data-navigo>Reviews</a>
			<a href="/" data-navigo>Contact</a>
    </div>
</div>


<div class="body">
<h3>We are glad to share our delicious meals with you!</h3>
<br>
<img src="https://upload.wikimedia.org/wikipedia/commons/5/58/Eritrean_Injera_with_stews.jpg" >
<img src="https://upload.wikimedia.org/wikipedia/commons/5/58/Eritrean_Injera_with_stews.jpg" >
<div class="address">
<p>Adress</P>
 <p>Phone:12445678</p>
<p>Address: GSV 54</p>
<p>Frederiksberg, Denmark</p>
</div>

</div>

<form>
<h2>Contact formula</h2>
<input type="text" id="name" placeholder="Your name please"/>
<input type="email" id="email" placeholder="Your Email"/>
<input type="textarea" width="5" id="text-area" placeholder="Your meassage here!">
<button type="submit" id="submit"> Send</button>
</form>
    <div class="footer">
		<p>Copyright@2020</P> <br>
    <p>Follow us on</p>
		<a href="/">Faccebook</a>
		<a href="/">Twitter</a>
		<a href="/">Intagram</a>
		<a href="/">Linkedin</a>
    </div>
  `;
  // <a href="addMeal" data-navigo>Add a meal</a>

  // if any links are added to the dom, use this function
  // make the router handle those links.
  router.updatePageLinks();
};
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
sfsdfdf;
