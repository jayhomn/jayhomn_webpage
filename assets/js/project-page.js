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
      lastX = lerp(lastX, clientX, 1.4);
      lastY = lerp(lastY, clientY, 1.4);
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
  });
});
