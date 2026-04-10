import { type ReactNode, createContext, useContext, useState } from "react";

interface SOSContextValue {
  isOpen: boolean;
  openSOS: () => void;
  closeSOS: () => void;
}

const SOSContext = createContext<SOSContextValue | null>(null);

export function SOSProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SOSContext.Provider
      value={{
        isOpen,
        openSOS: () => setIsOpen(true),
        closeSOS: () => setIsOpen(false),
      }}
    >
      {children}
    </SOSContext.Provider>
  );
}

export function useSOSContext(): SOSContextValue {
  const ctx = useContext(SOSContext);
  if (!ctx) throw new Error("useSOSContext must be used within SOSProvider");
  return ctx;
}
