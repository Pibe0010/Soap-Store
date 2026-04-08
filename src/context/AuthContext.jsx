import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { 
  signUpWithEmailPassword, 
  signInWithEmailPassword, 
  signInWithGoogle, 
  signInWithApple,
  signOut, 
  resetPasswordForEmail, 
  updateUserPassword, 
  getSession,
  getUser
} from '../services/supabase';

const initialState = {
  user: null,
  session: null,
  loading: true,
  initialized: false,
};

const AuthActions = {
  SET_USER: 'SET_USER',
  SET_SESSION: 'SET_SESSION',
  SET_LOADING: 'SET_LOADING',
  SET_INITIALIZED: 'SET_INITIALIZED',
  LOGOUT: 'LOGOUT',
};

const authReducer = (state, action) => {
  switch (action.type) {
    case AuthActions.SET_USER:
      return { ...state, user: action.payload };
    case AuthActions.SET_SESSION:
      return { ...state, session: action.payload };
    case AuthActions.SET_LOADING:
      return { ...state, loading: action.payload };
    case AuthActions.SET_INITIALIZED:
      return { ...state, initialized: action.payload };
    case AuthActions.LOGOUT:
      return { ...state, user: null, session: null, loading: false };
    default:
      return state;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      dispatch({ type: AuthActions.SET_LOADING, payload: true });
      try {
        const session = await getSession();
        if (session) {
          dispatch({ type: AuthActions.SET_SESSION, payload: session });
          // getSession() ya trae el user mapeado, usamos ese
          dispatch({ type: AuthActions.SET_USER, payload: session.user });
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Clear session on error
        await signOut();
      } finally {
        dispatch({ type: AuthActions.SET_LOADING, payload: false });
        dispatch({ type: AuthActions.SET_INITIALIZED, payload: true });
      }
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    dispatch({ type: AuthActions.SET_LOADING, payload: true });
    try {
      const { user, session } = await signInWithEmailPassword(email, password);
      dispatch({ type: AuthActions.SET_USER, payload: user });
      dispatch({ type: AuthActions.SET_SESSION, payload: session });
    } catch (error) {
      throw error;
    } finally {
      dispatch({ type: AuthActions.SET_LOADING, payload: false });
    }
  };

  const register = async (email, password, userData = {}) => {
    dispatch({ type: AuthActions.SET_LOADING, payload: true });
    try {
      const { user, session } = await signUpWithEmailPassword(email, password, userData);
      dispatch({ type: AuthActions.SET_USER, payload: user });
      dispatch({ type: AuthActions.SET_SESSION, payload: session });
    } catch (error) {
      throw error;
    } finally {
      dispatch({ type: AuthActions.SET_LOADING, payload: false });
    }
  };

    const loginWithGoogle = async () => {
      dispatch({ type: AuthActions.SET_LOADING, payload: true });
      try {
        const { user, session } = await signInWithGoogle();
        dispatch({ type: AuthActions.SET_USER, payload: user });
        dispatch({ type: AuthActions.SET_SESSION, payload: session });
      } catch (error) {
        throw error;
      } finally {
        dispatch({ type: AuthActions.SET_LOADING, payload: false });
      }
    };

    const loginWithApple = async () => {
      dispatch({ type: AuthActions.SET_LOADING, payload: true });
      try {
        const { user, session } = await signInWithApple();
        dispatch({ type: AuthActions.SET_USER, payload: user });
        dispatch({ type: AuthActions.SET_SESSION, payload: session });
      } catch (error) {
        throw error;
      } finally {
        dispatch({ type: AuthActions.SET_LOADING, payload: false });
      }
    };

  const logout = async () => {
    dispatch({ type: AuthActions.SET_LOADING, payload: true });
    try {
      await signOut();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch({ type: AuthActions.LOGOUT });
      dispatch({ type: AuthActions.SET_LOADING, payload: false });
    }
  };

  const resetPassword = async (email) => {
    dispatch({ type: AuthActions.SET_LOADING, payload: true });
    try {
      await resetPasswordForEmail(email);
    } catch (error) {
      throw error;
    } finally {
      dispatch({ type: AuthActions.SET_LOADING, payload: false });
    }
  };

  const changePassword = async (password) => {
    dispatch({ type: AuthActions.SET_LOADING, payload: true });
    try {
      await updateUserPassword(password);
    } catch (error) {
      throw error;
    } finally {
      dispatch({ type: AuthActions.SET_LOADING, payload: false });
    }
  };

  const isLoggedIn = !!state.user;

    const value = {
      user: state.user,
      session: state.session,
      loading: state.loading,
      initialized: state.initialized,
      isLoggedIn,
      login,
      register,
      loginWithGoogle,
      loginWithApple,
      logout,
      resetPassword,
      changePassword,
    };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { authReducer, AuthActions, initialState };