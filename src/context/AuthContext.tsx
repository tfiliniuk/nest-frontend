import {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import axiosInstance from '../api/axios';
import {useNavigate} from 'react-router-dom';

interface AuthContextProps {
    user: any;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [user, setUser] = useState<any>(null);
    // const [loading, setLoading] = useState(true);
    let navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get('/auth/profile', {withCredentials: true});
                setUser(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                // setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await axiosInstance.post('/auth/signin', {email, password});

            const {refreshToken, token} = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
            navigate('/profile');
            setUser(response.data);
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await axiosInstance.get('/auth/logout', {withCredentials: true});
            setUser(null);
            localStorage.clear();
        } catch (error) {
            console.error(error);
        }
    };

    const contextValue: AuthContextProps = {
        user,
        login,
        logout,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return useContext(AuthContext);
};
