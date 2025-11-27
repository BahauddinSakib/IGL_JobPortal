'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface User {
  au_id: number;
  au_first_name: string;
  au_last_name: string;
  au_email: string;
  au_phone?: string;
  au_type: string;
  au_permission?: string;
  au_companyName?: string;
  au_cv?: string;
  au_createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (userData: any) => Promise<{ success: boolean; error?: string }>;
  recruiterSignup: (userData: any) => Promise<{ success: boolean; error?: string }>;
  adminSignup: (userData: any) => Promise<{ success: boolean; error?: string }>;
  adminLogin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  loading: boolean;
  isSuperAdmin: () => boolean;
  isSeeker: () => boolean;
  isRecruiter: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          localStorage.removeItem('token');
        }
      }
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

const login = async (email: string, password: string) => {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
            // Get redirect from URL parameters BEFORE setting user/token
            const urlParams = new URLSearchParams(window.location.search);
            const redirectUrl = urlParams.get('redirect');
            
            // Check if coming from apply page and user is not a seeker
            if (redirectUrl && redirectUrl.includes('/job-apply/') && data.user.au_type !== '2') {
                // Don't login - return error instead
                return { 
                    success: false, 
                    error: 'Please login as a Applicant.' 
                };
            }
            
            // Only proceed with login if allowed
            localStorage.setItem('token', data.token);
            setUser(data.user);
            
            if (data.user.au_type === '1') {
                router.push('/admin');
            } else if (data.user.au_type === '3') {
                router.push('/');
            } else if (redirectUrl) {
                router.push(redirectUrl);
            } else {
                router.push('/');
            }
            return { success: true };
        } else {
            return { success: false, error: data.message };
        }
    } catch (error) {
        return { success: false, error: 'Login failed' };
    }
};

  const adminLogin = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        router.push('/admin');
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      return { success: false, error: 'Admin login failed' };
    }
  };

  const signup = async (userData: any) => {
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        
        // Get redirect URL from search parameters for signup too
        const redirectUrl = searchParams?.get('redirect');
        if (redirectUrl) {
          router.push(redirectUrl);
        } else {
          router.push('/');
        }
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      return { success: false, error: 'Signup failed' };
    }
  };

  const recruiterSignup = async (userData: any) => {
    try {
      const response = await fetch('/api/auth/recruiter-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        router.push('/');
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Recruiter signup error:', error);
      return { success: false, error: 'Recruiter signup failed: ' + (error as Error).message };
    }
  };

  const adminSignup = async (userData: any) => {
    try {
      const response = await fetch('/api/auth/admin-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        // Don't auto-login, just return success
        return { success: true };
      } else {
        return { success: false, error: data.message };
      }
    } catch (error) {
      console.error('Admin signup error:', error);
      return { success: false, error: 'Admin signup failed: ' + (error as Error).message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  const isSuperAdmin = () => user?.au_type === '1';
  const isSeeker = () => user?.au_type === '2';
  const isRecruiter = () => user?.au_type === '3';

  const value: AuthContextType = {
    user,
    login,
    signup,
    recruiterSignup,
    adminSignup,
    adminLogin,
    logout,
    loading,
    isSuperAdmin,
    isSeeker,
    isRecruiter
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}