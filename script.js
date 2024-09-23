function validateForm() {
    // Регулярні вирази для перевірки
    const namePattern = /^[А-ЯІЇЄҐ][а-яіїєґ]{1,20} [А-ЯІЇЄҐ]\.[А-ЯІЇЄҐ]\.$/;
    const groupPattern = /^[А-ЯІЇЄҐ]{2}-\d{2}$/;
    const idCardPattern = /^[А-ЯІЇЄҐ]{2} №\d{8}$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Отримати значення форми
    const name = document.getElementById('name').value.trim();
    const group = document.getElementById('group').value.trim();
    const idCard = document.getElementById('idCard').value.trim();
    const birthDate = document.getElementById('birthDate').value.trim();
    const email = document.getElementById('email').value.trim();

    // Видалити виділення попередніх помилок і приховати повідомлення про помилки
    document.querySelectorAll('.input-field').forEach(input => input.classList.remove('error'));
    document.querySelectorAll('.error-message').forEach(span => span.style.display = 'none');

    let valid = true;

    // Перевірка кожного поля
    if (!namePattern.test(name)) {
        document.getElementById('name').classList.add('error');
        document.getElementById('nameError').style.display = 'block';
        valid = false;
    }
    if (!groupPattern.test(group)) {
        document.getElementById('group').classList.add('error');
        document.getElementById('groupError').style.display = 'block';
        valid = false;
    }
    if (!idCardPattern.test(idCard)) {
        document.getElementById('idCard').classList.add('error');
        document.getElementById('idCardError').style.display = 'block';
        valid = false;
    }
    if (!birthDate) {
        document.getElementById('birthDate').classList.add('error');
        document.getElementById('birthDateError').style.display = 'block';
        valid = false;
    }
    if (!emailPattern.test(email)) {
        document.getElementById('email').classList.add('error');
        document.getElementById('emailError').style.display = 'block';
        valid = false;
    }

    if (valid) {
        // Відображення введених даних у правому контейнері
        document.getElementById('outputName').innerText = `ПІБ: ${name}`;
        document.getElementById('outputGroup').innerText = `Група: ${group}`;
        document.getElementById('outputIdCard').innerText = `ID-card: ${idCard}`;
        document.getElementById('outputBirthDate').innerText = `Дата народження: ${birthDate}`;
        document.getElementById('outputEmail').innerText = `Пошта: ${email}`;
    } else {
        alert('Будь ласка, виправте помилки у формі');
    }
}

// Змінна для збереження останнього обраного користувачем кольору
let lastSelectedColor = '#000000';

// Створюємо таблицю 6х6 з номерами від 1 до 36
function createTable() {
  const table = document.getElementById('colorTable');
  let counter = 1;

  for (let i = 0; i < 6; i++) {
    const row = table.insertRow();

    for (let j = 0; j < 6; j++) {
      const cell = row.insertCell();
      cell.innerText = counter;
      cell.dataset.number = counter; // Встановлюємо значення клітинки як data-атрибут
      counter++;
      
      // Додаємо обробник наведення
      cell.addEventListener('mouseover', function () {
        const variantNumber = 8; // Вказуємо номер варіанта
        if (parseInt(cell.dataset.number) === variantNumber) {
          const randomColor = getRandomColor();
          cell.style.backgroundColor = randomColor;
          cell.style.color = getRandomColor(); // Змінюємо також колір тексту
        }
      });

      // Додаємо обробник кліку для зміни кольору тільки для клітинки номер 8
      cell.addEventListener('click', function () {
        const variantNumber = 8;
        if (parseInt(cell.dataset.number) === variantNumber) {
          // Якщо клітинка номер 8, відкриваємо палітру
          const colorPicker = document.getElementById('colorPicker');
          colorPicker.click(); // Імітуємо клік по палітрі
          colorPicker.onchange = function() {
            lastSelectedColor = colorPicker.value;
            cell.style.backgroundColor = lastSelectedColor;
            cell.style.color = '#FFFFFF'; // Робимо текст білим для контрасту
          };
        }
      });

      // Додаємо обробник подвійного кліку для зміни кольору стовпців через один тільки для клітинки номер 8
      cell.addEventListener('dblclick', function () {
        const variantNumber = 8;
        if (parseInt(cell.dataset.number) === variantNumber) {
          const colIndex = cell.cellIndex;
          changeColumnColors(colIndex, lastSelectedColor); // Зміна кольору на останній обраний
        }
      });
    }
  }
}

// Генерація випадкового кольору
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Функція для зміни кольору стовпців через один на обраний користувачем
function changeColumnColors(startIndex, color) {
  const table = document.getElementById('colorTable');
  const rows = table.rows;
  
  for (let i = 0; i < rows.length; i++) {
    for (let j = startIndex; j < rows[i].cells.length; j += 2) {
      rows[i].cells[j].style.backgroundColor = color;
      rows[i].cells[j].style.color = '#FFFFFF'; // Робимо текст білим для контрасту
    }
  }
}

// Викликаємо функцію створення таблиці при завантаженні сторінки
window.onload = function() {
  createTable();
};
