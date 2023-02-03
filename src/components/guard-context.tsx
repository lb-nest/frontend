import decode from 'jwt-decode';
import React from 'react';
import { AccessLevel } from '../core/types';

export const TOKEN_KEY = 'token';

interface Token {
  payload: {
    id: number;
    project: {
      id: number;
      roles: Array<{
        role: AccessLevel;
      }>;
    };
  };
  signIn: (token: string) => void;
  signOut: () => void;
}

interface GuardContextProviderProps {
  children?: React.ReactNode;
}

export const GuardContext = React.createContext<Partial<Token>>({});
export const GuardContextProvider: React.FC<GuardContextProviderProps> = ({ children }) => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [payload, setPayload] = React.useState<any>();

  const signIn = React.useCallback(
    (token: string) => {
      try {
        setPayload(decode(token));
        localStorage.setItem(TOKEN_KEY, token);
      } catch {}
    },
    [setPayload],
  );

  const signOut = React.useCallback(() => {
    try {
      setPayload(null);
      localStorage.removeItem(TOKEN_KEY);
    } catch {}
  }, [setPayload]);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      signIn(token);
    }

    setLoading(false);
  }, [signIn]);

  return (
    <>
      {!loading && (
        <GuardContext.Provider
          value={{
            payload,
            signIn,
            signOut,
          }}>
          {children}
        </GuardContext.Provider>
      )}
    </>
  );
};
