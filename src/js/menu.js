// function open() {
//   var menu = document.getElementsByClassName('mobile-menu')[0];
//   menu.style.display = 'block';
//   console.log('Openned menu');
// };
//
// function close() {
//   var menu = document.getElementsByClassName('mobile-menu')[0];
//   menu.style.display = 'none';
//   console.log('Closed menu');
// };

function togglemenu() {
  var menu = document.getElementsByClassName('mobile-menu')[0];
  var open = document.getElementsByClassName('fa-bars')[0];
  var close = document.getElementsByClassName('fa-times')[0];

  // If the menu is open, close it
  if (menu.style.display == 'block') {
    menu.style.display = 'none';
    close.style.display = 'none';
    open.style.display = 'block';
  } else {
    menu.style.display = 'block';
    close.style.display = 'block';
    open.style.display = 'none';
  }
};
