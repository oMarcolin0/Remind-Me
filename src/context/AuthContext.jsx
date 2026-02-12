import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const getUser = async()=>{
            const{
                data:{user},
            } = await supabase.auth.getUser();

            setUser(user);
            setLoading(false);
            
        }
        getUser();

        const{data: listener } = supabase.auth.onAuthStateChange(
            (_,session) =>{
                setUser(session?.user ?? null)
            }
        )
        return ()=>{
            listener.subscription.unsubscribe()
        }    
    },[])
     return(
            <AuthContext.Provider value={{user,loading}}>
                {children}
            </AuthContext.Provider>
        )
}
export const useAuth = () =>{
    return useContext(AuthContext)
}