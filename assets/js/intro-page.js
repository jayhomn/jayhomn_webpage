$(document).ready(function () {
  console.log("ready!");
  var scroll = 0;
  window.addEventListener("wheel", function (event) {
    if (event.deltaY < 0) {
      scroll--;
      if (scroll <= 0) {
        scroll = 0;
      }
    } else if (event.deltaY > 0) {
      scroll++;
      if (scroll >= 4) {
        scroll = 4;
      }
    }
    $(".intro-div").animate(
      {
        opacity: 1 - (scroll % 5) / 4,
      },
      200,
      function () {
        // Animation complete.
      }
    );
    $(".scroll-div").animate(
      {
        opacity: 1 - (scroll % 5) / 4,
      },
      200,
      function () {
        // Animation complete.
      }
    );

    console.log(scroll);
  });
});
