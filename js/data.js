/**
 * data.js — данные для сайта: факты, цитаты, SVG-иллюстрации.
 * Обёрнут в IIFE, чтобы не засорять глобальную область видимости.
 * Единственная «точка входа» — объект window.CountdownData.
 */
(function () {
  'use strict';

  /** Интересные факты для блока «Факт дня» */
  var FACTS = [
    'Мёд никогда не портится — археологи находили съедобный мёд в египетских гробницах возрастом более 3000 лет.',
    'У осьминога три сердца: два качают кровь к жабрам, а третье — ко всему остальному телу.',
    'Самая высокая гора в Солнечной системе — Олимп на Марсе, её высота около 22 км.',
    'Бананы — ягоды с ботанической точки зрения, а клубника — нет.',
    'Венеция построена на более чем 100 островах, соединённых мостами.',
    'Свет от Солнца доходит до Земли примерно за 8 минут и 20 секунд.',
    'У улитки около 25 000 зубов — больше, чем у любого другого животного.',
    'Кошки не чувствуют сладкий вкус — у них нет соответствующих рецепторов.',
    'Самая длинная река России — Лена, её длина около 4400 км.',
    'Пингвины предлагают друг другу камешек в знак любви.',
    'Человеческий мозг потребляет около 20% всей энергии тела.',
    'Вода расширяется при замерзании — поэтому лёд плавает на поверхности.',
    'У жирафа и человека одинаковое количество шейных позвонков — семь.',
    'Колибри — единственная птица, которая умеет летать назад.',
    'Земля вращается со скоростью около 1670 км/ч на экваторе.',
    'Самое глубокое место на Земле — Марианская впадина (около 11 км).',
    'У дельфинов имена — они свистят уникальную «визитную карточку».',
    'Пчёлы общаются друг с другом танцем — так они показывают, где нектар.',
    'В космосе нельзя плакать — слёзы не стекают, а остаются шариком на глазу.',
    'Самый большой орган человека — кожа, её площадь около 2 кв. метров.',
    'На Юпитере день длится всего 10 часов, хотя год — 12 земных лет.',
    'Крокодилы не умеют высовывать язык — он прикреплён к нижней челюсти.',
    'Слоны узнают себя в зеркале — это признак высокого интеллекта.',
    'В одной столовой ложке нейтронной звезды весило бы около 6 миллиардов тонн.',
    'Коалы спят до 22 часов в сутки — рекорд среди млекопитающих.',
    'Римская цифра M означает 1000 — от латинского «mille» (тысяча).',
    'Первый компьютерный «баг» был настоящим — в 1947 году нашли моль в реле.',
    'У акул нет костей — их скелет состоит из хряща.',
    'Самая маленькая страна в мире — Ватикан, площадь около 0,44 кв. км.',
    'Луна удаляется от Земли на 3,8 см каждый год.',
    'У голубя супружеская верность — пары остаются вместе на всю жизнь.',
    'Сердце кита бьётся всего 9 раз в минуту.',
    'В Антарктиде почти нет муравьёв — это единственный континент без них.'
  ];

  /** Мотивационные и смешные фразы для блока «Фраза дня» */
  var QUOTES = [
    { text: 'Каждый день — новый шанс стать лучше!', author: 'Мотивация' },
    { text: 'Учиться никогда не поздно, а перестать — слишком рано.', author: 'Мудрость' },
    { text: 'Делай сегодня то, что другие не хотят — завтра живи так, как другие не могут.', author: 'Мотивация' },
    { text: 'Ошибки — это ступеньки к успеху, а не яма.', author: 'Мудрость' },
    { text: 'Математика — это как волшебство, только с цифрами.', author: 'Школьный юмор' },
    { text: 'Если жизнь даёт лимоны — сделай лимонад и продай соседям.', author: 'Юмор' },
    { text: 'Терпение и труд всё перетрут, даже домашку по физике.', author: 'Школьный юмор' },
    { text: 'Мечтай по-крупному, работай усердно, оставайся скромным.', author: 'Мотивация' },
    { text: 'Понедельник — это просто день, который решил быть особенным.', author: 'Юмор' },
    { text: 'Не бойся идти медленно, бойся стоять на месте.', author: 'Мотивация' },
    { text: 'Учитель не дал домашку — подозрительно, очень подозрительно…', author: 'Школьный юмор' },
    { text: 'Великие дела начинаются с маленьких шагов.', author: 'Мудрость' },
    { text: 'Каникулы близко, если верить в календарь!', author: 'Юмор' },
    { text: 'Секрет успеха — начать. Секрет начала — разбить задачу на части.', author: 'Мотивация' },
    { text: 'Даже калькулятор иногда ошибается — не сдавайся!', author: 'Школьный юмор' },
    { text: 'Будущее принадлежит тем, кто верит в красоту своей мечты.', author: 'Мотивация' },
    { text: 'Книга — лучший подарок, кроме пиццы.', author: 'Юмор' },
    { text: 'Успех — это сумма маленьких усилий, повторённых каждый день.', author: 'Мотивация' },
    { text: 'Завтра начну рано вставать… сказал я сегодня в пятый раз.', author: 'Юмор' },
    { text: 'Нет ничего невозможного — есть только «ещё не сделано».', author: 'Мотивация' },
    { text: 'Дружба — когда делишься последней шоколадкой.', author: 'Мудрость' },
    { text: 'Пятница — официальный праздник терпения.', author: 'Юмор' },
    { text: 'Читай как будто завтра экзамен, живи как будто его нет.', author: 'Школьный юмор' },
    { text: 'Самый лучший способ предсказать будущее — создать его.', author: 'Мотивация' },
    { text: 'Иногда нужно просто поверить в себя — даже если это сложно.', author: 'Мудрость' },
    { text: 'Кофе не решает проблемы, но помогает не засыпать на уроке.', author: 'Юмор' },
    { text: 'Падать можно, лежать — нельзя.', author: 'Мотивация' },
    { text: 'Лучший способ выучить правило — объяснить его другу.', author: 'Мудрость' },
    { text: 'Новый год — это 365 новых возможностей!', author: 'Мотивация' },
    { text: 'Смех продлевает жизнь, особенно на перемене.', author: 'Юмор' },
    { text: 'Ты сильнее, чем думаешь, и умнее, чем кажется.', author: 'Мотивация' },
    { text: 'День рождения — единственный день, когда можно есть торт на завтрак.', author: 'Юмор' }
  ];

  /**
   * Тематические SVG-иллюстрации (встроенные строки — работают без интернета).
   * Ключи: birthday, vacation, newyear, default + массив для «картинки дня».
   */
  var IMAGES = {
    birthday: {
      caption: 'Скоро праздник — готовь торт!',
      svg: '<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="160" fill="#ffeaa7" rx="8"/><ellipse cx="100" cy="130" rx="70" ry="12" fill="#dfe6e9"/><rect x="55" y="75" width="90" height="50" rx="6" fill="#fd79a8"/><rect x="60" y="60" width="80" height="20" rx="4" fill="#e84393"/><rect x="65" y="48" width="70" height="16" rx="4" fill="#fdcb6e"/><line x1="100" y1="48" x2="100" y2="25" stroke="#636e72" stroke-width="3"/><ellipse cx="100" cy="22" rx="8" ry="12" fill="#ff7675"><animate attributeName="ry" values="12;14;12" dur="0.8s" repeatCount="indefinite"/></ellipse><circle cx="75" cy="85" r="5" fill="#fff"/><circle cx="100" cy="90" r="5" fill="#fff"/><circle cx="125" cy="85" r="5" fill="#fff"/><text x="100" y="155" text-anchor="middle" font-size="10" fill="#636e72">🎂 День рождения</text></svg>'
    },
    vacation: {
      caption: 'Каникулы — время приключений!',
      svg: '<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="160" fill="#74b9ff" rx="8"/><circle cx="160" cy="35" r="22" fill="#ffeaa7"/><path d="M0 110 Q50 95 100 110 Q150 125 200 110 L200 160 L0 160Z" fill="#55efc4"/><path d="M0 125 Q60 115 120 128 Q160 135 200 128 L200 160 L0 160Z" fill="#00b894"/><ellipse cx="60" cy="105" rx="25" ry="8" fill="#fdcb6e"/><path d="M50 105 L70 105 L65 85 Z" fill="#e17055"/><circle cx="62" cy="82" r="6" fill="#fdcb6e"/><text x="100" y="155" text-anchor="middle" font-size="10" fill="#2d3436">🏖️ Каникулы</text></svg>'
    },
    newyear: {
      caption: 'Новый год — время чудес!',
      svg: '<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="160" fill="#2d3436" rx="8"/><circle cx="30" cy="30" r="1.5" fill="#fff"/><circle cx="80" cy="15" r="1" fill="#fff"/><circle cx="150" cy="25" r="1.5" fill="#fff"/><circle cx="170" cy="60" r="1" fill="#fff"/><circle cx="50" cy="50" r="1" fill="#fff"/><polygon points="100,120 70,150 130,150" fill="#00b894"/><polygon points="100,95 78,120 122,120" fill="#00cec9"/><polygon points="100,72 85,95 115,95" fill="#55efc4"/><rect x="93" y="150" width="14" height="8" fill="#6d4c41"/><circle cx="100" cy="65" r="5" fill="#fdcb6e"/><text x="100" y="12" text-anchor="middle" font-size="10" fill="#dfe6e9">🎆 Новый год</text></svg>'
    },
    default: {
      caption: 'Каждый день приближает к цели!',
      svg: '<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="160" fill="#a29bfe" rx="8"/><rect x="50" y="30" width="100" height="90" rx="8" fill="#fff" stroke="#6c5ce7" stroke-width="3"/><line x1="65" y1="55" x2="135" y2="55" stroke="#dfe6e9" stroke-width="4" stroke-linecap="round"/><line x1="65" y1="75" x2="120" y2="75" stroke="#dfe6e9" stroke-width="4" stroke-linecap="round"/><line x1="65" y1="95" x2="110" y2="95" stroke="#dfe6e9" stroke-width="4" stroke-linecap="round"/><circle cx="100" cy="105" r="18" fill="#fd79a8"/><text x="100" y="110" text-anchor="middle" font-size="14" fill="#fff">📅</text><text x="100" y="155" text-anchor="middle" font-size="10" fill="#fff">Важное событие</text></svg>'
    }
  };

  /** Дополнительные «картинки дня» — меняются по номеру дня в году */
  var DAILY_IMAGES = [
    { caption: 'Космос полон загадок!', svg: '<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="160" fill="#0c0c1d" rx="8"/><circle cx="100" cy="80" r="30" fill="#ffeaa7"/><circle cx="40" cy="40" r="2" fill="#fff"/><circle cx="160" cy="50" r="1.5" fill="#fff"/><circle cx="120" cy="30" r="1" fill="#fff"/><ellipse cx="100" cy="130" rx="60" ry="8" fill="#2d3436"/><text x="100" y="155" text-anchor="middle" font-size="10" fill="#b2bec3">🌙 Космос</text></svg>' },
    { caption: 'Природа — лучший художник!', svg: '<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="160" fill="#81ecec" rx="8"/><circle cx="170" cy="30" r="18" fill="#ffeaa7"/><path d="M0 100 Q50 80 100 100 Q150 120 200 100 L200 160 L0 160Z" fill="#00b894"/><circle cx="50" cy="90" r="15" fill="#2d6a4f"/><rect x="45" y="105" width="10" height="20" fill="#6d4c41"/><text x="100" y="155" text-anchor="middle" font-size="10" fill="#2d3436">🌳 Природа</text></svg>' },
    { caption: 'Музыка поднимает настроение!', svg: '<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="160" fill="#fd79a8" rx="8"/><ellipse cx="70" cy="120" rx="25" ry="8" fill="#e84393"/><rect x="60" y="50" width="20" height="70" fill="#6c5ce7"/><circle cx="70" cy="120" r="12" fill="#a29bfe" stroke="#6c5ce7" stroke-width="2"/><ellipse cx="130" cy="110" rx="25" ry="8" fill="#e84393"/><rect x="120" y="40" width="20" height="70" fill="#6c5ce7"/><circle cx="130" cy="110" r="12" fill="#a29bfe" stroke="#6c5ce7" stroke-width="2"/><text x="100" y="30" text-anchor="middle" font-size="18" fill="#fff">♪ ♫</text><text x="100" y="155" text-anchor="middle" font-size="10" fill="#fff">🎵 Музыка</text></svg>' },
    { caption: 'Книги открывают новые миры!', svg: '<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="160" fill="#ffeaa7" rx="8"/><path d="M60 40 L100 55 L140 40 L140 120 L100 105 L60 120Z" fill="#fff" stroke="#6c5ce7" stroke-width="2"/><line x1="100" y1="55" x2="100" y2="105" stroke="#6c5ce7" stroke-width="2"/><line x1="70" y1="60" x2="90" y2="65" stroke="#dfe6e9" stroke-width="2"/><line x1="70" y1="75" x2="90" y2="78" stroke="#dfe6e9" stroke-width="2"/><line x1="110" y1="65" x2="130" y2="60" stroke="#dfe6e9" stroke-width="2"/><line x1="110" y1="78" x2="130" y2="75" stroke="#dfe6e9" stroke-width="2"/><text x="100" y="155" text-anchor="middle" font-size="10" fill="#636e72">📚 Книги</text></svg>' },
    { caption: 'Спорт делает нас сильнее!', svg: '<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="160" fill="#55efc4" rx="8"/><circle cx="100" cy="55" r="18" fill="#fdcb6e"/><line x1="100" y1="73" x2="100" y2="110" stroke="#2d3436" stroke-width="4" stroke-linecap="round"/><line x1="100" y1="85" x2="75" y2="100" stroke="#2d3436" stroke-width="3" stroke-linecap="round"/><line x1="100" y1="85" x2="125" y2="100" stroke="#2d3436" stroke-width="3" stroke-linecap="round"/><line x1="100" y1="110" x2="80" y2="140" stroke="#2d3436" stroke-width="3" stroke-linecap="round"/><line x1="100" y1="110" x2="120" y2="140" stroke="#2d3436" stroke-width="3" stroke-linecap="round"/><circle cx="130" cy="130" r="12" fill="#fff" stroke="#2d3436" stroke-width="2"/><text x="100" y="155" text-anchor="middle" font-size="10" fill="#2d3436">⚽ Спорт</text></svg>' },
    { caption: 'Искусство вдохновляет!', svg: '<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="160" fill="#fab1a0" rx="8"/><rect x="40" y="30" width="120" height="90" fill="#fff" stroke="#e17055" stroke-width="3" rx="4"/><circle cx="80" cy="65" r="12" fill="#74b9ff"/><path d="M60 100 Q100 70 140 100" stroke="#00b894" stroke-width="3" fill="none"/><circle cx="130" cy="50" r="8" fill="#fdcb6e"/><text x="100" y="155" text-anchor="middle" font-size="10" fill="#2d3436">🎨 Искусство</text></svg>' },
    { caption: 'Наука объясняет мир!', svg: '<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg"><rect width="200" height="160" fill="#dfe6e9" rx="8"/><ellipse cx="100" cy="100" rx="50" ry="25" fill="#74b9ff" opacity="0.5"/><rect x="85" y="50" width="30" height="50" rx="15" fill="#a29bfe" stroke="#6c5ce7" stroke-width="2"/><circle cx="100" cy="65" r="8" fill="#fd79a8"/><line x1="100" y1="100" x2="70" y2="130" stroke="#636e72" stroke-width="2"/><line x1="100" y1="100" x2="130" y2="130" stroke="#636e72" stroke-width="2"/><text x="100" y="155" text-anchor="middle" font-size="10" fill="#2d3436">🔬 Наука</text></svg>' }
  ];

  /** Эмодзи для типов событий */
  var EVENT_EMOJIS = {
    birthday: '🎂',
    vacation: '🏖️',
    newyear: '🎆',
    custom: '📅'
  };

  /** Названия пресетов */
  var PRESET_NAMES = {
    birthday: 'День рождения',
    vacation: 'Каникулы',
    newyear: 'Новый год'
  };

  // Публикуем данные через единый объект (для file:// совместимости)
  window.CountdownData = {
    FACTS: FACTS,
    QUOTES: QUOTES,
    IMAGES: IMAGES,
    DAILY_IMAGES: DAILY_IMAGES,
    EVENT_EMOJIS: EVENT_EMOJIS,
    PRESET_NAMES: PRESET_NAMES
  };
})();
