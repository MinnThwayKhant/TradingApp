import React from 'react'
import { createBrowserRouter } from 'react-router'
import App from '../App'
import { StockDetail } from '../pages/StockDetail'
import { StockOverview } from '../pages/StockOverview'

export const router = createBrowserRouter([
    {
        path: '',
        Component: App,
        children: [
            {
                path: '/',
                Component: StockOverview
            },
            {
                path: '/detail/:id',
                Component: StockDetail
            }
        ]
    }
])
