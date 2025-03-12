import {create} from 'zustand'
import {createJSONStorage, devtools, persist} from "zustand/middleware";

export const useCommonStore = create(
    devtools(
        persist(
            (set) => ({
                isLoading: false,
                setIsLoading: (flag:boolean) => set({isLoading: flag}),
            }), {
                name: 'common-storage',
                storage: createJSONStorage(() => sessionStorage),
            }
        )
    )
)