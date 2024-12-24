$(document).ready(() => {
    let currentSlide = 0;
    let isBusy = false;
    
    $('.slider-arrow').on('click', (e) => {
        const that = $(e.currentTarget);
        const slidesCount = slider.length - 1;  

        if (!isBusy) {
            if (that.hasClass('right')) {
                currentSlide += 1;
                if (currentSlide > slidesCount) currentSlide = 0;
            } else {
                currentSlide -= 1;
                if (currentSlide < 0) currentSlide = slidesCount;
            }
            isBusy = true;
            $('.slider-image').animate({'opacity': 0}, 350, () => {
                // Обновление фонового изображения
                $('.slider-image').css('background-image', 'url(' + slider[currentSlide] + ')');
                // Плавная анимация для появления изображения
                $('.slider-image').animate({'opacity': 1}, 350, () => {
                    isBusy = false; 
                });
            });
        }
    });
});

const slider = [
    'image/gallery/bootstrap04.jpg',
    'image/gallery/responsiveslider.png',
    'image/gallery/sliderimages.png',
    'image/gallery/slidertype.png',
];
