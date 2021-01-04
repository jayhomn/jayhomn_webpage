var sideNavInAni = false;

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

$(document).ready(function () {
  /* Every time the window is scrolled ... */
  $(window).scroll(function () {
    var cursor_of_window = $(window).scrollTop() + $(window).height() / 3;

    /* Check the location of each desired element */
    var bottom_of_window = $(window).scrollTop() + $(window).height();

    if (
      cursor_of_window <=
      $("#intro").position().top + $("#intro").outerHeight()
    ) {
      if ($(".side-nav").css("opacity") != 0) {
        $(".side-nav")
          .filter(":not(:animated)")
          .animate({ opacity: "0" }, 200, function () {
            console.log("fnished");
          });
      }
    } else {
      if ($(".side-nav").css("opacity") != 1) {
        $(".side-nav").filter(":not(:animated)").animate({ opacity: "1" }, 800);
      }
    }

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
