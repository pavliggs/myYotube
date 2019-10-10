'use strict';

// функция сработает только после полной прогрузки DOM-дерева
document.addEventListener('DOMContentLoaded', () => {

    // всплывающая клавиатура
    {
        const keyboardButton = document.querySelector('.search-form__keyboard'),
            keyboard = document.querySelector('.keyboard'),
            closeKeyboard = document.getElementById('close-keyboard'),
            searchInput = document.querySelector('.search-form__input');

        const toggleKeyboard = () => {
            keyboard.style.top = keyboard.style.top ? '' : '50%';
        };

        const changeLang = (btn, lang) => {
            const langRu = ['ё', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
                'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ',
                'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э',
                'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.',
                'en', ' '
            ];
            const langEn = ['`', 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '=', '⬅',
                'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']',
                'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '"',
                'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/',
                'ru', ' '
            ];

            // заменяем контент у элемента на контент из массивов langRu или langEn
            if (lang === 'en') {
                btn.forEach( (elem, i) => {
                    elem.textContent = langEn[i];
                });
            } else {
                btn.forEach( (elem, i) => {
                    elem.textContent = langRu[i];
                });
            }
        };

        const pressing = event => {
            const target = event.target;

            // функция будет срабатывать только при нажатии на тег button
            if (target.tagName.toLowerCase() === 'button') {
                // получает содержимое тега, убирая все пробелы со всех сторон пр  помощи trim()
                const contentButton = target.textContent.trim();

                /* при помощи [...keyboard и тд] мы получаем все кнопки на клавиатуре в виде массива,
                далее применяется метод filter, который перебирает все элементы и убирает те,
                у которых visibility: hidden */
                const buttons = [...keyboard.querySelectorAll('button')].
                filter(elem => elem.style.visibility !== 'hidden');

                // backspace & space
                if (target.getAttribute('id') === 'keyboard-backspace') {
                    // строка является массивом и из массива удаляется последний элемент
                    searchInput.value = searchInput.value.slice(0, -1);
                } else if (target.getAttribute('id') === 'keyboard-space') {
                    searchInput.value += ' ';
                } else if (contentButton === 'en' || contentButton === 'ru') {
                    changeLang(buttons, contentButton);
                } else {
                    // будет выводить содержимое тега, убирая при помощи trim пробелы со всех сторон
                    searchInput.value += contentButton;
                }
            }
        };

        // при клике всплывает клавиатура и наоборот, в зависимости от условия
        keyboardButton.addEventListener('click', toggleKeyboard);
        closeKeyboard.addEventListener('click', toggleKeyboard);
        keyboard.addEventListener('click', pressing);
    }

    // Меню
    {
        const burger = document.querySelector('.spinner'),
            sidebarMenu = document.querySelector('.sidebarMenu');

        burger.addEventListener('click', () => {
            burger.classList.toggle('active'); // если класс отсутствует, то добавляет, иначе - убирает
            sidebarMenu.classList.toggle('rollUp');
        });

        sidebarMenu.addEventListener('click', (event) => {
            let target = event.target;
            /* closest ищет у элемента прописанный селектор и если не находит,
            то переходит к родителю и ищет там, и так далее пока не найдёт, 
            а если не найдёт то выведет null */
            target = target.closest('a[href="#"]');

            if (target) {
                // parentNode получает родителя у элемента
                const parentTarget = target.parentNode;
                console.log(parentTarget);
                sidebarMenu.querySelectorAll('li').forEach(elem => {

                    // если elem совпадает с нажатым элементом, то присваиваем класс
                    if (elem === parentTarget) {
                        elem.classList.add('active');
                    } else {
                        elem.classList.remove('active');
                    }
                });
            }
        });
    }

    // Модальное окно
    {
        // вставляет в конец body структуру html (в принципе можно это написать сразу в html файле)
        document.body.insertAdjacentHTML('beforeend', `
            <div class="youTuberModal">
                <div id="youtuberClose">&#215;</div>
                <div id="youtuberContainer"></div>
            </div>
        `);

        const youtuberItems = document.querySelectorAll('[data-youtuber]'),
            divYoutuber = document.querySelector('.youTuberModal'),
            youtuberContainer = document.getElementById('youtuberContainer');

        // значения ширины и значения высоты в видео на youtube
        const qw = [3840, 2560, 1920, 1280, 854, 640, 426, 256],
            qh = [2160, 1440, 1080, 720, 480, 360, 240, 144];

        // функция, в которой разрешение контейнера с iframe подстраивается под разрешение монитора
        const sizeVideo = () => {
            // ширина и высота экрана монитора
            let ww = document.documentElement.clientWidth,
                wh = document.documentElement.clientHeight;

            for (let i = 0; i < qw.length; i++) {
                if (ww > qw[i]) {

                    // при помощи cssText можно прописывать css стили
                    youtuberContainer.querySelector('iframe').style.cssText = `
                        width: ${qw[i]}px;
                        height: ${qh[i]}px;
                    `;

                    youtuberContainer.style.cssText = `
                        width: ${qw[i]}px;
                        height: ${qh[i]}px;

                        // контейнер выравнивается по середине экрана монитора
                        top: ${(wh - qh[i]) / 2}px;
                        left: ${(ww - qw[i]) / 2}px;
                    `;

                    break;
                }
            }
        };    

        youtuberItems.forEach(elem => {
            elem.addEventListener('click', () => {
                // при нажатии на элемент в константу записывается содержание аттрибута data-youtuber
                const idVideo = elem.dataset.youtuber;
                divYoutuber.style.display = 'block';
                const youTuberFrame = document.createElement('iframe');
                youTuberFrame.src = `https://youtube.com/embed/${idVideo}`;
                youtuberContainer.insertAdjacentElement('beforeend', youTuberFrame);
                // при изменении размера экрана браузера будет изменяться размер видео
                window.addEventListener('resize', sizeVideo);
                sizeVideo();
            });
        });

        divYoutuber.addEventListener('click', () => {
            divYoutuber.style.display = ''; // закрывается модалка при клике не на iframe
            youtuberContainer.textContent = ''; // очистка контейнера
            window.removeEventListener('resize', sizeVideo); // удаляется событие при закрытии модалки
        });
    }

    // YouTube
    {
        const API_KEY = 'AIzaSyAjw7QgqqQI-tWLtkdreGwQAp2zGjqEFhM';
        const CLIENT_ID = '792788208687-2b59v9tcknlqk6hn0uu0kn2gil6tjs0g.apps.googleusercontent.com';
    }
});

