import { createContext, useContext, useState } from "react";

const LoadingContext = createContext({
    loading: false,
    setLoading: null as any
});

export function LoadingProvider({ children }: any) {
    const [loading, setLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const context = useContext(LoadingContext);

    if (!context) {
        throw new Error("useLoading must be used within a LoadingProvider");
    }

    return context;
}