interface DrawerProviderProps {
  children: React.ReactNode;
  idDrawer: string;
}

export function DrawerProvider({ children, idDrawer }: DrawerProviderProps) {
  return (
    <div className="drawer drawer-end z-50 w-fit">
      <input id={idDrawer} type="checkbox" className="drawer-toggle" />
      {children}
    </div>
  );
}
