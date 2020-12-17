$(document).ready(function () {
  var scroll = 0;
  var inAnimation = false;
  $(".grow-container").hide();
  window.addEventListener("wheel", function (event) {
    if (!inAnimation) {
      if (event.deltaY < 0) {
        // scroll up
        scroll--;
        if (scroll <= 0) {
          inAnimation = true;
          scroll = 0;
          $(".intro-div").show();
          $(".scroll-div").show();
          $(".grow-container").hide();
          $(".grow-container").css("opacity", "0");
          $(".select-background-div").animate(
            {
              backgroundColor: "white",
            },
            500,
            function () {
              // Animation complete.
              $(".select-background-div")
                .removeClass("select-background-div")
                .addClass("intro-background-img");
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
        // scroll down
        scroll++;
        if (scroll >= 1) {
          inAnimation = true;
          scroll = 1;

          $(".intro-background-img")
            .removeClass("intro-background-img")
            .addClass("select-background-div");
          $(".select-background-div").animate(
            {
              backgroundColor: "rgb( 23, 23, 23 )",
            },
            500,
            function () {
              // Animation complete.
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
    }
  });
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
