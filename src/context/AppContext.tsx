import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import axios from "axios";
import {sessionEnum} from '../utilities/enums.ts'

interface AppContextType {
    fetchData: <T = any>(query: string) => Promise<T[]>
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};

const fetchData = async <T = any>(query: string) => {
    try {
        const res = await axios.get(`/api/v23.1/query?q=${query}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem(sessionEnum.SESSION_ID)}`,
                Accept: "application/json"
            },
        });

        return res.data?.data as T[] ?? [];
    } catch (err) {
        console.error("Error fetching products", err);
        throw err;
    }
}


const AppContextProvider = ({children}: ReactNode) => {

    return (
        <AppContext.Provider value={{fetchData}}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;






