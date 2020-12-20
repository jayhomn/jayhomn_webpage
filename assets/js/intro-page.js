$(document).ready(function () {
  var scroll = 0;
  var inAnimation = false;
  var upAnimate = true;
  $(".grow-container").hide();

  // Handle Scroll Transition
  window.addEventListener("wheel", function (event) {
    if (!inAnimation) {
      if (event.deltaY < 0) {
        // scroll up
        scroll = 0;
        if (scroll <= 0 && !upAnimate) {
          upAnimate = true;
          inAnimation = true;
          scroll = 0;

          $(".grow-container").hide();
          $(".grow-container").css("opacity", "0");
          $(".select-background-div").animate(
            {
              backgroundColor: " rgba(0, 0, 0,0)",
            },
            500,
            function () {
              // Animation complete.
              $(".select-background-div")
                .removeClass("select-background-div")
                .addClass("intro-background-img");
              $(".background-wipe").show();
              $(".foreground-wipe").show();
              $(".intro-div").show();
              $(".scroll-div").show();
              $(".intro-div").animate({ opacity: 1 }, 200, function () {});
              $("#wrapper")
                .delay(1700)
                .animate(
                  {
                    opacity: 1,
                  },
                  700,
                  function () {
                    // Animation Complete
                    inAnimation = false;
                  }
                );
            }
          );
        }
      } else if (event.deltaY > 0) {
        // scroll down
        scroll = 1;
        if (scroll >= 1 && upAnimate) {
          upAnimate = false;
          inAnimation = true;
          scroll = 1;

          $(".intro-background-img")
            .removeClass("intro-background-img")
            .addClass("select-background-div");

          $(".intro-div").animate({ opacity: 0 }, 500, function () {});
          $("#wrapper").animate(
            {
              opacity: 0,
            },
            100,
            function () {
              // Animation Complete
            }
          );

          $(".select-background-div").animate(
            {
              backgroundColor: "rgb( 23, 23, 23 )",
            },
            200,
            function () {
              // Animation complete.
              $(".background-wipe").hide();
              $(".foreground-wipe").hide();
              $(".scroll-div").hide();
              $(".intro-div").hide();
              $(".grow-container").show();
              $(".grow-container").animate(
                {
                  opacity: 1,
                },
                1000,
                function () {
                  // Animation complete.
                  inAnimation = false;
                }
              );
            }
          );
        }
      }
    }
  });

  // Handle background parallax
  $("html").mousemove(function (e) {
    var wx = $(window).width();
    var wy = $(window).height();

    var x = e.pageX - this.offsetLeft;
    var y = e.pageY - this.offsetTop;

    var newx = x - wx / 2;
    var newy = y - wy / 2;

    $("#wrapper div").each(function () {
      var speed = $(this).attr("data-speed");
      if ($(this).attr("data-revert")) speed *= -1;
      TweenMax.to($(this), 1, { x: 1 - newx * speed, y: 1 - newy * speed });
    });
  });
});
