const lerp = (a, b, n) => {
  return (1 - n) * a + n * b;
};

$(document).ready(function () {
  var innerCursor = $(".cursor-dot");
  var outerCursor = $(".cursor-ring");

  var clientX = -100;
  var clientY = -100;
  var lastX = 0;
  var lastY = 0;
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
  const initHovers = () => {
    $("a").each(function () {
      $(this).hover(
        function (e) {
          outerCursor.hoverFlow(
            e.type,
            { width: "65px", height: "65px", left: "-27.8px", top: "-27.8px" },
            "fast"
          );
        },
        function (e) {
          outerCursor.hoverFlow(
            e.type,
            { width: "35px", height: "35px", left: "-18.8px", top: "-18.8px" },
            "fast"
          );
        }
      );
    });
  };

  const initCursor = () => {
    const render = () => {
      TweenMax.set(innerCursor, {
        x: clientX,
        y: clientY,
      });

      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
  };

  const initRing = () => {
    const renderR = () => {
      lastX = lerp(lastX, clientX, 0.02);
      lastY = lerp(lastY, clientY, 0.02);
      TweenMax.to(outerCursor, {
        x: lastX,
        y: lastY,
      });

      requestAnimationFrame(renderR);
    };
    requestAnimationFrame(renderR);
  };

  initCursor();
  initRing();
  initHovers();

  // Handle background parallax
  $("html").mousemove(function (e) {
    lastX = lerp(lastX, e.clientX, 0.2);
    lastY = lerp(lastY, e.clientY, 0.2);

    clientX = e.clientX;
    clientY = e.clientY;

    TweenMax.set(innerCursor, {
      x: e.clientX,
      y: e.clientY,
    });

    TweenMax.set(outerCursor, {
      x: lastX,
      y: lastY,
    });

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
