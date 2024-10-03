// src/contexts/NavbarContext.js

import React, { createContext, useContext, useState } from 'react';

const NavbarContext = createContext();

export const useNavbar = () => {
  return useContext(NavbarContext);
};

export const NavbarProvider = ({ children }) => {
  const [navbarVisible, setNavbarVisible] = useState(true);

  return (
    <NavbarContext.Provider value={{ navbarVisible, setNavbarVisible }}>
      {children}
    </NavbarContext.Provider>
  );
};
