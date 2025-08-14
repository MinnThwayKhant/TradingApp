import React, { useState, useEffect } from 'react'

export const AutoComplete = () => {
    const [search, setSearch] = useState("")

    useEffect
  return (
    <div className='w-100 p-5 rounded mx-auto'>
        <div>
            <input type='text' id='search' style={{backgroundColor: "rgba(145, 158, 171, 0.04)"}} className='border-3 border-gray-300 rounded-xl py-2 px-3 w-full outline-none' placeholder='Search' autoComplete='off' value={search} onChange={(e) => setSearch(e.target.value)} />
            <ul className={`border-2 border-gray-200 rounded-xl p-2 ${search ? 'hidden' : 'block'}`}>
                <li className='py-1'>stock</li>
                <li className='py-1'>stock</li>
                <li className='py-1'>stock</li>
            </ul>
        </div>
    </div>
  )
}
