$(document).ready(function () {
  $(".fa-bars").on("click", function (e) {
    e.preventDefault();
    $(".navbar").toggleClass("menu-show");
  });
  $("body").click(function (e) {
    if (!$(e.target).hasClass("fa-bars")) {
      $(".navbar").removeClass("menu-show");
    }
  });
});
