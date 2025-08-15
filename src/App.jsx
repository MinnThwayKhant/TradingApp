import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router'
import { WatchListContextProvider } from './Context/WatchListContext'

function App() {

  return (
    <>
    <WatchListContextProvider>
      <Outlet />
    </WatchListContextProvider>
    </>
  )
}

export default App
