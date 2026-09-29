import { useState, useEffect } from 'react';
import { getMessages, sendMessage } from './services/api';
import './App.css';

// Пишу приложение
function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Загружаем сообщения при старте
  useEffect(() => {
    const loadMessages = async () => {
      setIsLoading(true);
      try {
        const data = await getMessages();
        setMessages(data);
      } catch (err) {
        setError('Не удалось загрузить сообщения');
      } finally {
        setIsLoading(false);
      }
    };

    loadMessages();
  }, []);

  // Отправка сообщения
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsLoading(true);
    try {
      const newMessage = await sendMessage(inputText);
      setMessages((prev) => [...prev, newMessage]);
      setInputText('');
    } catch (err) {
      setError('Ошибка отправки');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <h1>Чат MAX</h1>

      {error && <div className="error">{error}</div>}

      <div className="messages-list">
        {isLoading && messages.length === 0 ? (
          <p>Загрузка...</p>
        ) : (
          messages.map((msg) => (
            <div key={msg.id || msg.time} className={`message ${msg.sender}`}>
              <div className="message-content">
                <span className="text">{msg.text}</span>
                <span className="time">{msg.time}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="input-area">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Введите сообщение..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !inputText.trim()}>
          {isLoading ? 'Отправка...' : 'Отправить'}
        </button>
      </form>
    </div>
  );
}

export default App;
