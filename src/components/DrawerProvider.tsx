import { FC, createContext, useContext, useState } from 'react';

const DrawerContext = createContext<{ open: null | string; setOpen: (name: null | string) => void }>({
  open: null,
  setOpen: () => {
    //
  }
});

export const DrawerProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState<null | string>(null);

  return <DrawerContext.Provider value={{ open, setOpen }}>{children}</DrawerContext.Provider>;
};

export const useDrawerOpen = (name: string) => {
  const context = useContext(DrawerContext);

  return context.open === name;
};

export const useDrawerSetStatus = (name: string) => {
  const context = useContext(DrawerContext);

  return {
    close: () => {
      context.setOpen(null);
    },
    open: () => {
      context.setOpen(name);
    },
    toggle: () => {
      if (context.open === name) {
        context.setOpen(null);
      } else {
        context.setOpen(name);
      }
    }
  };
};
