import React from 'react';
import './globals.css'; // 필요 시, 전역 스타일 정의

export const metadata = {
  title: 'Chat App',
  description: 'React 18 + Next 14 + WebSocket + TypeScript',
};

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
    <body>
    {children}
    </body>
    </html>
  );
}
