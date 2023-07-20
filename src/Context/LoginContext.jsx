import React, { createContext, useState, useEffect, useContext } from 'react';
import BackEndService from '../services/BackEndService';
import Cookies from 'js-cookie'; 

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [token, setToken] = useState(null);
  const [rememberMe, setRememberMe] = useState(true);

  const login = async (username, password) => {
    try {
      const response = await BackEndService.post('/login', {
        username,
        password,
      });

      if (response.status === 200 && response.data.token) {
        setLoggedIn(true);
        setError('');
        setToken(response.data.token);
        const expiration = rememberMe ? { expires: 7 } : { expires: 1 };
        Cookies.set('token', response.data.token, expiration);
      } else {
        throw new Error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setError('Reset krle ya account bna le bsdk');
      console.error(error);
    }
  };

  const logout = () => {
    setLoggedIn(false);
    setToken(null);
    Cookies.remove('token'); 
  };

  useEffect(() => {
    const storedToken = Cookies.get('token');
    if (storedToken) {
      setToken(storedToken);
      setLoggedIn(true);
    }
  }, []);

  const contextValue = {
    loggedIn,
    error,
    login,
    logout,
    token,
    axiosInstance: BackEndService,
    rememberMe,
    setRememberMe
  };

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  return useContext(LoginContext);
};
