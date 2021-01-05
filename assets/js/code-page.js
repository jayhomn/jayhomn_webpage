function checkIfInView(element, windowBottom) {
  var bottom_of_object = element.position().top + element.outerHeight() / 4;
  if (windowBottom > bottom_of_object) {
    element.animate({ opacity: "1" }, 800);
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

    $(".project-entry").each(function () {
      $(this).hover(
        (e) => {
          console.log(e.type);
          console.log($(this).find(".project-name"));
          $(this)
            .find(".project-name")
            .hoverFlow(e.type, { marginLeft: "-5.5vw" }, "0.5s");
        },
        (e) => {
          $(this)
            .find(".project-name")
            .hoverFlow(e.type, { marginLeft: "-5vw" }, "0.5s");
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

  $(window).scroll(function () {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      $(".navbar").css("top", "0");
    } else {
      $(".navbar").css("top", "-50px");
    }

    var bottom_of_window = $(window).scrollTop() + $(window).height();

    $(".section-reveal").each(function () {
      var timeline = new TimelineMax();
      var bottom_of_object = $(this).position().top + $(this).outerHeight() / 4;

      if (bottom_of_window > bottom_of_object) {
        timeline
          .to($(this), 0.8, { opacity: "1" })
          .to(
            $(this).find(".section-slide"),
            0.8,
            {
              opacity: "1",
              transform: "translateX(0%)",
            },
            "-=0.5"
          )
          .to(
            $(this).find(".project-name"),
            0.8,
            {
              opacity: "1",
              transform: "translateX(0%)",
            },
            "-=0.35"
          );
      }
    });
  });
});
