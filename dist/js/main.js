// _________________________ lenis Setup _________________________
const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

// _________________________ Placeholders _________________________
document.getElementById('loveEmail').innerText = 'loveloom66@gmail.com';
document.getElementById('loveEmail').href = 'mailto:loveloom66@gmail.com';
document.getElementById('lovePhone').innerText = '+2001018326780';
document.getElementById('lovePhone').href = 'tel:2001018326780';
document.getElementById('currentYear').innerText = new Date().getFullYear();
// _________________________ Navbar _________________________
const links = document.querySelectorAll('.hNav li button');

links.forEach((link) => {
  link.addEventListener('click', (e) => {
    links.forEach((link) => {
      link.classList.remove('active');
    });
    e.target.classList.add('active');
  });
});

const navBtn = document.querySelector('.navBtn');

document.addEventListener('scroll', () => {
  if (window.scrollY > 250) {
    navBtn.classList.add('show');
  } else {
    navBtn.classList.remove('show');
  }
});

document.querySelectorAll('[data-scroll-to]').forEach((element) => {
  element.addEventListener('click', (e) => {
    e.preventDefault();
    const target = e.target.dataset.scrollTo;
    const targetElement = document.getElementById(target);
    console.log(targetElement);
    lenis.scrollTo(targetElement, 0);
  });
});

const Hamburger = document.querySelector('.hamburger');
const Nav = document.querySelector('.hNav');
Hamburger.addEventListener('click', () => {
  Hamburger.classList.toggle('open');
  if (Hamburger.classList.contains('open')) {
    Nav.style.visibility = 'visible';
  } else {
    Nav.style.visibility = 'hidden';
  }
});

// _________________________ Magneto _________________________
const magneto = document.querySelector('.magneto');
const magnetoText = document.querySelector('.magneto .text');

// mouse move
const activateMagneto = (event) => {
  let boundBox = magneto.getBoundingClientRect();
  const magnetoStrength = 10;
  const magnetoTextStrength = 40;
  const newX = (event.clientX - boundBox.left) / magneto.offsetWidth - 0.5;
  const newY = (event.clientY - boundBox.top) / magneto.offsetHeight - 0.5;

  gsap.to(magneto, {
    duration: 1,
    x: newX * magnetoStrength,
    y: newY * magnetoStrength,
    ease: Power4.easeOut,
  });

  gsap.to(magnetoText, {
    duration: 1,
    x: newX * magnetoTextStrength,
    y: newY * magnetoTextStrength,
    ease: Power4.easeOut,
  });
};

// mouse leave
const resetMagneto = (event) => {
  gsap.to(magneto, {
    duration: 1,
    x: 0,
    y: 0,
    ease: Elastic.easeOut,
  });

  gsap.to(magnetoText, {
    duration: 1,
    x: 0,
    y: 0,
    ease: Elastic.easeOut,
  });
};

magneto.addEventListener('mousemove', activateMagneto);
magneto.addEventListener('mouseleave', resetMagneto);
// _________________________ text typewriter _________________________
const words = ['love story', 'Wedding', 'Engagement', 'Memories'];

let mainTimeLine = gsap.timeline({
  repeat: -1,
});

words.forEach((word) => {
  let textTimeLine = gsap.timeline({
    repeat: 1,
    yoyo: true,
    repeatDelay: 2,
  });

  textTimeLine.to('#typewriter', {
    text: word,
    duration: 0.9,
    onUpdate: () => {
      blink.restart();
      blink.pause();
    },
    onComplete: () => {
      blink.resume();
    },
  });

  mainTimeLine.add(textTimeLine);
});

/* blink */
let blink = gsap.timeline({
  repeat: -1,
  repeatDelay: 0.2,
});

blink
  .to('#curser', {
    opacity: 1,
    duration: 0,
  })
  .to('#curser', {
    opacity: 0,
    duration: 0,
    delay: 0.4,
  });

// _________________________ ScrollTrigger _________________________

const entries = document.querySelectorAll('.entry');

entries.forEach((entry) => {
  let entryMeta = entry.querySelector('.entry__meta');
  let entryMedia = entry.querySelector('.entry__media');

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: entry,
      start: 'top bottom',
      end: 'bottom 90%',
      scrub: true,
    },
  });

  tl.fromTo(
    entryMeta,
    {
      xPercent: -100,
      opacity: 0,
    },
    {
      xPercent: 0,
      opacity: 1,
    }
  );

  tl.fromTo(
    entryMedia,
    {
      xPercent: 100,
      opacity: 0,
    },
    {
      xPercent: 0,
      opacity: 1,
    },
    '<'
  );
});
