/**
 * app.js — основная логика таймера обратного отсчёта.
 * Использует IIFE для изоляции кода от глобальной области видимости.
 * Зависит от window.CountdownData (файл data.js).
 */
(function () {
  'use strict';

  var DATA = window.CountdownData;

  /* --- Ключ для сохранения в localStorage --- */
  var STORAGE_KEY = 'countdownEvent';

  /* --- Ссылки на элементы DOM --- */
  var elements = {
    customForm: document.getElementById('custom-form'),
    eventName: document.getElementById('event-name'),
    eventDate: document.getElementById('event-date'),
    eventInfo: document.getElementById('event-info'),
    countdown: document.getElementById('countdown'),
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
    timerMessage: document.getElementById('timer-message'),
    progress: document.getElementById('progress'),
    progressFill: document.getElementById('progress-fill'),
    progressPercent: document.getElementById('progress-percent'),
    progressTrack: document.getElementById('progress-track'),
    progressHint: document.getElementById('progress-hint'),
    factText: document.getElementById('fact-text'),
    quoteText: document.getElementById('quote-text'),
    dayImage: document.getElementById('day-image'),
    imageCaption: document.getElementById('image-caption'),
    confirmModal: document.getElementById('confirm-modal'),
    modalText: document.getElementById('modal-text'),
    currentYear: document.getElementById('current-year'),
    presetButtons: document.querySelectorAll('.btn--preset')
  };

  /* --- Текущее состояние приложения --- */
  var state = {
    eventName: '',
    eventDate: null,       // объект Date (полночь выбранного дня)
    eventType: 'custom',   // birthday | vacation | newyear | custom
    startDate: null,       // момент установки таймера (начало прогресс-бара)
    timerId: null,         // id интервала setInterval
    pendingEvent: null     // событие, ожидающее подтверждения
  };

  /* --- Вспомогательные функции --- */

  /**
   * Возвращает номер дня в году (1–366) для «факта/цитаты дня».
   * Один и тот же факт показывается весь день.
   */
  function getDayOfYear() {
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = now - start;
    var oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }

  /**
   * Псевдослучайный индекс на основе дня года и «соли» (salt).
   * salt разный для фактов и цитат, чтобы они не совпадали.
   */
  function getDailyIndex(arrayLength, salt) {
    var day = getDayOfYear();
    return (day * 31 + salt) % arrayLength;
  }

  /**
   * Форматирует дату для отображения: «15 июня 2026 г.»
   */
  function formatDate(date) {
    var months = [
      'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
      'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];
    return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear() + ' г.';
  }

  /**
   * Дополняет число нулём слева до двух знаков.
   */
  function pad(num) {
    return num < 10 ? '0' + num : String(num);
  }

  /**
   * Вычисляет дату следующего Нового года (1 января).
   */
  function getNextNewYear() {
    var now = new Date();
    var year = now.getFullYear();
    var newYear = new Date(year, 0, 1, 0, 0, 0, 0);
    if (now >= newYear) {
      newYear = new Date(year + 1, 0, 1, 0, 0, 0, 0);
    }
    return newYear;
  }

  /**
   * Вычисляет дату начала летних каникул (1 июня).
   * Если июнь уже прошёл — берём следующий год.
   */
  function getNextVacation() {
    var now = new Date();
    var year = now.getFullYear();
    var vacation = new Date(year, 5, 1, 0, 0, 0, 0); // 1 июня
    if (now >= vacation) {
      vacation = new Date(year + 1, 5, 1, 0, 0, 0, 0);
    }
    return vacation;
  }

  /**
   * Для дня рождения: если дата в этом году прошла, переносим на следующий год.
   * @param {string} dateStr — строка формата YYYY-MM-DD
   */
  function getNextBirthday(dateStr) {
    var parts = dateStr.split('-');
    var month = parseInt(parts[1], 10) - 1;
    var day = parseInt(parts[2], 10);
    var now = new Date();
    var year = now.getFullYear();
    var birthday = new Date(year, month, day, 0, 0, 0, 0);

    if (now >= birthday) {
      birthday = new Date(year + 1, month, day, 0, 0, 0, 0);
    }
    return birthday;
  }

  /**
   * Создаёт объект Date из строки input[type=date] (полночь локального времени).
   */
  function parseInputDate(dateStr) {
    var parts = dateStr.split('-');
    return new Date(
      parseInt(parts[0], 10),
      parseInt(parts[1], 10) - 1,
      parseInt(parts[2], 10),
      0, 0, 0, 0
    );
  }

  /**
   * Сохраняет текущее событие в localStorage.
   */
  function saveToStorage() {
    if (!state.eventDate) return;

    var data = {
      eventName: state.eventName,
      eventDate: state.eventDate.toISOString(),
      eventType: state.eventType,
      startDate: state.startDate ? state.startDate.toISOString() : new Date().toISOString()
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      // localStorage может быть недоступен — просто игнорируем
    }
  }

  /**
   * Пересчитывает дату для повторяющихся событий (пресеты).
   * Нужно при каждой загрузке страницы, чтобы таймер всегда
   * показывал ближайшее будущее наступление события.
   */
  function recalculatePresetDate(type, storedDate) {
    if (type === 'newyear') {
      return getNextNewYear();
    }
    if (type === 'vacation') {
      return getNextVacation();
    }
    if (type === 'birthday') {
      var month = storedDate.getMonth();
      var day = storedDate.getDate();
      var now = new Date();
      var year = now.getFullYear();
      var next = new Date(year, month, day, 0, 0, 0, 0);
      if (now >= next) {
        next = new Date(year + 1, month, day, 0, 0, 0, 0);
      }
      return next;
    }
    return storedDate;
  }

  /**
   * Загружает сохранённое событие из localStorage.
   * @returns {boolean} true, если данные успешно загружены
   */
  function loadFromStorage() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;

      var data = JSON.parse(raw);
      var storedDate = new Date(data.eventDate);
      var type = data.eventType || 'custom';

      state.eventName = data.eventName;
      state.eventType = type;
      state.eventDate = recalculatePresetDate(type, storedDate);

      // Загружаем дату начала отсчёта для прогресс-бара
      if (data.startDate) {
        state.startDate = new Date(data.startDate);
      } else {
        state.startDate = new Date();
      }

      // Если дата события пересчиталась (новый год, каникулы и т.д.) — сбрасываем старт
      if (state.eventDate.getTime() !== storedDate.getTime()) {
        state.startDate = new Date();
      }

      return true;
    } catch (e) {
      return false;
    }
  }

  /* --- Отображение --- */

  /**
   * Обновляет блок с названием и датой события.
   */
  function renderEventInfo() {
    if (!state.eventDate) {
      elements.eventInfo.innerHTML =
        '<p class="event-info__placeholder">Выбери событие, чтобы начать отсчёт</p>';
      return;
    }

    var emoji = DATA.EVENT_EMOJIS[state.eventType] || DATA.EVENT_EMOJIS.custom;

    elements.eventInfo.innerHTML =
      '<span class="event-info__emoji">' + emoji + '</span>' +
      '<p class="event-info__name">' + escapeHtml(state.eventName) + '</p>' +
      '<p class="event-info__date">' + formatDate(state.eventDate) + '</p>';
  }

  /**
   * Экранирование HTML для защиты от вставки тегов в название события.
   */
  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Обновляет цифры таймера. Если событие прошло — показывает сообщение.
   */
  function updateCountdown() {
    if (!state.eventDate) {
      setCountdownValues('--', '--', '--', '--');
      hideArrivedMessage();
      hideProgressBar();
      return;
    }

    var now = new Date();
    var diff = state.eventDate.getTime() - now.getTime();

    // Событие уже наступило
    if (diff <= 0) {
      setCountdownValues('00', '00', '00', '00');
      showArrivedMessage();
      updateProgressBar(100);
      stopTimer();
      return;
    }

    hideArrivedMessage();
    showProgressBar();

    var totalSeconds = Math.floor(diff / 1000);
    var days = Math.floor(totalSeconds / 86400);
    var hours = Math.floor((totalSeconds % 86400) / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var secs = totalSeconds % 60;

    setCountdownValues(
      pad(days),
      pad(hours),
      pad(minutes),
      pad(secs)
    );

    // Обновляем прогресс-бар
    updateProgressBar(calculateProgress(now));

    // Анимация «тика» для секунд
    elements.seconds.classList.add('is-ticking');
    setTimeout(function () {
      elements.seconds.classList.remove('is-ticking');
    }, 300);
  }

  /**
   * Считает процент прогресса от момента установки таймера до события.
   * @param {Date} now — текущее время
   * @returns {number} значение от 0 до 100
   */
  function calculateProgress(now) {
    if (!state.startDate || !state.eventDate) return 0;

    var total = state.eventDate.getTime() - state.startDate.getTime();
    if (total <= 0) return 100;

    var elapsed = now.getTime() - state.startDate.getTime();
    var percent = (elapsed / total) * 100;

    if (percent < 0) return 0;
    if (percent > 100) return 100;
    return percent;
  }

  /**
   * Обновляет визуальное отображение прогресс-бара.
   * @param {number} percent — процент от 0 до 100
   */
  function updateProgressBar(percent) {
    var rounded = Math.round(percent);

    elements.progressFill.style.width = rounded + '%';
    elements.progressPercent.textContent = rounded + '%';
    elements.progressTrack.setAttribute('aria-valuenow', String(rounded));

    if (rounded >= 100) {
      elements.progressFill.classList.add('is-complete');
      elements.progressHint.textContent = 'Событие наступило — путь пройден!';
    } else {
      elements.progressFill.classList.remove('is-complete');
      elements.progressHint.textContent = 'Отсчёт начался с момента установки таймера';
    }
  }

  function showProgressBar() {
    elements.progress.hidden = false;
  }

  function hideProgressBar() {
    elements.progress.hidden = true;
  }

  /**
   * Устанавливает значения в блоках таймера.
   */
  function setCountdownValues(d, h, m, s) {
    elements.days.textContent = d;
    elements.hours.textContent = h;
    elements.minutes.textContent = m;
    elements.seconds.textContent = s;
  }

  function showArrivedMessage() {
    elements.timerMessage.textContent = 'Событие уже наступило!';
    elements.timerMessage.classList.remove('timer-message--hidden');
    elements.timerMessage.classList.add('timer-message--arrived');
  }

  function hideArrivedMessage() {
    elements.timerMessage.classList.add('timer-message--hidden');
    elements.timerMessage.classList.remove('timer-message--arrived');
  }

  /**
   * Запускает интервал обновления таймера (каждую секунду).
   */
  function startTimer() {
    stopTimer();
    updateCountdown();
    state.timerId = setInterval(updateCountdown, 1000);
  }

  /**
   * Останавливает интервал таймера.
   */
  function stopTimer() {
    if (state.timerId !== null) {
      clearInterval(state.timerId);
      state.timerId = null;
    }
  }

  /**
   * Показывает факт дня (один на весь день).
   */
  function renderFactOfDay() {
    var index = getDailyIndex(DATA.FACTS.length, 7);
    elements.factText.textContent = DATA.FACTS[index];
  }

  /**
   * Показывает цитату/фразу дня.
   */
  function renderQuoteOfDay() {
    var index = getDailyIndex(DATA.QUOTES.length, 13);
    var quote = DATA.QUOTES[index];
    elements.quoteText.innerHTML =
      '<p>' + escapeHtml(quote.text) + '</p>' +
      '<footer>— ' + escapeHtml(quote.author) + '</footer>';
  }

  /**
   * Показывает тематическую картинку:
   * если есть событие — по его типу, иначе — «картинка дня».
   */
  function renderDayImage() {
    var imageData;
    var type = state.eventType;

    // Тематическая картинка для выбранного события
    if (type && DATA.IMAGES[type]) {
      imageData = DATA.IMAGES[type];
    } else {
      // Картинка дня из ротации
      var dayIndex = getDailyIndex(DATA.DAILY_IMAGES.length, 3);
      imageData = DATA.DAILY_IMAGES[dayIndex];
    }

    elements.dayImage.innerHTML = imageData.svg;
    elements.imageCaption.textContent = imageData.caption;
  }

  /**
   * Подсвечивает активную кнопку пресета.
   */
  function updatePresetButtons() {
    elements.presetButtons.forEach(function (btn) {
      var preset = btn.getAttribute('data-preset');
      if (preset === state.eventType) {
        btn.classList.add('is-active');
      } else {
        btn.classList.remove('is-active');
      }
    });
  }

  /* --- Установка события --- */

  /**
   * Применяет новое событие (после подтверждения).
   * @param {object} eventData — { name, date, type }
   */
  function applyEvent(eventData) {
    state.eventName = eventData.name;
    state.eventDate = eventData.date;
    state.eventType = eventData.type;
    state.startDate = new Date(); // новый отсчёт — прогресс начинается с нуля

    // Заполняем форму для наглядности
    elements.eventName.value = eventData.name;
    var isoDate = eventData.date.toISOString().split('T')[0];
    elements.eventDate.value = isoDate;

    saveToStorage();
    renderEventInfo();
    renderDayImage();
    updatePresetButtons();
    startTimer();
  }

  /**
   * Запрашивает подтверждение смены события через модальное окно.
   * @param {object} eventData — данные нового события
   */
  function requestEventChange(eventData) {
    // Если событие ещё не выбрано — применяем сразу без подтверждения
    if (!state.eventDate) {
      applyEvent(eventData);
      return;
    }

    state.pendingEvent = eventData;

    elements.modalText.textContent =
      'Установить новое событие «' + eventData.name + '» на ' +
      formatDate(eventData.date) + '? Текущий таймер будет заменён.';

    elements.confirmModal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    elements.confirmModal.hidden = true;
    document.body.style.overflow = '';
    state.pendingEvent = null;
  }

  function confirmModal() {
    if (state.pendingEvent) {
      applyEvent(state.pendingEvent);
    }
    closeModal();
  }

  /* --- Обработчики событий --- */

  /**
   * Обработка нажатия на кнопки пресетов.
   */
  function handlePresetClick(preset) {
    var name = DATA.PRESET_NAMES[preset];
    var date;

    if (preset === 'newyear') {
      date = getNextNewYear();
    } else if (preset === 'vacation') {
      date = getNextVacation();
    } else if (preset === 'birthday') {
      // Для дня рождения нужна дата — подставляем в форму и просим указать
      elements.eventName.value = name;
      elements.eventDate.focus();

      // Если дата уже введена — используем её
      if (elements.eventDate.value) {
        date = getNextBirthday(elements.eventDate.value);
        requestEventChange({ name: name, date: date, type: preset });
      } else {
        // Подсказка: нужно ввести дату рождения
        elements.eventInfo.innerHTML =
          '<p class="event-info__placeholder">🎂 Введи дату рождения в форме ниже и нажми «Установить таймер»</p>';
        state.eventType = preset;
        updatePresetButtons();
      }
      return;
    }

    requestEventChange({ name: name, date: date, type: preset });
  }

  /**
   * Обработка отправки формы с пользовательским событием.
   */
  function handleFormSubmit(e) {
    e.preventDefault();

    var name = elements.eventName.value.trim();
    var dateStr = elements.eventDate.value;

    if (!name || !dateStr) {
      alert('Пожалуйста, заполни название и дату события.');
      return;
    }

    var date = parseInputDate(dateStr);
    var type = 'custom';

    // Если название совпадает с пресетом «День рождения» — считаем дату ежегодной
    if (name === DATA.PRESET_NAMES.birthday || state.eventType === 'birthday') {
      date = getNextBirthday(dateStr);
      type = 'birthday';
    }

    requestEventChange({ name: name, date: date, type: type });
  }

  /**
   * Привязка всех обработчиков к элементам страницы.
   */
  function bindEvents() {
    // Кнопки пресетов
    elements.presetButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        handlePresetClick(btn.getAttribute('data-preset'));
      });
    });

    // Форма
    elements.customForm.addEventListener('submit', handleFormSubmit);

    // Модальное окно
    elements.confirmModal.addEventListener('click', function (e) {
      var action = e.target.getAttribute('data-action');
      if (action === 'confirm') {
        confirmModal();
      } else if (action === 'cancel') {
        closeModal();
      }
    });

    // Закрытие модалки по Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !elements.confirmModal.hidden) {
        closeModal();
      }
    });
  }

  /* --- Инициализация приложения --- */

  function init() {
    elements.currentYear.textContent = new Date().getFullYear();

    bindEvents();

    // Блоки «факт дня» и «цитата дня» — всегда при загрузке
    renderFactOfDay();
    renderQuoteOfDay();

    // Восстанавливаем сохранённое событие
    if (loadFromStorage()) {
      renderEventInfo();
      renderDayImage();
      updatePresetButtons();
      startTimer();

      // Заполняем форму
      elements.eventName.value = state.eventName;
      elements.eventDate.value = state.eventDate.toISOString().split('T')[0];
    } else {
      renderDayImage();
    }
  }

  // Запуск после полной загрузки DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
