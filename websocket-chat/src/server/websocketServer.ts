import { WebSocket, WebSocketServer } from 'ws';

interface ExtendedWebSocket extends WebSocket {
  id?: string;
}

const wss = new WebSocketServer({ port: 3001 });
// Next.js 기본 포트가 3000이므로, WebSocket 서버는 3001로 예시를 들었습니다.

let userCount = 0;

wss.on('connection', (ws: ExtendedWebSocket) => {
  // 사용자를 구분하기 위한 id
  ws.id = `user-${++userCount}`;
  console.log(`[WebSocket] ${ws.id} connected`);

  // 클라이언트에서 받은 메시지를 전체 사용자에게 broadcast
  ws.on('message', (data: string) => {
    const messageData = JSON.parse(data);
    console.log(`[WebSocket] 메시지 수신 from ${ws.id}:`, messageData);

    // 전체 클라이언트에게 메시지를 전송
    wss.clients.forEach((client) => {
      // readyState 값이 OPEN(=1)인지 확인
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            id: ws.id,
            message: messageData.message,
            timestamp: new Date().toISOString(),
          })
        );
      }
    });
  });

  // 연결 종료 처리
  ws.on('close', () => {
    console.log(`[WebSocket] ${ws.id} disconnected`);
  });
});

console.log('[WebSocket] 서버가 3001 포트에서 실행 중...');
