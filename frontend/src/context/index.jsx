'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';

const ContextInstance = createContext({});

function ContextProvider({ children }) {
  const [userSession, setUserSession] = useState(null);
  const providerValue = useMemo(
    () => ({ userSession, setUserSession }),
    [userSession]
  );

  return (
    <ContextInstance.Provider value={providerValue}>
      {children}
    </ContextInstance.Provider>
  );
}

const useGetUserSessionContext = () => useContext(ContextInstance);

export { useGetUserSessionContext, ContextProvider };
