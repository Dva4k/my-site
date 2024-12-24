window.onload=function(){
    const hamburger = document.getElementById("hamburger");

    hamburger.onclick = function () {
        let topNav = document.getElementById("myTopnav");
        if(topNav.className === 'responsive'){
            topNav.className='';
        } else {
            topNav.className = "responsive";
        }
    }

    const menuList = document.querySelectorAll('.menu-element');
    menuList.forEach(function (element) {
        element.addEventListener('click',function (event){
            const elementLink = element.dataset.link;
            if(elementLink) {
                event.preventDefault();
                document.getElementById(elementLink).scrollIntoView({behavior: 'smooth'});
            }
            
        });
    });
}
// Создание обработчика клика в JQuery
$(document).ready(() => {
    $('.portfolio-item').on('click', function (e) {
        // Вызов функции createPopup с переданным элементом
        createPopup(this);
    });
});

// Функция, выполняющая действия по клику на активный элемент
function createPopup(item) {
    console.log(item);  // Здесь можно реализовать отображение попапа или любые другие действия
   //Передаем HTML В JQuery переменную
    const clicked = $(item);
    const src = clicked.data('src');
// создаем блок-контейнер
const container = $('<div>',{'class':'popup-container'});
   //создаем картинку
const img = $('<img>', {'class': 'popup','src': src});
// добавляем картинку в род. блок
    container.append(img);
//блок с картинкой рисуем в html документ
    $('body').append(container);
    setTimeout(() => {
        container.addClass('ready');
    });
    
    img.on('click',() => {
        container.removeClass('ready');
        setTimeout(() => {
            container.remove();
        }, 250);
     
    });
}

$(document).ready(() => {
    $('.portfolio-item').on('click', (e) => {
e.stopPropagation();
createPopup(e.currentTarget);
    });


//щелчок по кнопке отзывов
$('.control-item').on('click', (e) => {
    e.stopPropagation();
    slideTestimonials(e.currentTarget);
    });
});

// Функция переключения слайдов
function slideTestimonials(item) {
    // Переводим элемент в jQuery
    const clicked = $(item);

    // Если элемент уже активен, ничего не делаем
    if (clicked.hasClass('active')) {
        return;
    }

    // Номер кнопки (индекс)
    const index = $(item).index();  // Получаем индекс кнопки

    // Ширина одного слайда
    const width = $('.testimonials-card').outerWidth(true); // Используем правильный селектор

    // Смещение для контейнера с слайдами
    const scroll = width * index;

    // Перемещаем контейнер с слайдами
    $('.testimonials-inner').css('transform', 'translateX(-' + scroll + 'px)');

    $('.control-item').removeClass('active');
    $('.control-item').eq(index).addClass('active');
}
//функция для анимации цифр.
$(document).ready(() => {
    $('.countup').each(function() {
        const that =$(this),
        countTo = that.attr('data-end');
        $({countNum: 0}).animate({
            countNum: countTo
        },
    {
        duration: 3000,
        easing: 'linear',
        step: function() {
            that.text(Math.floor(this.countNum));
        },
        complete:function() {
            that.text(this.countNum);
        }
    });
});
});

