$(document).ready(function(){
$('.slick-slider').slick({

  speed: 300,
  slidesToShow: 3,
  slidesToScroll: 1
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  
});
  //   $('.slider_thumb').slick({
  //     arrows:false, // スライドの左右の矢印ボタン
  //     asNavFor:'.thumb' // スライダを他のスライダのナビゲーションに設定する（class名またはID名）
  // });
  // $('.thumb').slick({
  //     asNavFor:'.slider_thumb', // スライダを他のスライダのナビゲーションに設定する（class名またはID名）
  //     focusOnSelect: true, // クリックでのスライド切り替えを有効にするか
  //     slidesToShow:4, // 表示するスライド数を設定
  //     slidesToScroll:1 // スクロールするスライド数を設定
  // });  
//   $('.slick-slider').slick({
//   dots: true,
//   infinite: true,
//   speed: 300,
//   slidesToShow: 2
// });
  // $('.slick-slider').slick({
  //   dots: true,
  //   infinite: true,
  //   speed: 500,
  //   fade: true,
  //   cssEase: 'linear',
  //   autoplay: true,
  //   autoplaySpeed: 2500,
  //   arrows: true,
  // });
});