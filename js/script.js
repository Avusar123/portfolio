window.onscroll = function() {headerscroll()};
var header = document.querySelector(".header");
var sticky = header.offsetTop;
function headerscroll() {
  const getBlocksMap = getBlocks()
  const sectionow = getsection(getBlocksMap)
  const sectionowlink = sectionow.parentNode
  if (!sectionowlink.classList.contains('header__menu_active')) {
    getBlocksMap.forEach((value,key) => {
      const link = key
      if (link.parentNode.classList.contains('header__menu_active')) {
          link.parentNode.classList.remove('header__menu_active')
      }
    })
    sectionowlink.classList.add('header__menu_active')
  }
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}
function getsection(getBlockMap) {
  var max = 0
  var maxi
  getBlockMap.forEach((key,value) => {
    if (window.pageYOffset >= key && key >= max) {
        maxi = value
        max = key
    }
  })
  return maxi
}
function getBlocks() {
  const links = document.querySelectorAll('a[data-goto]')
  var result = new Map()
  links.forEach(link => {
    if ((link.getAttribute('data-goto')) && (document.querySelector(link.getAttribute('data-goto')))) {
      const gotoBlock = document.querySelector(link.getAttribute('data-goto'))
      var gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight
      if (gotoBlockValue < 0) {
        gotoBlockValue = 0
      }

      result.set(link,Math.floor(gotoBlockValue))
    }
  })
  return result
}
$(document).ready(function(){
  $('.slider-container').slick({
    arrows:false,
    dots:true,
    infinite:false
  });
  $('.burger-menu').click(function(){
    $('.header').toggleClass('header-active')
    $('.burger-menu').toggleClass('burger-active')
    $('body').toggleClass('locked')
  })
   $('a[data-goto]').click(function(e){
     if ($(this).attr('data-goto') && document.querySelector($(this).attr('data-goto'))) {
       if ($('.header').hasClass('header-active') && $('.burger-menu').hasClass('burger-active')) {
        $('.burger-menu').click()
       }
       const getBlocksMap = getBlocks()
       window.scrollTo({
         top: getBlocksMap.get($(this)[0]),
         behavior: "smooth"
       });
       e.preventDefault()
     }
   })
});