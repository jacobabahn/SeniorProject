import React from "react"
import { useState, useEffect } from "react"
import { supabase } from "./supabase"


const UserContext = React.createContext()

const UserProvider = (props) => {
    const [session, setSession] = useState(null)

    useEffect(() => {
        setSession(supabase.auth.session())

        supabase.auth.onAuthStateChange((_event, supsession) => {
            setSession(supsession)
        })
    }, [session])
    
    return (
        <UserContext.Provider value={session}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }