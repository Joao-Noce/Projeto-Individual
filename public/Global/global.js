document.addEventListener("DOMContentLoaded", function () {

  // Evento de clique no <a> para aparecer
  a1.addEventListener("click", function (event) {
    event.preventDefault();
    arrow1.style = "transform: rotate(-135deg); margin-bottom: 1px";
    Tools1.style = "top: 50px;pointer-events: all";
    Tools1_span1.style = "pointer-events: all";
    Tools1_span2.style = "pointer-events: all";
    Tools1_span3.style = "pointer-events: all";
  });

  // Evento de clique em qualquer lugar da tela para desaparecer
  document.addEventListener("mouseout", function (event) {
    if (event.target !== a1 && event.target !== Tools1 && event.target !== lis1 && event.target !== Tools1_span1 && event.target !== Tools1_span2 && event.target !== Tools1_span3) {
      arrow1.style = "transform: rotate(45deg); margin-bottom: 4px";
      Tools1.style = "top: -100px; pointer-events: none";
      Tools1_span1.style = "pointer-events: none";
      Tools1_span2.style = "pointer-events: none";
      Tools1_span3.style = "pointer-events: none";
    }
  });

  a2.addEventListener("click", function (event) {
    event.preventDefault();
    arrow2.style = "transform: rotate(-135deg); margin-bottom: 1px";
    Tools2.style = "top: 50px;pointer-events: all";
    Tools2_span1.style = "pointer-events: all";
    Tools2_span2.style = "pointer-events: all";
    Tools2_span3.style = "pointer-events: all";
    Tools2_span4.style = "pointer-events: all";
  });

  // Evento de clique em qualquer lugar da tela para desaparecer
  document.addEventListener("mouseout", function (event) {
    if (event.target !== a2 && event.target !== Tools2 && event.target !== lis2 && event.target !== Tools2_span1 && event.target !== Tools2_span2 && event.target !== Tools2_span3 && event.target !== Tools2_span4) {
      arrow2.style = "transform: rotate(45deg); margin-bottom: 4px";
      Tools2.style = "top: -100px; pointer-events: none";
      Tools2_span1.style = "pointer-events: none";
      Tools2_span2.style = "pointer-events: none";
      Tools2_span3.style = "pointer-events: none";
      Tools2_span4.style = "pointer-events: none";
    }
  });

  leave.addEventListener("click", function (event) {
    sessionStorage.clear();
  })
});