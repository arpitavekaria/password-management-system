import {useCallback} from "react";
import {useRouter} from "next/navigation";

const useCustomNavigation = () => {
    const router = useRouter();

    const navigateTo = useCallback((path:any)=>{
        router.push(path)
    },[])

    return { navigateTo };
};

export default useCustomNavigation;
