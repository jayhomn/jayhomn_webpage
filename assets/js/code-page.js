function checkIfInView(element, windowBottom) {
  var bottom_of_object = element.position().top + element.outerHeight() / 4;
  if (windowBottom > bottom_of_object) {
    if (element.attr("id") == "intro") {
      $("#nav-about").css("font-weight", "Normal");
      $("#nav-work").css("font-weight", "Normal");
      $("#nav-projects").css("font-weight", "Normal");
      $("#nav-contact").css("font-weight", "Normal");
    } else {
      element.animate({ opacity: "1" }, 800);
      switch (element.attr("id")) {
        case "about":
          $("#nav-about").css("font-weight", "Bold");
          $("#nav-work").css("font-weight", "Normal");
          $("#nav-projects").css("font-weight", "Normal");
          $("#nav-contact").css("font-weight", "Normal");
          break;
        case "work":
          $("#nav-about").css("font-weight", "Normal");
          $("#nav-work").css("font-weight", "Bold");
          $("#nav-projects").css("font-weight", "Normal");
          $("#nav-contact").css("font-weight", "Normal");
          break;
        case "project":
          $("#nav-about").css("font-weight", "Normal");
          $("#nav-work").css("font-weight", "Normal");
          $("#nav-projects").css("font-weight", "Bold");
          $("#nav-contact").css("font-weight", "Normal");
          break;
        case "contact":
          $("#nav-about").css("font-weight", "Normal");
          $("#nav-work").css("font-weight", "Normal");
          $("#nav-projects").css("font-weight", "Normal");
          $("#nav-contact").css("font-weight", "Bold");
          break;
      }
    }
  }
}
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

  var hovering = false;

  const initHovers = () => {
    const linkItems = $("a");
    linkItems.each(function () {
      $(this).hover(
        function (e) {
          outerCursor.hoverFlow(
            e.type,
            { width: "55px", height: "55px", left: "-27.8px", top: "-27.8px" },
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
    // transform the innerCursor to the current mouse position
    // use requestAnimationFrame() for smooth performance
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
  /* Every time the window is scrolled ... */
  $(window).scroll(function () {
    var cursor_of_window = $(window).scrollTop() + $(window).height() / 3;
    var bottom_of_window = $(window).scrollTop() + $(window).height();

    if (
      cursor_of_window >=
        $("#about").position().top + $("#about").outerHeight() &&
      cursor_of_window <= $("#work").position().top + $("#work").outerHeight()
    ) {
      $(".side-nav .side-nav-line").each(function () {
        $(this).filter(":not(:animated)").animate(
          { backgroundColor: "white" },
          {
            duration: 200,
            queue: false,
          }
        );
      });
      $(".side-nav a").each(function () {
        $(this).filter(":not(:animated)").animate(
          { color: "white" },
          {
            duration: 200,
            queue: false,
          }
        );
      });
    } else {
      $(".side-nav .side-nav-line").each(function () {
        $(this).filter(":not(:animated)").animate(
          { backgroundColor: "black" },
          {
            duration: 200,
            queue: false,
          }
        );
      });
      $(".side-nav a").each(function () {
        $(this).filter(":not(:animated)").animate(
          { color: "black" },
          {
            duration: 200,
            queue: false,
          }
        );
      });
    }

    if (
      bottom_of_window <=
      $("#intro").position().top + $("#intro").outerHeight()
    ) {
      checkIfInView($("#intro"), bottom_of_window);
    }

    if (
      bottom_of_window <=
      $("#about").position().top + $("#about").outerHeight()
    )
      checkIfInView($("#about"), bottom_of_window);
    if (
      bottom_of_window <=
      $("#work").position().top + $("#work").outerHeight()
    )
      checkIfInView($("#work"), bottom_of_window);
    if (
      bottom_of_window <=
      $("#project").position().top + $("#project").outerHeight()
    )
      checkIfInView($("#project"), bottom_of_window);
    if (
      bottom_of_window <=
      $("#contact").position().top + $("#contact").outerHeight()
    )
      checkIfInView($("#contact"), bottom_of_window);
  });

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

    var speedContainer = $(".intro-banner-design").attr("data-revert")
      ? -$(".intro-banner-design").attr("data-speed")
      : $(".intro-banner-design").attr("data-speed");

    var backgroundPos =
      `${50 + 1 - newx * speedContainer}` +
      "%" +
      ` ${1 - newy * speedContainer}` +
      "%";

    TweenMax.to($(".intro-banner-design"), 1, {
      backgroundPosition: backgroundPos,
    });

    $(".intro-banner-design div").each(function () {
      var speed = $(this).attr("data-speed");
      if ($(this).attr("data-revert")) speed *= -1;
      TweenMax.to($(this), 1, { x: 1 - newx * speed, y: 1 - newy * speed });
    });
  });
});
