$(document).ready(function () {
  var scroll = 0;
  var inAnimation = false;
  $(".grow-container").hide();
  window.addEventListener("wheel", function (event) {
    if (!inAnimation) {
      if (event.deltaY < 0) {
        scroll--;
        if (scroll <= 0) {
          inAnimation = true;
          scroll = 0;
          $(".intro-div").show();
          $(".grow-container").hide();
          $(".select-background-div").animate(
            {
              backgroundColor: " hsl(0, 8%, 85%)",
            },
            500,
            function () {
              // Animation complete.
              $(".select-background-div")
                .removeClass("select-background-div")
                .addClass("intro-background-div");
            }
          );
          $(".app-bar").animate(
            {
              color: "black",
            },
            600,
            function () {
              // Animation complete.
              inAnimation = false;
            }
          );
        }
      } else if (event.deltaY > 0) {
        scroll++;
        if (scroll >= 4) {
          inAnimation = true;
          scroll = 4;
          $(".intro-background-div")
            .removeClass("intro-background-div")
            .addClass("select-background-div");
          $(".select-background-div").animate(
            {
              backgroundColor: "rgb( 23, 23, 23 )",
            },
            500,
            function () {
              // Animation complete.
              $(".intro-div").hide();
              $(".grow-container").show();
              $(".grow-container").animate(
                {
                  opacity: 1,
                },
                1000,
                function () {
                  // Animation complete.
                }
              );
            }
          );
          $(".app-bar").animate(
            {
              color: "rgba( 255, 255, 255,54 )",
            },
            600,
            function () {
              // Animation complete.
              inAnimation = false;
            }
          );
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
    }
  });
});
