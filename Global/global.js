document.addEventListener("DOMContentLoaded", function () {

  // Evento de clique no link
  a.addEventListener("click", function (event) {
    arrow.style = "transform: rotate(-135deg)";
    Tools.style = "top: 50px;pointer-events: all";
    Tools_span1.style = "pointer-events: all";
    Tools_span2.style = "pointer-events: all";
    Tools_span3.style = "pointer-events: all";
  });

  // Evento de clique em qualquer lugar da tela
  document.addEventListener("mouseout", function (event) {
    if (event.relatedTarget === null || event.target !== a && event.target !== Tools && event.target !== lis && event.target !== Tools_span1 && event.target !== Tools_span2 && event.target !== Tools_span3) {
      arrow.style = "transform: rotate(45deg)";
      Tools.style = "top: -100px; pointer-events: none";
      Tools_span1.style = "pointer-events: none";
      Tools_span2.style = "pointer-events: none";
      Tools_span3.style = "pointer-events: none";
    }
  });
});