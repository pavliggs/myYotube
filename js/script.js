'use strict';

// функция сработает только после полной прогрузки DOM-дерева
document.addEventListener('DOMContentLoaded', () => {

    {
        const keyboardButton = document.querySelector('.search-form__keyboard');
        const keyboard = document.querySelector('.keyboard');
        const closeKeyboard = document.getElementById('close-keyboard');
        const searchInput = document.querySelector('.search-form__input');

        const toggleKeyboard = () => {
            keyboard.style.top = keyboard.style.top ? '' : '50%';
        };

        const pressing = event => {
            const target = event.target;
            
            // функция будет срабатывать только при нажатии на тег button
            if (target.tagName.toLowerCase() === 'button') {
                // будет выводить содержимое тега, убирая при помощи trim пробелы со всех сторон
                searchInput.value += target.textContent.trim();
            }

            // backspace
            if (target.getAttribute('id') === 'keyboard-backspace') {
                searchInput.value = searchInput.value.slice(0, -2);
            }

            // space
            if (target.getAttribute('id') === 'keyboard-space') {
                searchInput.value += ' ';
            }

            /* проверяем есть ли у button атрибут id = keyboard-backspace
            и если это так, то удаляем предыдущий элемент */
            // if (target.getAttribute('id') === 'keyboard-backspace') {
            //     searchInput.value = searchInput.value.slice(0, -2);
            // }
        };
        
        // при клике всплывает клавиатура и наоборот, в зависимости от условия
        keyboardButton.addEventListener('click', toggleKeyboard); 
        closeKeyboard.addEventListener('click', toggleKeyboard);
        keyboard.addEventListener('click', pressing);
    }

    // Меню
    {
        const burger = document.querySelector('.spinner');
        const sidebarMenu = document.querySelector('.sidebarMenu');

        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
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

    // Модалка
    {

    }


});



