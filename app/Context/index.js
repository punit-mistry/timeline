'use client'

import { createContext,useContext,useEffect ,useState,useMemo} from "react"
import supabase from "../supabase"
import Landing from "../Components/Landing"
const User = createContext()


export const UserContext =({children})=>{

    const [user, setUser] = useState(false);
    const onAuthStateChange = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session && session.user) {
            console.log(session.user)
          setUser(session.user);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    useEffect(() => {
        onAuthStateChange();
      }, []);

      const value = useMemo(() => {
        return {
          user,
        };
      }, [user]);
      return (
        <User.Provider value={value}>
          {user ? children : <Landing />}
        </User.Provider>
      );

}


export const useAuthContext = () => {
    const {user}  = useContext(User);
    return  {user} ;
  };
  