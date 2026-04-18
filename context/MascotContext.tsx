'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type MascotState = 'idle' | 'thinking' | 'excited' | 'happy';

interface MascotContextType {
  mascotState: MascotState;
  setMascotState: (state: MascotState) => void;
}

const MascotContext = createContext<MascotContextType | undefined>(undefined);

export function MascotProvider({ children }: { children: ReactNode }) {
  const [mascotState, setMascotState] = useState<MascotState>('idle');

  return (
    <MascotContext.Provider value={{ mascotState, setMascotState }}>
      {children}
    </MascotContext.Provider>
  );
}

export function useMascot() {
  const context = useContext(MascotContext);
  if (context === undefined) {
    throw new Error('useMascot must be used within a MascotProvider');
  }
  return context;
}
