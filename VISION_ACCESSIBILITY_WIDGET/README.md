# Vision Accessibility Widget

**Vision Accessibility Widget** — це легкий Web Component для додавання на сайт accessibility-панелі для людей із порушенням зору.

Компонент дозволяє користувачу змінювати розмір шрифту, перемикати контрастні режими, використовувати простіший шрифт, збільшувати інтервали між літерами та повертатися до звичайної версії сайту.

Ідея компонента натхненна accessibility-блоком **“Людям із порушенням зору”**, який часто зустрічається на державних, комунальних та інформаційних сайтах.

---

## Features

- зміна розміру шрифту;
- висококонтрастний режим;
- світлий контрастний режим;
- простий читабельний шрифт;
- збільшені інтервали між літерами;
- повернення до звичайної версії сайту;
- збереження налаштувань у браузері;
- робота без сторонніх бібліотек;
- підтримка Shadow DOM;
- можна використовувати з HTML, Astro, React, Vue, Angular, Next.js та іншими фреймворками.

---

## Demo

Після підключення компонента на сайті зʼявляється кнопка:

**“Людям із порушенням зору”**

Після натискання відкривається панель з налаштуваннями доступності.

---

## Installation

Склонуйте репозиторій:

```bash
git clone git@github.com:M00rlock/pet-widgets.git
```

Перейдіть у папку проєкту:

```bash
cd pet-widgets
```

---

## Як додати віджет на сайт

### 1. Додайте файл компонента у проєкт

Наприклад, покладіть файл у папку:

```txt
public/vision-accessibility-widget.js
```

---

### 2. Підключіть скрипт на сторінці

```html
<script type="module" src="/vision-accessibility-widget.js"></script>
```

---

### 3. Додайте компонент у HTML

```html
<vision-accessibility-widget></vision-accessibility-widget>
```

Зазвичай компонент краще додавати перед закриваючим тегом `body`.

---

## Приклад повного підключення

```html
<body>
  <main>
    <!-- Site content -->
  </main>

  <vision-accessibility-widget></vision-accessibility-widget>

  <script type="module" src="/vision-accessibility-widget.js"></script>
</body>
```

---

## Підключення в Astro

Покладіть файл компонента в папку:

```txt
public/vision-accessibility-widget.js
```

Потім додайте його у головний layout, наприклад `BaseLayout.astro`:

```astro
<html lang="uk">
  <head>
    <script type="module" src="/vision-accessibility-widget.js"></script>
  </head>

  <body>
    <slot />

    <vision-accessibility-widget />
  </body>
</html>
```

---

## Підключення в React

Файл компонента можна покласти в `public`:

```txt
public/vision-accessibility-widget.js
```

Підключіть скрипт у головному HTML-файлі або layout:

```html
<script type="module" src="/vision-accessibility-widget.js"></script>
```

Після цього використовуйте компонент як звичайний HTML-елемент:

```jsx
<vision-accessibility-widget />
```

---

## Підключення в Next.js

Покладіть файл у папку:

```txt
public/vision-accessibility-widget.js
```

Підключіть його у `layout.tsx` або `layout.jsx`:

```jsx
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body>
        {children}

        <vision-accessibility-widget />

        <Script
          src="/vision-accessibility-widget.js"
          type="module"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
```

---

## Як це працює

Компонент додається на сторінку як окремий HTML-елемент.

Після підключення він:

1. показує кнопку внизу сторінки;
2. відкриває панель доступності;
3. додає CSS-класи до головного HTML-елемента сторінки;
4. змінює вигляд сайту залежно від вибраних налаштувань;
5. зберігає налаштування у `localStorage`;
6. автоматично застосовує їх при наступному відкритті сайту.

---

## Основні режими

### Розмір шрифту

Користувач може вибрати один із трьох режимів:

- звичайний розмір;
- збільшений розмір;
- дуже великий розмір.

Це допомагає людям, яким складно читати дрібний текст.

---

### Колір сайту

Компонент підтримує кілька візуальних режимів:

- звичайний вигляд сайту;
- висококонтрастний режим;
- світлий контрастний режим.

Контрастний режим робить текст і фон максимально помітними.

---

### Простий шрифт

Цей режим замінює основний шрифт сайту на простіший і читабельніший.

Це може бути корисно для людей, яким складно читати декоративні або занадто стилізовані шрифти.

---

### Збільшені інтервали

Цей режим трохи збільшує відстань між літерами та покращує висоту рядка.

Текст стає менш щільним і легшим для сприйняття.

---

### Звичайна версія сайту

Кнопка **“Звичайна версія сайту”** скидає всі налаштування доступності.

Після цього сайт повертається до стандартного вигляду.

---

## Accessibility

Компонент не замінює повноцінну доступність сайту, але допомагає покращити базову зручність для частини користувачів.

Його варто використовувати як додатковий інструмент разом із:

- правильною семантикою HTML;
- достатнім контрастом;
- зрозумілою навігацією;
- підтримкою клавіатурної навігації;
- коректними `aria`-атрибутами;
- адаптивною версткою;
- зрозумілими текстами;
- доступними формами.

---

## Важливо

Не варто покладатися лише на цей компонент як на єдине accessibility-рішення.

Основний сайт усе одно має бути зручним, читабельним і доступним без увімкнення спеціального режиму.

Компонент краще використовувати як додатковий шар поверх уже добре зробленого інтерфейсу.

---

## Де використовувати

Компонент добре підходить для:

- корпоративного сайту;
- портфоліо;
- сайту послуг;
- державного або комунального сайту;
- лендингу;
- блогу;
- інформаційного порталу;
- документації;
- навчального сайту.

---

## Browser Support

Компонент використовує стандартні можливості браузера:

- Custom Elements;
- Shadow DOM;
- CSS-класи;
- localStorage.

Підтримується сучасними браузерами:

- Chrome;
- Edge;
- Firefox;
- Safari;
- Opera.

---

## Project Structure

Приклад простої структури проєкту:

```txt
pet-widgets/
├── public/
│   └── vision-accessibility-widget.js
├── README.md
└── LICENSE
```

---

## Customization

Компонент можна адаптувати під свій сайт:

- змінити позицію кнопки;
- змінити текст кнопки;
- змінити кольори;
- змінити розміри шрифту;
- додати нові режими;
- змінити стилі панелі;
- інтегрувати в існуючу дизайн-систему.

---

## Local Development

Для базового використання не потрібна збірка або додаткові залежності.

Достатньо підключити JavaScript-файл на сторінку.

Якщо ви хочете протестувати локально, можна відкрити HTML-файл у браузері або використати простий локальний сервер.

Наприклад:

```bash
npx serve .
```

або:

```bash
python3 -m http.server
```

---

## GitHub

Репозиторій:

```txt
git@github.com:M00rlock/pet-widgets.git
```

---

## Roadmap

Можливі покращення в майбутньому:

- додати українську та англійську локалізацію;
- додати режим приховування зображень;
- додати режим підкреслення всіх посилань;
- додати режим збільшеного курсора;
- додати keyboard shortcuts;
- додати npm-пакет;
- додати демо-сторінку;
- додати тести;
- додати TypeScript-версію.

---

## Contributing

Pull requests are welcome.

Якщо хочете покращити компонент:

1. зробіть fork репозиторію;
2. створіть окрему гілку;
3. внесіть зміни;
4. відкрийте Pull Request.

---

## Author

**Oleksandr Vasyliev**

GitHub: [M00rlock](https://github.com/M00rlock)

---

## License

This project is licensed under the MIT License.

See the [LICENSE](LICENSE) file for details.

---

## MIT License

```txt
MIT License

Copyright (c) 2026 Oleksandr Vasyliev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files, to deal in the Software
without restriction, including without limitation the rights to use, copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
