window.handleReviewsRequest = (params) => {
  document.body.innerHTML = `
  // Header
<div class="header">
<div class="navbar">
      <a href="/" data-navigo>Home</a>
      <a href="meals" data-navigo>Meals</a>
      <a href="meal/1" data-navigo>Reservations</a>
      <a href="/reviews/1" data-navigo>Reviews</a>
    </div>
</div>
// Body
<body>
<div>Contact us aney time</div>
</body>

// Footer
<div class="footer">
<p>Copyright@2020</P> <br>
<p>Follow us on</p>
<a href="/">Faccebook</a>
<a href="/">Twitter</a>
<a href="/">Intagram</a>
<a href="/">Linkedin</a>
</div>`;
};
