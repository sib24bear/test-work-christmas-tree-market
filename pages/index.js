const carouselInner = document.querySelector('.carousel__inner');
const carouselItems = document.querySelectorAll('.carousel__item');
const pagination = document.querySelector('.carousel__pagination');
const galleryContainer = document.querySelector('.gallery__container');
const gallery = document.querySelector('.gallery');
const galleryItems = document.querySelectorAll('.gallery__item');
const nextButton = document.querySelector('.gallery__button');
const scrollToTopButton = document.querySelector('.scroll-to-top-button');
const mouseWheelScrollSpeed = 10;
const scrollThreshold = 200;

let currentSlideIndex = 1;
let scrollStep = 400;
let timeoutId;

// Создание пагинации
for (let i = 0; i < carouselItems.length - 2; i++) {
    const button = document.createElement('button');
    button.addEventListener('click', function() {
    showSlide(i + 1);
    });
    pagination.appendChild(button);
}

const paginationButtons = pagination.getElementsByTagName('button');

// Функция для показа указанного слайда
function showSlide(index) {
    // Скрытие текущего активного слайда и кнопки пагинации
    carouselItems[currentSlideIndex].classList.remove('active');
    paginationButtons[currentSlideIndex - 1].classList.remove('active');

    // Отображение нового слайда и кнопки пагинации
    carouselInner.style.transform = `translateX(calc(-${index}00% / var(--slide-count)))`;
    carouselItems[index].classList.add('active');
    paginationButtons[index - 1].classList.add('active');

    currentSlideIndex = index;
}

// Показ первого слайда
showSlide(4);

// Автоматическое переключение слайдов каждые 4 секунды
setInterval(function() {
    let nextSlideIndex = (currentSlideIndex + 1) % (carouselItems.length - 1);
    if (nextSlideIndex === 0) {
        nextSlideIndex = 1;
    }
    showSlide(nextSlideIndex);
}, 4000);

// Обработчик для пролистывания вперед
nextButton.addEventListener('click', function() {
    galleryContainer.scrollBy({
        left: scrollStep,
        behavior: 'smooth'
    });
});

// Обработчик для прокрутки колесика мыши
galleryContainer.addEventListener('wheel', function(event) {
    event.preventDefault();
    galleryContainer.scrollBy({
        left: event.deltaY * mouseWheelScrollSpeed,
        behavior: 'smooth'
    });
});

// Обработчик для обратной прокрутки
galleryContainer.addEventListener('scroll', function() {
    if (galleryContainer.scrollLeft + galleryContainer.offsetWidth === galleryContainer.scrollWidth) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function() {
            galleryContainer.scrollTo({
            left: 0,
            behavior: 'smooth'
            });
        }, 2000);
    }
});

// Показывать/скрывать кнопку при прокрутке страницы
window.addEventListener('scroll', function() {
    if (window.pageYOffset > scrollThreshold) {
      scrollToTopButton.classList.add('active');
    } else {
      scrollToTopButton.classList.remove('active');
    }
});

// Прокрутка страницы наверх при клике на кнопку
scrollToTopButton.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
});
