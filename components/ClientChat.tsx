// components/ClientChat.tsx
'use client';

import dynamic from "next/dynamic";

const Chat = dynamic(() => import("./Chat"), {
  ssr: false,
});

export function ClientChat({ accessToken }: { accessToken: string }) {
  return <Chat accessToken={accessToken} />;
}