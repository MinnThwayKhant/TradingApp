import React, { useState, useEffect } from 'react'
import finnhub from '../Apis/finnhub'
import { useGlobalContext } from '../Context/WatchListContext'

export const AutoComplete = () => {
    const [search, setSearch] = useState("")
    const [error, setError] = useState(null)
    const [results, setResults] = useState([])
    const { addStock } = useGlobalContext()

    useEffect(() => {
      const abortController = new AbortController();
      const fetchData = async () => {
        try {
          const responses = await finnhub.get("/search", {
            params : {
              q: search
            }
          }, {signal: abortController.signal})
          setResults(responses.data.result)
          console.log(results)
        }
        catch (error) {
          setError(error.message)
      }
      } 
      if(search.length > 0){
        fetchData()
      } else {
        setResults([])
      }

      return () => { abortController.abort() }
      
    }, [search])
  return (
    <div className='w-100 p-5 rounded mx-auto relative'>
        <div>
            <input type='text' id='search' style={{backgroundColor: "rgba(145, 158, 171, 0.04)"}} className='border-3 border-gray-300 rounded-xl py-2 px-3 w-full outline-none' placeholder='Search' autoComplete='off' value={search} onChange={(e) => setSearch(e.target.value)} />

            {results.length > 0 && 
            <ul className={`border-2 border-gray-200 rounded-xl p-2 absolute z-100 bg-white`}>
                {
                  results.map((result) => {
                    return (
                      <li className='py-2 px-4 hover:bg-gray-200 cursor-pointer' key={result.description} onClick={() => 
                      {addStock(result.symbol)
                        setSearch("")
                      }}>
                        {result.description}
                      </li>
                    )
                  })
                }
            </ul>
            }
            
        </div>
    </div>
  )
}
