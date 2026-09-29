// Утилита для красивого времени: всегда ЧЧ:ММ (например, 16:45)
const formatTime = (date) => {
  const d = new Date(date);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Сюда вставлю домен GREEN-API для апишек
const BASE_URL = 'https://green-api.com/v3/docs/api'; 

// Пишу функцию получения сообщений
export const getMessages = async () => {
  // ToDo: тут будет реальный GET-запрос
  // const response = await fetch(`${BASE_URL}/receiving/technology-http-api`)
  // return response.json();

  // Пока использую фейковые данные, чтобы интерфейс работал сразу:
  return new Promise((resolve) => {
    setTimeout(() => {
      const now = new Date();
      resolve([
        { id: 1, text: 'Привет! Это тест-смс от системы.', sender: 'system', time: '10:00' }, // Можно оставить хардкод для теста
        { id: 2, text: 'Жду твоих сообщений!', sender: 'system', time: '10:01' }
      ]);
    }, 500);
  });
};

// Пишу функцию отправки сообщений
export const sendMessage = async (text) => {
  // ToDo: тут будет реальный POST-запрос
  // const response = await fetch(`${BASE_URL}/sending/SendMessage`)

  // Фейковая отправка:
  const time = formatTime(new Date());
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ text, sender: 'user', time });
    }, 800);
  });
};
