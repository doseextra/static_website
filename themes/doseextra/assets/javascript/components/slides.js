/// Home sliders
const sliders = [...document.querySelectorAll('.single-slider')];
let index;
let activeSlide;
let status = false;

function changeThemeColors(theme) {
  const header = document.querySelector('.header-container');
  header.setAttribute('data-theme', theme);
}

function prevSlider() {
  sliders[index - 1].classList.remove('last-current');
  sliders[index - 1].classList.add('is-current');
  sliders[index].classList.remove('is-current');
  sliders[index].classList.add('last-current');
  changeThemeColors(sliders[index - 1].getAttribute('data-theme'));
}

function nextSlider() {
  sliders[index + 1].classList.remove('last-current');
  sliders[index + 1].classList.add('is-current');
  sliders[index].classList.add('last-current');
  sliders[index].classList.remove('is-current');
  changeThemeColors(sliders[index + 1].getAttribute('data-theme'));
}

function wheelSlider(event) {
  event.preventDefault();
  if (event.deltaY < 0) {
    if (index > 0) {
      prevSlider();
    }
  } else if (event.deltaY > 0) {
    const length = sliders.length;
    if (index < (length - 1)) {
      nextSlider();
    }
  }
};

function keySlider(event) {
  switch (event.keyCode) {
    case 38:	//up
      event.preventDefault();
      if (index > 0) {
        prevSlider();
      }
      break;
    case 40: // down
      event.preventDefault();
      const length = sliders.length;
      if (index < (length - 1)) {
        nextSlider();
      }
      break;
  }
}

function wheelHandler(event) {
  event.preventDefault();
  if (!status) {
    activeSlide = document.querySelector('.is-current');
    index = sliders.indexOf(activeSlide);
    if (!activeSlide || index === -1) {
      return;
    }
    wheelSlider(event);
    status = true
    setTimeout(() => status = false, 500)
  }
};

function keyHandler(event) {
  event.preventDefault();
  if (!status) {
    activeSlide = document.querySelector('.is-current');
    index = sliders.indexOf(activeSlide);
    if (!activeSlide || index === -1) {
      return;
    }
    keySlider(event);
    status = true
    setTimeout(() => status = false, 500)
  }
}

['keydown', 'keyup'].forEach(event => {
  document.addEventListener(event, keyHandler);
});
document.addEventListener('wheel', wheelHandler, { passive: false });

