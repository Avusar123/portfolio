window.onscroll = function() {headerscroll()};
var header = document.querySelector(".header");
var sticky = header.offsetTop;
function headerscroll() {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
$(document).ready(function(){
    $('.burger-menu').click(function(){
      $('.header').toggleClass('header-active')
      $('.burger-menu').toggleClass('burger-active')
      $('body').toggleClass('locked')
    })
  });