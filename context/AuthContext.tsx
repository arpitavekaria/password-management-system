'use client';
import {createContext, useEffect, useState, ReactNode} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {useAuthStore} from "@/components/store/auth";
import {deleteAuthSession, getAuthSession} from "@/lib/session/authSession";
import Loading from "@/components/common/Loader";

interface User {
    id?: string;
    name?: string;
    email?: string;

    [key: string]: any;
}

interface AuthContextType {
    isAuth: boolean;
    user: User;
}

const defaultProvider: AuthContextType = {
    isAuth: false,
    user: {},
};

export const AuthContext = createContext<AuthContextType>(defaultProvider);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    // const clearAuth = useAuthStore((state) => state.clearAuth);
    const [user, setUser] = useState<User>({});
    const [isAuth, setIsAuth] = useState<boolean>(false);

    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const getSession = async () => {
            try {
                const session = await getAuthSession(); // Ensure getAuthSession() is properly typed
                if (session?.accessToken) {
                    setIsAuth(true);
                    setUser(session?.user);
                    console.log('User login');
                } else {
                    // clearAuth();
                    // await deleteAuthSession()
                    setIsAuth(false);
                    setUser({});
                    router.push('/login');
                    console.log('Not User login');
                }
            } catch (error) {
                setIsAuth(false);
                setUser({});
                console.error('Error fetching session:', error);
            }
        };

        getSession();
    }, [pathname]);

    if (!isAuth) {
        return <Loading loading={!isAuth}/>
    }

    return (
        <AuthContext.Provider value={{isAuth, user}}>
            {children}
        </AuthContext.Provider>
    );
};
