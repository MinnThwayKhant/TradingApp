import React, { useEffect, useState } from 'react'
import finnhub from '../Apis/finnhub'
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGlobalContext } from '../Context/WatchListContext';

export const StockList = () => {

    const { watchList } = useGlobalContext();
    const [stock, setStock] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const changeColor = (change) => {
        return change > 0 ? "text-green-600" : "text-red-600"
    }

    useEffect(() => {
        const abortController = new AbortController();
        const fetchData = async () => {
            setLoading(true) 
            try {
                const responses = await Promise.all(watchList.map((stock) => {
                    return finnhub.get(`quote?symbol=${stock}`,{
                        params: {
                            symbol: stock
                        }
                    }, {signal: abortController.signal})
                 })
                    )

                const data = responses.map((response) => {
                    return {
                        data: response.data,
                        symbol: response.config.params.symbol,
                    }
                })
                setStock(data)

            } catch (error) {
                if(error.status === 429){
                    setError("Rate limit exceeded. Please wait before trying again.");
                } else {
                     setError('Something went wrong! ' + error.message)
                }
               
            } finally {
                setLoading(false)
            }
        }
        fetchData();

        return () => { abortController.abort() }
    }, [watchList])

    if(loading){
        return(
            <div className='flex justify-center w-full items-center h-150 text-3xl gap-4'>
                <p>Loading . . . </p>
                <AiOutlineLoading3Quarters className='text-2xl animate-spin'/>
            </div>
        )
    }

    if(error){
        <div className='flex justify-center w-full items-center h-150 text-3xl gap-4'>
                <p className='text-red-400'>{error}</p>
            </div>
    }

  return (
    <div className='w-full flex justify-center relative'>
        <table className='mt-5 w-50 md:w-260'>
            <thead className='border-b-1'>
                <tr className=''>
                    <th className='lg:py-2 md:px-4 md:text-lg py-1 px-2 text-sm'>Name</th>
                    <th className='md:py-2 md:px-4 md:text-lg py-1 px-2 text-sm'>List</th>
                    <th className='md:py-2 md:px-4 md:text-lg py-1 px-2 text-sm'>Chg</th>
                    <th className='md:py-2 md:px-4 md:text-lg py-1 px-2 text-sm'>Chg%</th>
                    <th className='md:py-2 md:px-4 md:text-lg py-1 px-2 text-sm'>High</th>
                    <th className='md:py-2 md:px-4 md:text-lg py-1 px-2 text-sm'>Low</th>
                    <th className='md:py-2 md:px-4 md:text-lg py-1 px-2 text-sm'>Open</th>
                    <th className='md:py-2 md:px-4 md:text-lg py-1 px-2 text-sm'>Close</th>
                </tr>
            </thead>
            <tbody className='text-center'>
                {
                    stock.map((stockData) => {
                        return(
                            <tr className='border-b-1 border-gray-100' key={stockData.symbol}>
                                <th className='py-3'>{stockData.symbol}</th>
                                <td>{stockData.data.c}</td>
                                <td className={`${changeColor(stockData.data.d)} `}>
                                    <div className='flex justify-center items-center gap-1'>
                                    {stockData.data.d}
                                    {stockData.data.d > 0 ? <FaCaretUp/> : <FaCaretDown/>}
                                    </div>
                                </td>
                                <td className={`${changeColor(stockData.data.dp)}`}>
                                    <div className='flex justify-center items-center gap-1'>
                                    {stockData.data.dp}
                                    {stockData.data.dp > 0 ? <FaCaretUp/> : <FaCaretDown/>}
                                    </div>
                                </td>
                                <td>{stockData.data.h}</td>
                                <td>{stockData.data.l}</td>
                                <td>{stockData.data.o}</td>
                                <td>{stockData.data.pc}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}
