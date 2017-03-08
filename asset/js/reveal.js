window.sr = ScrollReveal().reveal('.fadeInDown, .fadeInRight, .fadeInUp');
sr.reveal('.fadeInDown', { duration: 1000, origin: 'bottom', delay: 200, reset: true, useDelay: 'onload'});
sr.reveal('.fadeInRight', { duration: 1000, origin: 'right', delay: 200, reset: true, useDelay: 'onload'});
sr.reveal('.fadeInUp', { duration: 500, origin: 'up', reset: true}, useDelay: 'onload');
