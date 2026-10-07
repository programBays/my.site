/*
 * Все ссылки сайта в одном месте.
 * Поменяй значение справа — и оно обновится во всех кнопках на странице.
 *
 * Сейчас здесь заглушки. Перед запуском заменить:
 *   payStandard / payPriority — ссылки на оплату (ЮKassa / CloudPayments / Prodamus)
 *   telegram, vk, instagram — профили
 *   phone, email — контакты
 */
window.SITE_CONFIG = {
  links: {
    payStandard: '#pay-standard',
    payPriority: '#pay-priority',

    telegram: '#tg',          // например: 'https://t.me/volkov_psy'
    vk: '#vk',                // например: 'https://vk.com/volkov_psy'
    instagram: '#ig',         // например: 'https://instagram.com/volkov_psy'

    phone: '#tel',            // например: 'tel:+79000000000'
    email: '#mail'            // например: 'mailto:hello@volkov-psy.ru'
  }
};
