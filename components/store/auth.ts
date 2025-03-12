import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

interface User {
    id?: string;
    name?: string;
    email?: string;
    [key: string]: any;
}

interface AuthState {
    isAuth: boolean;
    user: User;
    setIsAuth: (flag: boolean) => void;
    setUser: (userData: User) => void;
    clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
    devtools(
        persist(
            (set) => ({
                isAuth: false,
                user: {},

                setIsAuth: (flag: boolean) => set({ isAuth: flag }),
                setUser: (userData: User) => set({ user: userData }),
                clearAuth: () => set({ isAuth: false, user: {} }),
            }),
            {
                name: 'auth-storage',
                storage: createJSONStorage(() => sessionStorage),
            }
        )
    )
);
