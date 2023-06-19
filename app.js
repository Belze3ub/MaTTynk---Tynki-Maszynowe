window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  const hero = document.querySelector('.hero');
  loader.classList.add('loader-hidden');

  loader.addEventListener('animationend', () => {
    document.body.style.overflow = 'auto';
    if (hero) hero.style.animationPlayState = 'running';
    loader.style.display = 'none';
  });
});

const hamburger = document.querySelector('.hamburger');
const mobileNavigation = document.querySelector('.navigation');

hamburger.addEventListener('click', (e) => {
  hamburger.classList.toggle('hamburger-active');
  mobileNavigation.classList.toggle('navigation-active');
});

const year = document.querySelector('#year');
const date = new Date();
year.innerText = date.getFullYear();

function handleSection(entries, observer, className) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      document.querySelectorAll('.grid-item').forEach(function (item) {
        if (item.parentNode.parentNode.parentNode.className === className) {
          item.classList.add('show');
        }
      });
      observer.unobserve(entry.target);
    }
  });
}

function createSectionObserver(sectionClass) {
  const section = document.querySelector(`.${sectionClass}`);
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5,
  };
  const observer = new IntersectionObserver(function (entries, observer) {
    handleSection(entries, observer, sectionClass);
  }, options);

  if (section) observer.observe(section);
}

createSectionObserver('offer');
createSectionObserver('why-choose-us');
createSectionObserver('showcase');

const gallery = document.querySelector('.gallery-container');
const openImg = document.querySelectorAll('.image');
const closeImg = document.querySelector('.close');
const overlay = document.querySelector('.overlay');

openImg.forEach((img) => {
  img.addEventListener('click', (e) => {
    const imgLoader = document.querySelector('.img-loader');
    imgLoader.classList.add('img-loader-active');
    document.body.style.overflow = 'hidden';
    const src = img.src.replace('_downsized', '');
    const lowResSrc = img.src;
    img.src = src;
    gallery.firstElementChild.src = src;
    img.addEventListener('load', () => {
      imgLoader.classList.remove('img-loader-active');
      gallery.classList.add('gallery-container-open');
      overlay.classList.add('overlay_active');
    });

    img.addEventListener('error', () => {
      img.src = lowResSrc;
    });
  });
});

if (closeImg) {
  closeImg.addEventListener('click', () => {
    gallery.classList.remove('gallery-container-open');
    overlay.classList.remove('overlay_active');
    document.body.style.overflow = 'auto';
  });
}

if (overlay) {
  overlay.addEventListener('click', () => {
    gallery.classList.remove('gallery-container-open');
    overlay.classList.remove('overlay_active');
    document.body.style.overflow = 'auto';
  });
}
