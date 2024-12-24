const jsonData = '[{"image": "image/blog/dev.jpg", "title": "Наша компания растет!", "text": "На данный момент новых новостей нет.", "date": "2 дня назад", "tags": ["Веб-разработка", "SEO-оптимизация", "Дизайн"], "likes": 42, "dislikes": 3}, {"image": "image/blog/card1.png", "title": "Идет набор сотрудников!", "text": "Ищем сотрудников на должность Fullstack разработчика. Иметь опыт работы от 8 лет", "date": "3 дня назад", "tags": ["Обучение сотрудников", "Наши клиенты", "Зарплата", "Работа"], "likes": 15, "dislikes": 1}, {"image": "image/blog/card2.jpg", "title": "Мы открылись!", "text": "Мы рады сообщить о запуске нашей новой компании. Присоединяйтесь к нам!", "date": "4 дня назад", "tags": ["Стартап", "Новости", "Компания"], "likes": 30, "dislikes": 5}, {"image": "image/blog/card3.png", "title": "Новые проекты", "text": "В нашей компании запускаются новые проекты в области веб-разработки. Следите за обновлениями.", "date": "5 дней назад", "tags": ["Проекты", "Веб-разработка", "Будущее"], "likes": 20, "dislikes": 2}]';

const cardHtml = `
    <section class="blog-card">
        <div class="blog-header">
            <div class="blog-cover"></div>
        </div>
        <div class="blog-body">
            <div class="blog-title"><h2></h2></div>
            <div class="blog-text"><p></p></div>
            <div class="blog-tags"><ul></ul></div>
            
            <!-- Секция лайков и дизлайков -->
            <div class="blog-feedback">
                <div class="like-dislike">
                    <button class="like-button">👍</button>
                    <span class="like-count"></span> 
                    <button class="dislike-button">👎</button>
                    <span class="dislike-count"></span>
                </div>
            </div>
            
            <!-- Футер с датой публикации -->
            <div class="blog-footer">
                <div class="blog-published-date"></div>
            </div>
        </div>
    </section>
`;

$(document).ready(() => {
    const data = JSON.parse(jsonData);
    drawCards(data);
    initCardsHandler();  // Инициализируем обработку кликов по тегам
    
    // Поиск по тексту
    $('.search-do').on('click', () => {
        const searchText = $('.search-text').val().toLowerCase();
        filter(searchText, data);
    });
});

// Обработчик кликов по тегам
function initCardsHandler() {
    // Это правильный способ привязки события для тегов внутри контейнера
    $(document).on('click', '.blog-tags a', (e) => {
        e.preventDefault();
        const searchTag = $(e.currentTarget).text().toLowerCase();
        filter(searchTag, data); // Вызываем фильтрацию при клике на тег
    });
}

// Лайк
$(document).on('click', '.like-button', function() {
    var likeCount = $(this).siblings('.like-count');
    likeCount.text(parseInt(likeCount.text()) + 1);
});

// Дизлайк
$(document).on('click', '.dislike-button', function() {
    var dislikeCount = $(this).siblings('.dislike-count');
    dislikeCount.text(parseInt(dislikeCount.text()) + 1);
});

// Функция фильтрации данных
function filter(searchText, data) {
    const filteredData = data.filter(item => 
        item.title.toLowerCase().includes(searchText) ||
        item.text.toLowerCase().includes(searchText) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchText))
    );
    
    drawCards(filteredData); // Отображаем отфильтрованные данные
}

// Рендеринг карточек
function drawCards(data) {
    $('.blog-container').html('');  // Очищаем контейнер перед добавлением новых данных

    data.forEach((item) => {
        let card = $(cardHtml);

        // Устанавливаем изображение фона
        card.find('.blog-cover').css('background-image', 'url("' + item.image + '")');

        // Заполняем остальные данные
        card.find('.blog-title h2').text(item.title);
        card.find('.blog-text p').text(item.text);
        card.find('.blog-published-date').text(item.date);

        // Лайки и дизлайки
        card.find('.like-count').text(item.likes || 0); 
        card.find('.dislike-count').text(item.dislikes || 0); 

        // Генерация тегов
        let tags = '';
        item.tags.forEach((tag) => {
            tags += '<li><a href="#">' + tag + '</a></li>'; 
        });

        card.find('.blog-tags ul').html(tags);

        // Добавляем карточку в контейнер
        $('.blog-container').append(card);
    });
}
