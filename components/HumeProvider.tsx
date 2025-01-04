// components/HumeProvider.tsx
'use client';

import { VoiceProvider } from '@humeai/voice-react';
import { ReactNode } from 'react';

export function HumeProvider({ children }: { children: ReactNode }) {
  return (
    <VoiceProvider
      auth={{ 
        type: "apiKey", 
        value: "5xoTHuPhRaviFPiFp4Qmk5UzrbNbIqiyAAVrLjflrt0ERtKF" 
      }}
      hostname="api.hume.ai"
      reconnectAttempts={30}
      debug={false}
      configId="030872b3-7df1-4dfa-b1e7-33e527c8aa6a"
      clearMessagesOnDisconnect={false}
      messageHistoryLimit={100}
    >
      {children}
    </VoiceProvider>
  );
}