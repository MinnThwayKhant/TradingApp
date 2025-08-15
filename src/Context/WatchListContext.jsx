import { createContext, useContext, useState } from "react";

const WatchListContext = createContext()

export const WatchListContextProvider = ({children}) => {
    const [watchList, setWatchList] = useState(["AAPL", "GOOGL", "MSFT", "AMZN", "META", "TSLA", "NVDA", "JPM",])

    const addStock = (stock) => {
        if(watchList.indexOf(stock) === -1){
            setWatchList([...watchList, stock])
        }
    }

    const deleteStock = (stock) => {
        const updated = watchListFilter((el) => {
            return el !== stock
        })

        setWatchList(updated)
    }

    return(
        <WatchListContext.Provider value={{ watchList, addStock }}>
            {children}
        </WatchListContext.Provider>    
    )
}

export const useGlobalContext = () => {
    return useContext(WatchListContext)
};