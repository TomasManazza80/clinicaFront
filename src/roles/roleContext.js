import { createContext, useState } from 'react';

const RolContext = createContext();

const RolProvider = ({ children }) => {
  const [rol, setRol] = useState(null);

  return (
    <RolContext.Provider value={{ rol, setRol }}>
      {children}
    </RolContext.Provider>
  );
};

export { RolProvider, RolContext };