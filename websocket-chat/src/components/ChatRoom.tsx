'use client';
import React, { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  message: string;
  timestamp: string;
}

const ChatRoom: React.FC = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // WebSocket 서버에 연결
    const socket = new WebSocket('ws://localhost:3001');
    setWs(socket);

    // 메시지 수신
    socket.onmessage = (event) => {
      const data: Message = JSON.parse(event.data);
      setMessageList((prev) => [...prev, data]);
    };

    // 컴포넌트 언마운트 시 소켓 종료
    return () => {
      socket.close();
    };
  }, []);

  // 새로운 메시지를 전송
  const sendMessage = () => {
    if (!ws || !inputValue) return;
    ws.send(JSON.stringify({ message: inputValue }));
    setInputValue('');
  };

  // Enter 키 입력 시 메시지 전송
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // 메시지 리스트가 업데이트 될 때마다 스크롤 조정
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messageList]);

  return (
    <div style={styles.container}>
      <div style={styles.chatBox} ref={scrollRef}>
        {messageList.map((msg, index) => (
          <div key={index} style={styles.message}>
            <span style={{ fontWeight: 'bold' }}>{msg.id}:</span> {msg.message}
            <div style={styles.timestamp}>{new Date(msg.timestamp).toLocaleTimeString()}</div>
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          placeholder="메시지를 입력하세요"
          onKeyDown={handleKeyDown}
          onChange={(e) => setInputValue(e.target.value)}
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.button}>
          전송
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
    margin: '0 auto',
  },
  chatBox: {
    flex: 1,
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '8px',
    height: '400px',
    overflowY: 'auto',
    marginBottom: '8px',
  },
  message: {
    marginBottom: '8px',
  },
  timestamp: {
    fontSize: '0.8rem',
    color: '#888',
  },
  inputContainer: {
    display: 'flex',
  },
  input: {
    flex: 1,
    padding: '8px',
    fontSize: '1rem',
  },
  button: {
    marginLeft: '8px',
    padding: '8px 16px',
    cursor: 'pointer',
  },
};

export default ChatRoom;
