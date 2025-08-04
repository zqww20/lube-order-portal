import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'guest' | 'customer' | 'employee' | 'admin';
  customerCode?: string;
  permissions: string[];
  preferences: {
    portal: 'guest' | 'customer' | 'employee';
    notifications: boolean;
    autoSync: boolean;
  };
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  connectionStatus: 'connected' | 'disconnected' | 'syncing';
}

type UserAction = 
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CONNECTION_STATUS'; payload: 'connected' | 'disconnected' | 'syncing' }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<User['preferences']> };

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  connectionStatus: 'disconnected'
};

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        connectionStatus: 'disconnected'
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    case 'SET_CONNECTION_STATUS':
      return {
        ...state,
        connectionStatus: action.payload
      };
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        user: state.user ? {
          ...state.user,
          preferences: {
            ...state.user.preferences,
            ...action.payload
          }
        } : null
      };
    default:
      return state;
  }
};

const UserContext = createContext<{
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
} | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    // Load user from localStorage on mount
    const storedUser = localStorage.getItem('user_session');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch({ type: 'SET_USER', payload: user });
      } catch (error) {
        console.error('Failed to load user session:', error);
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Simulate API call - replace with actual authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user based on username
      let mockUser: User;
      
      if (username.includes('employee')) {
        mockUser = {
          id: 'emp_001',
          username,
          email: `${username}@company.com`,
          role: 'employee',
          permissions: ['read_all', 'write_quotes', 'manage_orders'],
          preferences: {
            portal: 'employee',
            notifications: true,
            autoSync: true
          }
        };
      } else if (username.includes('admin')) {
        mockUser = {
          id: 'admin_001',
          username,
          email: `${username}@company.com`,
          role: 'admin',
          permissions: ['read_all', 'write_all', 'manage_users', 'system_admin'],
          preferences: {
            portal: 'employee',
            notifications: true,
            autoSync: true
          }
        };
      } else {
        mockUser = {
          id: 'cust_001',
          username,
          email: `${username}@customer.com`,
          role: 'customer',
          customerCode: 'C001',
          permissions: ['read_own', 'create_quotes'],
          preferences: {
            portal: 'customer',
            notifications: true,
            autoSync: false
          }
        };
      }

      localStorage.setItem('user_session', JSON.stringify(mockUser));
      dispatch({ type: 'SET_USER', payload: mockUser });
      dispatch({ type: 'SET_CONNECTION_STATUS', payload: 'connected' });
      
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      dispatch({ type: 'SET_LOADING', payload: false });
      return false;
    }
  };

  const logout = (): void => {
    localStorage.removeItem('user_session');
    dispatch({ type: 'LOGOUT' });
  };

  const hasPermission = (permission: string): boolean => {
    return state.user?.permissions.includes(permission) || false;
  };

  return (
    <UserContext.Provider value={{ 
      state, 
      dispatch, 
      login, 
      logout, 
      hasPermission 
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};